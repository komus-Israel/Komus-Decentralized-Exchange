import { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/transactions.css"
import { get, reject } from "lodash";
import { useSelector } from "react-redux";
import decorateOrder, { decorateFilledOrder, decorateOrderBookSaleType } from "./decorateOrder";



const Transactions=()=>{

    const openOrder = useRef()
    const trades = useRef()
    

    const filledOrders = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    const createdOrders = useSelector(
        state => get(state, 'loadEventsReducer.createdOrders', [])
    )


    const cancelledOrders = useSelector(
        state => get(state, 'loadEventsReducer.cancelledOrders', [])
    )

    const myAccount = useSelector(
        state => get(state, 'loadweb3Reducer.connectedAccount', '')
    )

    // fetch the open orders

    const openOrders = reject(createdOrders, (order)=>{
        const filled = filledOrders.some((filledOrder)=>filledOrder._id === order._id)
        const cancelled = cancelledOrders.some((cancelledOrder) => cancelledOrder._id === order._id)

        return filled || cancelled
    })


    // filter filled orders and open orders by the connected account

    const myFilledOrders = filledOrders.filter(order => order._filler === "0xe2a4152FA4b4a5722901fEA80cEef509290005A0" || order._creator === "0xe2a4152FA4b4a5722901fEA80cEef509290005A0")
    const myOpenOrders = openOrders.filter(order => order._creator === "0xe2a4152FA4b4a5722901fEA80cEef509290005A0")


    // handling and decorating user trades
    const sortedFilledOrder = myFilledOrders.sort((a,b)=>a._timeTraded - b._timeTraded) // sort the timestamp in ascending order
    const myDecoratedFilledOrders = decorateOrder(sortedFilledOrder)
    const myDecoratedFilledOrderType = decorateFilledOrder(myDecoratedFilledOrders, "0xe2a4152FA4b4a5722901fEA80cEef509290005A0")


    //  handling and decorating the user open orders
    const decorateMyOpenOrders = decorateOrder(myOpenOrders)
    const sortOpenOrders = decorateMyOpenOrders.sort((a,b) => b._timeCreated - a._timeCreated)
    const myOpenOrderBook = decorateOrderBookSaleType(sortOpenOrders)


    
    

    



    useEffect(()=>{
        trades.current.hidden = true
        console.log(myAccount)
        console.log('my open orders orders', myOpenOrderBook)
    })

    /*const openOrderStyle = {

        background: isOpenOrder && 'white' 
    }*/


    //  my orders

  

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
                        <MyOpenOrders orders = {myOpenOrderBook}/>
                     </tbody>

                     <tbody ref = {trades}> 
                        <MyTrades orders = {myDecoratedFilledOrderType}/>
                     </tbody>

                 </table>
                
            </div>
        </div>
    )
}

const MyOpenOrders=({orders})=>{
    return (

       <>
            <tr>
                <th>Amount</th>
                <th>KOM/ETH</th>
                <th>ETH</th>
            </tr>

            {
                orders.map((order =>{
                    return (
                        <tr>
                            <td>{order.tokenAmount}</td>
                            <td className={order.orderType}>{order.tokenPrice}</td>
                            <td>{order.etherAmount}</td>
                        </tr>
                    )
                }))
            }

           
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