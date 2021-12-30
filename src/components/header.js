import { useDispatch, useSelector } from "react-redux"
import { increment } from "../actions"



const Header=()=>{

    const dispatch = useDispatch()
    const counts = useSelector(
        state => state.counter
    )

    return (
        <nav>
            <p>This is the header</p>
            <p>{counts}</p>
            <button onClick={()=>dispatch(increment())}>increment</button>
        </nav>
    )
}

export default Header