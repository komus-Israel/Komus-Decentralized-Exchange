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

    console.log('all orders', createdOrders)
    console.log('filled orders', filledOrders)
    console.log('cancelled orders', cancelledOrders)

    const openOrders = reject(createdOrders, (order)=>{
        const filled = filledOrders.some((filledOrder)=>filledOrder._id === order._id)
        const cancelled = cancelledOrders.some((cancelledOrder) => cancelledOrder._id === order._id)

        return filled || cancelled
    })

    const preprocessOrderBook=(order)=>{
        const decoratedOpenOrders = decorateOrder(order)
        const orderBook = decorateOrderBookSaleType(decoratedOpenOrders)

        return orderBook
    }    
    
    const preprocessedOrderBook = preprocessOrderBook(openOrders)
   
    const groupOrderIntoBuyAndSell  = groupBy(preprocessedOrderBook, 'orderType')

    console.log(groupOrderIntoBuyAndSell)
    
    return(
        <div className="order-book">
            <p className="cont-header">Order Book</p>
            <div className="dex-content">
                
            </div>
            
        </div>
    )
}

export default OrderBook