import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config({path:"./.env"});
connectDB();


const app = express();
app.use(cors());  // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded data

// Routes
import userRoutes from './routes/user.route.js'; 
app.use('/api/auth', userRoutes);  // Ensure this matches frontend request



app.get('/', (req, res) => {
    res.send('API is running....');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})