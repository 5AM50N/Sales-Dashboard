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
                backgroundColor: ['#a5ff9d','#47ff3f','#7ac52e','#005700','#002e00']
            }
            // '#002e00','#005700','#7ac52e','#6fff66','c5ffc0'
        ]
    }
    return(<>
    <div className="container pie-chart">
        <Pie data={data} className="pie"
        ></Pie>
    </div>
    </>)};
}
export default piechart;