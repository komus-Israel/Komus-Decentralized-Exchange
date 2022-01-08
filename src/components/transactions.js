import { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/transactions.css"
import { get } from "lodash";
import { useSelector } from "react-redux";
import decorateOrder, { decorateOrderBookSaleType, decorateFilledOrder } from "./decorateOrder";



const Transactions=()=>{

    const openOrder = useRef()
    const trades = useRef()
    

    const filledOrders = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    const myAccount = useSelector(
        state => get(state, 'loadweb3Reducer.connectedAccount', '')
    )

    const myFilledOrders = filledOrders.filter(order => order._filler === "0xe2a4152FA4b4a5722901fEA80cEef509290005A0" || order._creator === "0xe2a4152FA4b4a5722901fEA80cEef509290005A0")
    const sortedFilledOrder = myFilledOrders.sort((a,b)=>a._timeTraded - b._timeTraded) // sort the timestamp in ascending order
    const myDecoratedFilledOrders = decorateOrder(sortedFilledOrder)
    const myDecoratedFilledOrderType = decorateFilledOrder(myDecoratedFilledOrders, "0xe2a4152FA4b4a5722901fEA80cEef509290005A0")
    

    //const isOpenOrder = get(trades, 'current.hidden', false)



    useEffect(()=>{
        trades.current.hidden = true
        console.log(myAccount)
        console.log('my trades', myDecoratedFilledOrderType)
    })

    /*const openOrderStyle = {

        background: isOpenOrder && 'white' 
    }*/


    //  my orders

    // I bought kom,  it increases, my ether decreases
    // I sold kom, it decreases, my ether increases


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
                        <MyTrades orders = {myDecoratedFilledOrderType}/>
                     </tbody>

                 </table>
                
            </div>
        </div>
    )
}

const MyOpenOrders=()=>{
    return (

       <>
            <tr>
                <th>Amount</th>
                <th>KOM/ETH</th>
                <th>ETH</th>
            </tr>

            <tr>
                <td>dfbdfbdf</td>
                <td>dfbdfbdf</td>
            </tr>
       </>
            

        
        


    )
}



const MyTrades=({orders})=>{
    return (

        <>
            <tr>
                <th>Time</th>
                <th>KOM</th>
                <th>KOM/ETH</th>
            </tr>

            {
                orders.map(order => {
                    return (
                        <tr key = {order._id}>
                            <td>{order.formattedTimestamp}</td>
                            <td>{order.tokenAmount}</td>
                            <td className={order.orderType}>{order.orderType === 'Bought' ? '+' + order.tokenPrice : '-' + order.tokenPrice}</td>
                            
                        </tr>
                    )
                })
            }
        </>
        
    )
}




export default Transactions