import express from 'express';
import dotenv from 'dotenv';
import sendRefer from './controllers/sendRefer.js';

dotenv.config();

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.post('/api/referrals', sendRefer);



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
