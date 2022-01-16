import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { useDispatch, useSelector } from "react-redux"
import { loadConnectedAccount, loadweb3, loadContract, loadAllOrder, loadKovanPrice } from "./functions"
import Body from './components/body';


function App() {

  const dispatch = useDispatch()
  
  const loading=async()=>{
    
    const web3 = loadweb3(dispatch)
    await loadConnectedAccount(web3, dispatch)
    const contract = await loadContract(dispatch)
    await loadAllOrder(contract.exchangeContract, dispatch)
    await loadKovanPrice()
   
    
}
    


  useEffect(()=>{

    loading()
   
})
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

export default App;
