import { useRef } from "react"
import { useState } from "react"

const Transactions=()=>{

    const [myOpenOrder, setOpenOrder] = useState('')
    const [myFilledOrder, setFilledOrder] = useState('')

    const openOrder = useRef()
    const trades = useRef()
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
                             <th>Filled Orders</th>
                         </tr>
                     </tbody>

                     <tbody ref = {openOrder}>
                        <MyOpenOrders />
                     </tbody>

                     <tbody ref = {trades}> 
                        <MyTrades />
                     </tbody>

                 </table>

                 {/*<button onClick={()=>{
                     filled.current.hidden = true
                     order.current.hidden = false
                     setOpenOrder('these are my open orders')
                 }}>my open orders</button>

                 <button onClick={()=>{
                     order.current.hidden = true
                     filled.current.hidden = false
                     setFilledOrder('these are my filled orders')
                 }}>my transactions</button>*/}


                
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