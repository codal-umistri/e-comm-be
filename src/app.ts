import express from 'express';
import router from './routes/routes';
import cors from 'cors';

const app = express();
 
app.use(cors());
app.use(express.json());
app.use('/api/v1',router);

app.listen(4040, () => {
  console.log(`Server is running on http://localhost:${4040}`);
});