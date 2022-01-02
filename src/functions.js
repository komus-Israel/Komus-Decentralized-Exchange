import Web3 from 'web3';
import { loadweb3Action } from './actions';

export const loadweb3 =(dispatch)=>{
    const web3 = new Web3(Web3.givenProvider || 'localhost:8545')
    dispatch(loadweb3Action(web3))
}

