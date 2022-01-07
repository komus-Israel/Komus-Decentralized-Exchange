import { get, reject, groupBy } from "lodash";
import { useSelector } from "react-redux";
import decorateOrder, { decorateOrderBookSaleType} from "./decorateOrder";


const OrderBook=()=>{

    

    const createdOrders = useSelector(
        state => get(state, 'loadEventsReducer.createdOrders', [])
    )


    const filledOrders = useSelector(
        state => get(state, 'loadEventsReducer.filledOrders', [])
    )

    const  cancelledOrders = useSelector(
        state => get(state, 'loadEventsReducer.cancelledOrders', [])
    )

    const openOrders = reject(createdOrders, (order)=>{
        const filled = filledOrders.some((filledOrder)=>filledOrder._id === order._id)
        const cancelled = cancelledOrders.some((cancelledOrder) => cancelledOrder._id === order._id)

        return filled || cancelled
    })

    console.log(createdOrders)

    const preprocessOrderBook=(order)=>{
        const decoratedOpenOrders = decorateOrder(order)
        const orderBook = decorateOrderBookSaleType(decoratedOpenOrders)

        return orderBook
    }    
    

    const preprocessedOrderBook = preprocessOrderBook(openOrders) // apply the decoration to the order book
   
    const groupOrderIntoBuyAndSell  = groupBy(preprocessedOrderBook, 'orderType') // group the orders buy their order type which is "buy" and "sell"

    /*const sortedGroupedOrders = {

        ...groupOrderIntoBuyAndSell,
        sortedBuy: groupOrderIntoBuyAndSell.Buy.sort((a,b)=> b.tokenPrice - a.tokenPrice),
        sortedSell: groupOrderIntoBuyAndSell.Sell.sort((a,b)=> b.tokenPrice - a.tokenPrice)
    }*/

    const sellOrder = get(groupOrderIntoBuyAndSell, 'Sell', [])
    const buyOrder = get(groupOrderIntoBuyAndSell, 'Buy', [])
    console.log(sellOrder)
    console.log(buyOrder)


    //console.log(sortedGroupedOrders)
   
    
    return(
        <div className="order-book">
            <p className="cont-header">Order Book</p>
            <div className="dex-content">
                
            </div>
            
        </div>
    )
}

export default OrderBook