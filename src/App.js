import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { useDispatch, useSelector } from "react-redux"
import { loadConnectedAccount, loadweb3, loadContract, loadAllOrder } from "./functions"
import { get } from "lodash";
import Body from './components/body';


function App() {

  const dispatch = useDispatch()


  const counts = useSelector(
    state => get(state, 'counter')
  )

  const account = useSelector(
      state => get(state, 'loadweb3Reducer.connectedAccount')
  )

  const acc = useSelector(
      state => state.loadweb3Reducer.connectedAccount
  )

  const loading=async()=>{
    const web3 = loadweb3(dispatch)
    await loadConnectedAccount(web3, dispatch)
    const contract = await loadContract(dispatch)
    const order = await loadAllOrder(contract.exchangeContract)
    console.log(contract.exchangeContract)
    console.log(order)
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
