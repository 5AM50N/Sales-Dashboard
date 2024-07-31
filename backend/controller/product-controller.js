import Product from "../models/product.js";
import axios from 'axios';

const getMonthIndex = (monthName) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months.indexOf(monthName);
};

export const searchTransaction = async (req, res) => {
  try {
    const { month, search = '', page = 1, perPage = 4 } = req.query;
    const totalTransactions = await Product.countDocuments();
    const monthIndex = getMonthIndex(month);
    const regex = new RegExp(search, 'i');

    const query = {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
      },
      $or: [
        { title: regex },
        { description: regex },
        { price: { $eq: parseFloat(search) || 0 } }
      ]
    };
    const products = await Product.find(query).skip((page - 1) * perPage).limit(parseInt(perPage));
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total/perPage);
    return res.status(200).json({
      message: "Pagination data",
      products: products,
      page: page,
      total: totalTransactions,
      recordsfound: total,
      lastPage: totalPages,
      month
    })
  } catch (err) {
    console.log(err);
  }
};

export const getStatistics = async(req,res)=>{
  try{
    const {month} = req.query;
    const monthIndex = getMonthIndex(month);
    const products = await Product.find({
      $expr:{
        $eq:[{$month:'$dateOfSale'}, monthIndex+1]
      }
    });
    const soldItems = products.filter(product => product.sold);
    const totalSale = products.reduce((sum,product)=> sum + product.price, 0)
    return res.status(200).json({soldCount:(soldItems.length),UnsoldCount:(products.length - soldItems.length),totalSale,soldItems});
  }
  catch(err) {
    console.log(err);
  }
}

export const barChart = async(req,res) =>{
  const { month } = req.query;
  const monthIndex = getMonthIndex(month);
  const barChartData = {
    '0-100': 0,
    '101-200': 0,
    '201-300': 0,
    '301-400': 0,
    '401-500': 0,
    '501-600': 0,
    '601-700': 0,
    '701-800': 0,
    '801-900': 0,
    '901-above': 0,
  };
  try{
    const products = await Product.find({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
      }
    });
    products.forEach(product => {
      if (product.price <= 100) barChartData['0-100']++;
      else if (product.price <= 200) barChartData['101-200']++;
      else if (product.price <= 300) barChartData['201-300']++;
      else if (product.price <= 400) barChartData['301-400']++;
      else if (product.price <= 500) barChartData['401-500']++;
      else if (product.price <= 600) barChartData['501-600']++;
      else if (product.price <= 700) barChartData['601-700']++;
      else if (product.price <= 800) barChartData['701-800']++;
      else if (product.price <= 900) barChartData['801-900']++;
      else barChartData['901-above']++;
    });
    return res.json({barChartData});
  }catch(err){
    console.log(err);
  }
};

export const pieChart = async(req,res) => {
  const { month } = req.query;
  const monthIndex = getMonthIndex(month);
  try{
    const products = await Product.find({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthIndex + 1]
      }
    });
    const pieChartData = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    return res.json({pieChartData});
  }catch(err){
    console.log(err);
  }
}

export const combinedAPI = async(req,res)=>{
  const { month, search = '', page = 1} = req.query;
  try{
    const transactions = await axios.get(`http://localhost:5000/products/transactions?month=${month}&search=${search}&page=${page}`);
    const statistics = await axios.get(`http://localhost:5000/products/statistics?month=${month}`);
    const barChart = await axios.get(`http://localhost:5000/products/barchart?month=${month}`);
    const pieChart = await axios.get(`http://localhost:5000/products/piechart?month=${month}`);
  return res.json({tableData:transactions.data,
    Statistics:statistics.data,
    barchart:barChart.data.barChartData,
    piechart:pieChart.data.pieChartData});
  }
  catch(err){
    console.log(err);
  }
} 