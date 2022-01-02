import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../actions"
import { loadweb3 } from "../functions"



const Header=()=>{

    const dispatch = useDispatch()
    const counts = useSelector(
        state => state.counter
    )

    useEffect(()=>{
        loadweb3(dispatch)
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