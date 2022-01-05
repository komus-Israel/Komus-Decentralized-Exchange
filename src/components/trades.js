import { useSelector } from "react-redux";
import { get } from "lodash";
import '../styles/trades.css';


const Trades=()=>{

    const trades = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders')
    )

    
    return(
        <div className="trades">
             <p className="cont-header">Trades</p>
             <div className="dex-content">
                <thead>
                    <tr className="row-header">
                        <th>Time</th>
                        <th>KOM</th>
                        <th>KOM/ETH</th>
                    </tr>
                </thead>
                
            </div>
        </div>
    )
}

export default Trades