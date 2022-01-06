import { useSelector } from "react-redux";
import { get } from "lodash";
import '../styles/trades.css';
import { useEffect } from "react";
import decorateOrder from "./decorateOrder";


const Trades=()=>{

    let trades = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    if (trades.length > 0 ) {

        
        trades = trades.sort((a,b)=> a._timeTraded - b._timeTraded) // sort with time ascending
        trades = decorateOrder(trades)
        trades = trades.sort((a,b)=> b._timeTraded - a._timeTraded)
    }

    useEffect(()=>{
       

        if(trades) {
            console.log('sorted trades', trades)
        }    
    })

    
    
    
    return(
        <div className="trades">
             <p className="cont-header">Trades</p>
             <div className="dex-content">
                 <table>
                    <thead>
                        <tr className="row-header">
                            <th>Time</th>
                            <th>KOM</th>
                            <th>KOM/ETH</th>
                        </tr>
                    </thead>

                    <tbody>
                                {
                                    trades.map((trade)=>{
                                        return(
                                            <tr key={trade._id}>
                                                <td>{trade.formattedTimestamp}</td>
                                                <td>{trade.tokenAmount}</td>
                                                <td className={trade.candle}>{trade.tokenPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                 </table>
               
                
            </div>
        </div>
    )
}

export default Trades