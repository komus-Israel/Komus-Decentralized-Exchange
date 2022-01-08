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
        //const formattedTimestamp = moment.unix(order._timeTraded).format('h:mm:ss a M/D')
        const formattedTimestamp = order._timeTraded ? moment.unix(order._timeTraded).format('h:mm:ss a M/D') :  order._timeCancelled ?  moment.unix(order._timeCancelled).format('h:mm:ss a M/D') : order._timeCreated && moment.unix(order._timeCreated).format('h:mm:ss a M/D') 

        order = {...order, etherAmount, tokenAmount, tokenPrice, formattedTimestamp}

        return order
    })

    return orders
}


export const decorateOrderPrice=(orders)=>{
    let previousOrder = orders[0]
    let candle

    orders = orders.map(order => {

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

export const decorateOrderBookSaleType=(orders)=>{
    orders = orders.map(order => {
        const orderType = order._tokenGive === ETHER_ADDRESS ? 'Buy' : 'Sell'

        return {...order, orderType}
    })

    return orders
}


export const decorateFilledOrder=(orders, account)=>{

    orders = orders.map(order => {

        // As the connected address, I filled this order
        const myOrder = order._filler === account
        let orderType
       
        if (myOrder) {

            //  Being the filler of this order, if the creator gave me ether, then I sold my token in exchange, therefore my order type is tagged as "sould" else "bought"
            orderType = order._tokenGive === ETHER_ADDRESS ? 'Sould' : 'Bought'
        } else {
            
            // if not myOrder, it means i created this order. As the creator of this order, if I gave out ether in exchange for token, it means i bought token
            orderType = order._tokenGive === ETHER_ADDRESS ? 'Bought' : 'Sould'
        }

        return { ...order, orderType}

        
    })

}
export default decorateOrder