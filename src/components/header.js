import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../actions"
import { loadConnectedAccount, loadweb3, loadContract } from "../functions"



const Header=()=>{

    const dispatch = useDispatch()
    const counts = useSelector(
        state => state.counter
    )

    useEffect(()=>{

        const loading=async()=>{
            const web3 = loadweb3(dispatch)
            await loadConnectedAccount(web3, dispatch)
           const id = await loadContract()
           console.log(id)
        }
        
       
        loading()
       
    })

    return (
        <nav>
            <p>This is the header</p>
            <p>{counts}</p>
            <button onClick={()=>dispatch(increment())}>increment</button>
        </nav>
    )
}

export default Header