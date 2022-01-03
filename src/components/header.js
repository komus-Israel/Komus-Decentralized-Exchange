import { increment } from "../actions"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash"



const Header=()=>{

    const counts = useSelector(
        state => get(state, 'counter')
    )


    const dispatch = useDispatch()

    console.log(counts)

    
    

    return (
        <nav>
            <p>This is the header</p>
            <p>{counts}</p>
        
            <button onClick={()=>dispatch(increment())}>increment</button>
        </nav>
    )
}

export default Header