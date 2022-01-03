import { increment } from "../actions"
import { useDispatch, useSelector } from "react-redux"



const Header=()=>{

    const counts = useSelector(
        state => state.counter
    )

    const dispatch = useDispatch()
    

    return (
        <nav>
            <p>This is the header</p>
            <p>{counts}</p>
            <button onClick={()=>dispatch(increment())}>increment</button>
        </nav>
    )
}

export default Header