import React from 'react';

function TransactionTable({data}) {
    // console.log(data);
    if(data){
    return(<div>
        <div className="table">
            <table>
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
                
                    {data.products.map((item, index)=>{
                        return(<tr key={index}>
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
            </table>
        </div>
    </div>
    )};
    
}

export default TransactionTable;