import { useRef } from "react"
import { useState } from "react"

const Transactions=()=>{

    const [myOpenOrder, setOpenOrder] = useState('')
    const [myFilledOrder, setFilledOrder] = useState('')

    const order = useRef()
    const filled = useRef()
    return(
        <div className="transactions">
             <p className="cont-header">Transactions</p>
             <div className="dex-content">

                 <button onClick={()=>{
                     filled.current.hidden = true
                     order.current.hidden = false
                     setOpenOrder('these are my open orders')
                 }}>my open orders</button>
                 
                 <button onClick={()=>{
                     order.current.hidden = true
                     filled.current.hidden = false
                     setFilledOrder('these are my filled orders')
                 }}>my transactions</button>


                 <p ref={order} onClick={()=>console.log(order)}>
                     {myOpenOrder}
                 </p>


                 <p ref={filled} onClick={()=>console.log(order)}>
                     {myFilledOrder}
                 </p>
                
            </div>
        </div>
    )
}

export default Transactions