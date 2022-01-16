import { useRef } from "react"



const NewOrder=()=>{

    const buy = useRef()
    const sell = useRef()

    return(
        <div className="new-order">
             <p className="cont-header">New Order</p>
             <div className="dex-content">

                <button>Buy</button>
                <button>Sell</button>
            
                
            </div>
        </div>
    )
}

export default NewOrder