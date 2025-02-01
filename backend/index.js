import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import roomRoute from './routes/roomRoutes.js';
import bookingRoute from './routes/bookingRoutes.js';
import hotelRoute from './routes/hotelRoutes.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use('/api/auth', userRoutes);
app.use('/api/routes', roomRoute);
app.use('/api/routes', bookingRoute);
app.use('/api/routes',hotelRoute);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port: ${PORT}`);
});






























































