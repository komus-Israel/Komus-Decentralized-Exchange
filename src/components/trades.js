import { useSelector } from "react-redux";
import { get } from "lodash";
import '../styles/trades.css';
import { useEffect } from "react";
import { ETHER_ADDRESS, ether, token } from '../helpers';


const Trades=()=>{

    let trades = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    if (trades.length > 0 ) {

        let etherAmount
        let tokenAmount
        trades = trades.map((order)=>{
            if(order._tokenGive === ETHER_ADDRESS) {
                etherAmount =  ether(order._amountGive)
                tokenAmount =  token(order._amountGet)
            } else {
                etherAmount =  ether(order._amountGet)
                tokenAmount =  token(order._amountGive)
            }
            return {...order, etherAmount, tokenAmount}
        })
    }

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