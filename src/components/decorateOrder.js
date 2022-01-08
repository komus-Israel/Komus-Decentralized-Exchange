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
        const myOrder = order._creator === account
        let orderType
       
        if (myOrder) {

            //  As the creator of the order, if I'm giving out ether, it means i made a request to buy token, hence i bought the token else I sold token
            orderType = order._tokenGive === ETHER_ADDRESS ? 'Bought' : 'Sold'
        } else {
            
            // Else, if i am the filler of the contract and ether was given out, it means I sold token to the creator of the contract
            orderType = order._tokenGive === ETHER_ADDRESS ? 'Sold' : 'Bought'
        }

        return { ...order, orderType}

        
    })

    return orders

}
export default decorateOrder