import { ETHER_ADDRESS, ether, token } from '../helpers';
import moment from 'moment';

const decorateOrder=(orders)=>{
    let etherAmount
    let tokenAmount
    let previousOrder = orders[0]
    let candle
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

        order = {...order, etherAmount, tokenAmount, tokenPrice, formattedTimestamp}

        if( previousOrder._id === order._id ) {
            candle = 'green'
        } else {
            if ((previousOrder.tokenPrice <= order.tokenPrice) && (previousOrder._id !== order._id)) {

                candle = 'green'
    
            }

            else {
                candle = 'red'
            }
        } 

        order = { ...order, candle}
        console.log(previousOrder.tokenPrice)

        previousOrder = order

        

        return order
    })

    return orders
}


export const decorateOrderPrice=(orders)=>{
    // show green price if order price is higher than previous
    // show red price if order price is lower than previous price


    
}

export default decorateOrder