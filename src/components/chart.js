import Chart from "react-apexcharts";



const PriceChart=()=>{
    return(
        <div className="chart">
             <p className="cont-header">Price Chart</p>
            
            <Chart type="candlestick"/>
        </div>
    )
}

export default PriceChart