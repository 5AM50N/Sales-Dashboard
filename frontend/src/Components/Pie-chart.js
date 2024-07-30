import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart} from 'chart.js/auto'

function piechart({piechart}){
    if(piechart) {
    const data = {
        labels:Object.keys(piechart),
        datasets:[
            {
                label: "sales stats",
                data: Object.keys(piechart).map((key)=>{return piechart[key]}),
                backgroundColor: ['red','yellow','orange']
            }
        ]
    }
    return(<>
    <div className="container pie-chart">
        <Pie data={data}
        ></Pie>
    </div>
    </>)};
}
export default piechart;