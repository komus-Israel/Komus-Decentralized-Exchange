import Web3 from 'web3';
import { loadweb3Action, loadConnectedAccountAction, loadTokenContract, loadExchangeContract } from './actions';
import Token from './abis/Token.json';
import Exchange from './abis/Exchange.json';

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
    dispatch(loadTokenContract(tokenContract))
    dispatch(loadExchangeContract(exchangeContract))
    
    return { tokenContract, exchangeContract}
}

export const loadAllOrder=async(exchange)=>{

    // fetch created orders
    const createdOrders = await exchange.getPastEvents('Order', {fromBlock:0, toBlock:"latest"})
    console.log(createdOrders)

    // fetch cancelled orders from event
    const cancelledOrders = await exchange.getPastEvents('OrderCancelled', {fromBlock:0, toBlock:"latest"})
    console.log(cancelledOrders)
    
    // fetch filled orders
}