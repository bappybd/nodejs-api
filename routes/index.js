import express from "express";
const indexRouter = express.Router();
import productRouter from './routes/api/productRouter';

// Api
indexRouter.use('/api/products', productRouter);
export default indexRouter;
