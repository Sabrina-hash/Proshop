import express from "express";
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// Import your other middleware and routes
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import googleauth from './routes/googleauth.js'; 

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser());
// CORS middleware to enable requests from any origin
app.use(cors());

// Middleware to log the request origin
app.use((req, res, next) => {
  const origin = req.get('Origin');
  console.log('Request Origin:', origin);
  next();
});

// Your routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use(express.urlencoded({ extended: true })); // Needed for Google login system
app.use('/api/auth', googleauth);

// Endpoint to send PayPal client ID
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
