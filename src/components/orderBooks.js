import { get, reject, groupBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import decorateOrder, { decorateOrderBookSaleType} from "./decorateOrder";
import "../styles/orderBook.css";
import { fillOrder } from "../functions";


const OrderBook=()=>{


    const dispatch = useDispatch()

    const myAccount = useSelector(
        state => get(state, 'loadweb3Reducer.connectedAccount', '')
    )

    
    const exchangeContract = useSelector(
        state => get(state, 'loadContractReducer.exchange', {})
    )

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


    const preprocessOrderBook=(order)=>{
        const decoratedOpenOrders = decorateOrder(order)
        const orderBook = decorateOrderBookSaleType(decoratedOpenOrders)

        return orderBook
    }    
    

    const preprocessedOrderBook = preprocessOrderBook(openOrders) // apply the decoration to the order book
   
    const groupOrderIntoBuyAndSell  = groupBy(preprocessedOrderBook, 'orderType') // group the orders buy their order type which is "buy" and "sell"

    const sellOrder = get(groupOrderIntoBuyAndSell, 'Sell', []) // get the sell orders from the object
    const buyOrder = get(groupOrderIntoBuyAndSell, 'Buy', [])   // get the buy orders from the object

    

    const orderBook = {

        ...groupOrderIntoBuyAndSell,
        sellOrder,
        buyOrder
    }

    console.log(orderBook)

    
   
    
    return(
        <div className="order-book">
            <p className="cont-header">Order Book</p>
            <div className="dex-content">

                <table>
                    <tbody>

                        <OrderSale orderType={orderBook.sellOrder} name="sell" exchangeContract={exchangeContract} account={myAccount} dispatch={dispatch}/>
                        <Divider />
                        <OrderSale orderType={orderBook.buyOrder} name="buy" exchangeContract={exchangeContract} account={myAccount} dispatch={dispatch}/>
                        
                    </tbody>
                </table>                
            </div>
            
        </div>
    )
}

const OrderSale=({orderType, name, exchangeContract, account, dispatch})=>{
    return(

        orderType.map((order)=> renderOrder(order, name, exchangeContract, account, dispatch))
        
    )
}

const renderOrder=(order, name, exchangeContract, account, dispatch)=>{
    return (

        <tr key={order._id}>
            <td>{order.tokenAmount}</td>
            <td className={order.orderType}>{order.tokenPrice}</td>
            <td>{order.etherAmount}</td>
            <tr className="trade-button" onClick={()=>fillOrder(exchangeContract, order._id, dispatch, account)}>{name === 'sell' ? 'buy' : 'sell'}</tr>
        </tr>
        
       

    )
}

const Divider=()=>{
    return (
        <tr>
            <th>KOM</th>
            <th>Price</th>
            <th>ETH</th>
        </tr>
    )
}

export default OrderBook