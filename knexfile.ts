import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const knexConfig = {
  client: 'mysql',
  connection: {
    host: process.env.HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'migrations'),
  },
};

export default knexConfig;

