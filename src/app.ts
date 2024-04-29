import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../.env' });
import express from 'express';
import router from './routes/routes';
import cors from 'cors';
import {knexInstance} from './config/dbconfig';


const app = express();
 
//Middlewares
app.use(cors());
app.use(express.json());

//Router
app.use('/api/v1',router);
  
//DB Connection
knexInstance.on('start', () => {
  console.log('Connected to the database!');
});

//Example Query
knexInstance.raw('SELECT 1')
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