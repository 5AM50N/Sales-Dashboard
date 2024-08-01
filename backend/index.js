import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
app.use(cors());
app.use("/products",router);
app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.mongo)
.then(()=>app.listen(port)).then(()=>console.log("connection successful")).catch((err)=>console.log(err));
