import { useEffect, useRef } from "react"
import { displayView } from "../functions"



const NewOrder=()=>{

    const buy = useRef()
    const sell = useRef()

    

    useEffect(()=>{
        displayView(buy, sell)
    })

    return(
        <div className="new-order">
             <p className="cont-header">New Order</p>
             <div className="dex-content">

                 <div className="create-order-buttons">
                    <button className="buy-order" onClick={()=>displayView(buy, sell)}>Buy</button>
                    <button ref = {sell} onClick={()=>displayView(sell, buy)}  className="sell-order">Sell</button>
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