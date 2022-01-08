import { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/transactions.css"
import { get } from "lodash";
import { useSelector } from "react-redux";


const Transactions=()=>{

    const openOrder = useRef()
    const trades = useRef()
    

    const filledOrder = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    //const isOpenOrder = get(trades, 'current.hidden', false)



    useEffect(()=>{
        trades.current.hidden = true
    })

    /*const openOrderStyle = {

        background: isOpenOrder && 'white' 
    }*/
    return(
        <div className="transactions">
             <p className="cont-header">Transactions</p>
             <div className="dex-content">

                 <table>
                     <tbody>
                         <tr>
                             <th className="my-transactions" onClick={()=>{
                                 openOrder.current.hidden = false 
                                 trades.current.hidden = true
                             }}>Orders</th>

                             <th className="my-transactions" onClick={()=>{
                                  openOrder.current.hidden = true
                                  trades.current.hidden = false
                             }}>Trades</th>
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
        <tr>
            <th>Amount</th>
            <th>KOM/ETH</th>
            <th>ETH</th>
        </tr>
    )
}



const MyTrades=()=>{
    return (
        <tr>
            <th>Time</th>
            <th>KOM</th>
            <th>KOM/ETH</th>
        </tr>
    )
}




export default Transactions