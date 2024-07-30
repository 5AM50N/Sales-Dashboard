import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use("/products",router);
app.use(express.json());
mongoose.connect("mongodb+srv://adityakamblequicklabs1:IkTsH7nTmCEWadPo@cluster0.wopzecp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(5000)).then(()=>console.log("connection successful")).catch((err)=>console.log(err));
