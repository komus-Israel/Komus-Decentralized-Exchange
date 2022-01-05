import { useSelector } from "react-redux"
import { get } from "lodash"


const Trades=()=>{

    const trades = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders')
    )

    
    return(
        <div className="trades">
             <p className="cont-header">Trades</p>
             <div className="dex-content">
                
                
            </div>
        </div>
    )
}

export default Trades