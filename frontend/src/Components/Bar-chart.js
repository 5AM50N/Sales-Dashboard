import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart} from 'chart.js/auto'


function Barchart({barchart}){
    if(barchart) {
    const data = {
        labels:Object.keys(barchart),
        datasets:[
            {
                label: "sales stats",
                data: Object.keys(barchart).map((key)=>{return barchart[key]}),
                backgroundColor: '#7ac52e'
            }
        ]
    }
    return(<>
        <div className="container bar-chart"><Bar data={data}
        ></Bar>
        </div>
    </>)};
}
export default Barchart;
//https://colorhunt.co/palette/e1ffb1c7f2a4b6e388fcffb2