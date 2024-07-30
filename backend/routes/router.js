import express from "express";
import {getStatistics, searchTransaction, barChart, pieChart, combinedAPI } from "../controller/product-controller.js"
const router = express.Router();

router.get("/",combinedAPI);
router.get("/transactions",searchTransaction);
router.get("/statistics",getStatistics);
router.get("/barchart",barChart);
router.get("/piechart",pieChart);

export default router;