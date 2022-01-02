import Web3 from 'web3';
import { loadweb3Action, loadConnectedAccountAction } from './actions';

export const loadweb3 =(dispatch)=>{
    const web3 = new Web3(Web3.givenProvider || 'localhost:8545')
    dispatch(loadweb3Action(web3))

    return web3
}

export const loadConnectedAccount = async(web3, dispatch)=>{
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(loadConnectedAccountAction(account))
    return account
    
}