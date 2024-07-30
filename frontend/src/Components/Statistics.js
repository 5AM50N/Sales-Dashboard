import React from "react";

function Statistics({ statistics }) {
    const style = { display: "flex",
                    justifyContent:"space-between",
                    margin:  "0px 30px"}
    if(statistics) {
    return (
        <>
            <div className="stats">
                <div style={style}>
                    <h5>Total Sale:</h5>
                    <h5>{statistics.totalSale}</h5>
                </div>
                <div style={style}>
                    <h5>Items Sold:</h5>
                    <h5>{statistics.soldCount}</h5>
                </div>
                <div style={style}>
                    <h5>Unsold:</h5>
                    <h5>{statistics.UnsoldCount}</h5>
                </div>
            </div>
        </>
    );}
}

export default Statistics;