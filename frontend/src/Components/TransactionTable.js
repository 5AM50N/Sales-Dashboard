import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionTable({ data, search, month, pageno}) {
    // console.log(data);
    const [page, setPage] = useState(pageno);
    const [newData, setNewData] = useState(data);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get(`${process.env.REACT_APP_HOST}/transactions?month=${month}&search=${search}&page=${page}`);
            setNewData(res.data);
        }
        fetchData();
    },[page,data]);

    useEffect(() => {
        setPage(1);
    }, [month]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
 
    if (newData) { 
       
        return (
            <div>
                <div className="table">
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>description</th>
                            <th>price</th>
                            <th>sold</th>
                            <th>date of sale</th>
                            <th>catogary</th>
                            <th>image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {newData.products.map((item, index) => {
                            return (<tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.sold}</td>
                                <td>{item.dateOfSale}</td>
                                <td>{item.category}</td>
                                <td><img src={item.image} alt={item.category}></img></td>
                            </tr>);
                        })}
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button onClick={()=> handlePrevPage()} disabled={page === 1} className="btn">Prev</button>
                        <p>{page}</p>
                        <button onClick={() => handleNextPage()} disabled={page === newData.lastPage} className="btn">Next</button>
                    </div>
                </div>
            </div>
    )
    };

}

export default TransactionTable;