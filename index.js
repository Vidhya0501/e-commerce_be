import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// importing routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";

dotenv.config();
const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT;


// using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.use("/uploads", express.static("uploads")); //  this will help us to fetch image from server url


if(process.env.NODE_ENV === "production"){
 app.use(express.static(path.join(__dirname, "../e-commerce_fe/dist")))
 app.get("*", (req,res)=>{
  res.sendFile(path._resolve(__dirname, "../e-commerce_fe/dist/index.html"))
 })
}

app.listen(port, () => {
  console.log(`App is running on the PORT:${port}`);
  connectDb();
});