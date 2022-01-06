import { get } from "lodash";
import { useSelector } from "react-redux";


const OrderBook=()=>{


    const orderBook = useSelector(
        state => get(state, 'loadEventsReducer.createdOrders', [])
    )

    console.log(orderBook)

    return(
        <div className="order-book">
            <p className="cont-header">Order Book</p>
            <div className="dex-content">
                
            </div>
            
        </div>
    )
}

export default OrderBook