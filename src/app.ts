import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/routes';
import cors from 'cors';
import { knexInstance } from './config/dbconfig';
import Order from './model/order_model';
import { handleResponse } from './utils/utils';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
  const event = req.body;

  try {
    switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Processing checkout session completion event...');

      const order = await Order.findBysessionid(session.id);
      if (!order) {
        console.error('Order not found for session ID:', session.id);
        return res.status(404).end();
      }

      await order.save(
        {
          payment_status: 'success',
          shipping_city: session.customer_details.address.city,
          shipping_country: session.customer_details.address.country,
          address_line1: session.customer_details.address.line1,
          address_line2: session.customer_details.address.line2,
        },
        { patch: true }
      );
      console.log('Order successfully updated.');
      break;
    }
    }

    res.status(200).end();
    console.log('Webhook processing completed.');
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return handleResponse(
      res,
      'Error processing webhook: ',
      'Internal_Server_Error',
      false,
      'Internal_Servr_Error'
    );
  }
});

//Router
app.use('/api/v1', router);

// //DB Connection
// knexInstance.on('start', () => {
//   console.log('Connected to the database!');
// });

//Example Query
knexInstance
  .raw('SELECT 1')
  .then(() => {
    console.log('Example query executed successfully!');
  })
  .catch((error) => {
    console.error('Error executing example query:', error);
  });

//Listning Server
app.listen(4040, () => {
  console.log(`Server is running on http://localhost:${4040}`);
});
