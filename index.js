import express from 'express';
import dotenv from 'dotenv';
import sendRefer from './controllers/sendRefer.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173', // allow requests from this origin
    credentials: true, // allow credentials (e.g., cookies) to be sent
  }));

const PORT = process.env.PORT || 3000;

app.post('/api/referrals', sendRefer);



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
