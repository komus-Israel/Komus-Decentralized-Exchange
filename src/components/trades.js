import { useSelector } from "react-redux";
import { get } from "lodash";
import '../styles/trades.css';
import { useEffect } from "react";


const Trades=()=>{

    const trades = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders')
    )

    useEffect(()=>{
        console.log('trades', trades)

        if(trades) {
            console.log('sorder trades', trades.sort((a,b)=> b._timeTraded - a._timeTraded))
        }

        
        
    })

    
    
    
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