import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoute.js';
import productRoutes from './Routes/productRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); 
const app = express();


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://jewelo-frontend.vercel.app',
    'https://jewelo-frontend-muhammad-suhails-projects.vercel.app'
  ],
  credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.DB)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/user', userRoutes);
app.use('/product', productRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
