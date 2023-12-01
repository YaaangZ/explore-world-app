import express from 'express';
import cors from 'cors';
import countryRoutes from './routes/countryRoutes.js';

const app = express();

app.use(cors({
    // origin: 'http://localhost:5173'
    origin: 'https://map-viewer-front.vercel.app'
}))

app.use(countryRoutes);

export default app;