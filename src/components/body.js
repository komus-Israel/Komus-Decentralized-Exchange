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

            <div className="less-width">
                <OrderBook />
            </div>
            

            <div className="sub-cont" id="more-width">
                <Chart />
                <Transactions />
            </div>

            <div className="less-width">       
                <Trades />
            </div>
            

            <div className="sub-cont" id="less-width">
                <Balance />
                <NewOrder />
            </div>
           
        </div>
    )
}

export default Body