import { useEffect } from "react";
import { useRef } from "react";


const Transactions=()=>{

    const openOrder = useRef()
    const trades = useRef()


    useEffect(()=>{
        trades.current.hidden = true
    })
    return(
        <div className="transactions">
             <p className="cont-header">Transactions</p>
             <div className="dex-content">

                 <table>
                     <tbody>
                         <tr>
                             <th onClick={()=>{
                                 openOrder.current.hidden = false 
                                 trades.current.hidden = true
                             }}>Open Orders</th>

                             <th onClick={()=>{
                                  openOrder.current.hidden = true
                                  trades.current.hidden = false
                             }}>Filled Orders</th>
                         </tr>
                     </tbody>

                     <tbody ref = {openOrder}>
                        <MyOpenOrders />
                     </tbody>

                     <tbody ref = {trades}> 
                        <MyTrades />
                     </tbody>

                 </table>
                
            </div>
        </div>
    )
}

const MyOpenOrders=()=>{
    return (
        <table>
            <th>Amount</th>
            <th>KOM/ETH</th>
            <th>ETH</th>
        </table>
    )
}



const MyTrades=()=>{
    return (
        <table>
            <th>Amount</th>
            <th>My trades</th>
        </table>
    )
}




export default Transactions