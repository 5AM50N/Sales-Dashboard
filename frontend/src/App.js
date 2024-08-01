import TransactionTable from './Components/TransactionTable';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Piechart from './Components/Pie-chart';
import Barchart from './Components/Bar-chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Statistics from './Components/Statistics';

function App() {
  const [month, setMonth] = useState("");
  const [search, setSearch] = useState("");
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [table, setTable] = useState();
  const [statistics, setStatistics] = useState();
  const [pieChart, setPieChart] = useState();
  const [barChart, setBarChart] = useState();
  const [page, setPage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${process.env.REACT_APP_HOST}?month=${month}&search=${search}`).catch(err=>console.log(err));
    setTable(res.data.tableData);
    setStatistics(res.data.Statistics);
    setPieChart(res.data.piechart);
    setBarChart(res.data.barchart);
    setPage(1);
  };

  return (

    <div className='main'>
      <div className="container">
        <div className="Search-Filter">
          <form onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <select onChange={(e) => { setMonth(e.target.value) }}>
              <option value={""} name="Select">-Select-</option>
              {months.map((month, index) => {
                return <option value={month} name={month}>{month}</option>
              })}
            </select>
            <button type="submit" className='btn'>Search</button>
          </form>
        </div>
        <TransactionTable data={table} search={search} month={month} pageno={page}/>
      </div>
      <div className="container">
        <div className="row charts">
          <div className="col-6 sales">
            <Statistics statistics={statistics}></Statistics>
            <Barchart barchart={barChart} />
          </div>
          <div className="col-6"><Piechart piechart={pieChart} /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
