import { useEffect, useRef } from "react"
import { displayOrderType } from "../functions"



const NewOrder=()=>{

    const buy = useRef()
    const sell = useRef()

    

    useEffect(()=>{
        displayOrderType(buy, sell)
    })

    return(
        <div className="new-order">
             <p className="cont-header">New Order</p>
             <div className="dex-content">

                 <div className="create-order-buttons">
                    <button className="buy-order" onClick={()=>displayOrderType(buy, sell)}>Buy</button>
                    <button ref = {sell} onClick={()=>displayOrderType(sell, buy)}  className="sell-order">Sell</button>
                 </div>

                 <div>
                     <p ref = {buy}>BUY</p>
                     <p ref = {sell}>SELL</p>
                 </div>
                
            </div>
        </div>
    )
}

export default NewOrder