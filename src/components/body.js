import '../styles/body.css';
import OrderBook from './orderBooks';
import Chart from './chart';
import Transactions from './transactions';
import Trades from './trades';
import Balance from './balance';
import NewOrder from './newOrder';

const Body=()=>{
    return (
        <div className='main-body'>

            <OrderBook />

            <div className="flex-cont">
                <Chart />
                <Transactions />
            </div>

            <Trades />

            <div className="flex-cont">
                <Balance />
                <NewOrder />
            </div>
           
        </div>
    )
}

export default Body