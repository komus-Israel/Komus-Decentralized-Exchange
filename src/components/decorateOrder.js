import { ETHER_ADDRESS, ether, token } from '../helpers';
import moment from 'moment';

const decorateOrder=(orders)=>{
    let etherAmount
    let tokenAmount
    const precision = 100000

    

    orders = orders.map((order)=>{
        if(order._tokenGive === ETHER_ADDRESS) {
            etherAmount =  ether(order._amountGive)
            tokenAmount =  token(order._amountGet)
        } else {
            etherAmount =  ether(order._amountGet)
            tokenAmount =  token(order._amountGive)
        }

        let tokenPrice = (etherAmount / tokenAmount)
        tokenPrice = Math.round(tokenPrice * precision) / precision
        const formattedTimestamp = moment.unix(order._timeTraded).format('h:mm:ss a M/D')

        return {...order, etherAmount, tokenAmount, tokenPrice, formattedTimestamp}
    })

    return orders
}

export default decorateOrder