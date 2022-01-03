import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { useDispatch, useSelector } from "react-redux"
import { loadConnectedAccount, loadweb3, loadContract } from "./functions"


function App() {

  const dispatch = useDispatch()

  const loading=async()=>{
    const web3 = loadweb3(dispatch)
    await loadConnectedAccount(web3, dispatch)
    await loadContract(dispatch)
}
    


  useEffect(()=>{
    
    loading()
   
})
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
