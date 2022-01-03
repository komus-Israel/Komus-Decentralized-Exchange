import { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { useDispatch, useSelector } from "react-redux"
import { loadConnectedAccount, loadweb3, loadContract } from "./functions"


function App() {

  const dispatch = useDispatch()
    


  useEffect(()=>{

    const loading=async()=>{
        const web3 = loadweb3(dispatch)
        await loadConnectedAccount(web3, dispatch)
       const contract = await loadContract(dispatch)
       console.log(contract)
    }
    
   
    loading()
   
})
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
