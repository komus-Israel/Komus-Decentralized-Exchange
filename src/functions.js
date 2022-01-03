import Web3 from 'web3';
import { loadweb3Action, loadConnectedAccountAction, loadTokenContract } from './actions';
import Token from './abis/Token.json';

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
    const idFoundInABI =  (Token.networks[networkId])

    if( !idFoundInABI ) {
        return null
    }
    const contract = new web3.eth.Contract(Token.abi, idFoundInABI.address)
    dispatch(loadTokenContract(contract))
    return contract
}