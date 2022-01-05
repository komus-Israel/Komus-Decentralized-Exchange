import { ETHER_ADDRESS, ether, token } from '../helpers';

const decorateOrder=(orders)=>{
    let etherAmount
    let tokenAmount

    orders = orders.map((order)=>{
        if(order._tokenGive === ETHER_ADDRESS) {
            etherAmount =  ether(order._amountGive)
            tokenAmount =  token(order._amountGet)
        } else {
            etherAmount =  ether(order._amountGet)
            tokenAmount =  token(order._amountGive)
        }
        return {...order, etherAmount, tokenAmount}
    })

    return orders
}

export default decorateOrder