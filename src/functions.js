import Web3 from 'web3';
import { loadweb3Action, loadConnectedAccountAction, loadTokenContractAction, loadExchangeContractAction, loadCreatedOrdersAction, loadFilledOrdersAction, loadCancelledOrdersAction, orderCancelled, orderFilled } from './actions';
import Token from './abis/Token.json';
import Exchange from './abis/Exchange.json';
import { config } from 'dotenv'

//config()



export const loadweb3 =(dispatch)=>{
    const web3 = new Web3(Web3.givenProvider || 'localhost:8545')
    dispatch(loadweb3Action(web3))

    return web3
}

export const loadConnectedAccount = async(web3, dispatch)=>{
    const accounts = await web3.eth.getAccounts()

    if (accounts.length > 0) {
        const account = accounts[0]
        dispatch(loadConnectedAccountAction(account))
        return account
    }
    
}

export const loadContract=async(dispatch)=>{
    const web3 = new Web3(Web3.givenProvider || 'localhost:8545')
    const networkId = await web3.eth.net.getId()
    const tokenNetworkId =  (Token.networks[networkId])
    const exchangeNetworkId = (Exchange.networks[networkId])

    if( !tokenNetworkId || !exchangeNetworkId ) {
        return null
    }

    const tokenContract = new web3.eth.Contract(Token.abi, tokenNetworkId.address)
    const exchangeContract = new web3.eth.Contract(Exchange.abi, exchangeNetworkId.address)
    dispatch(loadTokenContractAction(tokenContract))
    dispatch(loadExchangeContractAction(exchangeContract))
    
    return { tokenContract, exchangeContract}
}

export const loadAllOrder=async(exchange, dispatch)=>{

    // fetch created orders
    const createdOrdersStream = await exchange.getPastEvents('Order', {fromBlock:0, toBlock:"latest"})
    const createdOrders = createdOrdersStream.map(event=> event.returnValues)
    
    dispatch(loadCreatedOrdersAction(createdOrders))

    // fetch cancelled orders from event
    const cancelledOrdersStream = await exchange.getPastEvents('OrderCancelled', {fromBlock:0, toBlock:"latest"})
    const cancelledOrders = cancelledOrdersStream.map(event=> event.returnValues)
    dispatch(loadCancelledOrdersAction(cancelledOrders))
    
    // fetch filled orders
    const filledOrderStream = await exchange.getPastEvents('Trade', {fromBlock:0, toBlock:"latest"})
    const filledOrders = filledOrderStream.map(event=> event.returnValues)
    dispatch(loadFilledOrdersAction(filledOrders))


    return {
        createdOrdersStream,
        cancelledOrdersStream,
        filledOrderStream
    }

}

export const cancelOrder=async(exchange, orderId, dispatch, account)=>{
    exchange.methods.cancelOrders(orderId).send({from: account})
    .on(
        'transactionHash', (hash)=>console.log(hash)
    )
   

    .on(
        'receipt', (receipt) => {

            dispatch(orderCancelled(receipt.events.OrderCancelled.returnValues))
        }
    )

    .on(
        'error', (error) => console.log(error)
    )

   
}

export const fillOrder=async(exchange, orderId, dispatch, account)=>{

    console.log(orderId)
    exchange.methods.fillOrder(orderId).send({from: account})
    .on(

        'receipt', (receipt)=>{
            console.log(receipt)
            dispatch(orderFilled(receipt.events.Trade.returnValues))
        }
    )

    .on('error', (err)=>console.log(err))
    
}


export const displayView=(refDisplay, refHide)=>{
    refDisplay.current.hidden = false
    refHide.current.hidden = true

}


export const loadKovanPrice=async()=>{
    const priceAbi = require("./abis/Price.json")
    const address = "0x9326BFA02ADD2366b30bacB125260Af641031331"
    const web3Kovan = new Web3(process.env.REACT_APP_KOVAN_API)
    const chainLinkContract = new web3Kovan.eth.Contract(priceAbi, address)
    const price = await chainLinkContract.methods.latestRoundData().call()
    console.log(price)
    
   
}

