import { increment } from "../actions"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash";
import '../styles/header.css';




const Header=()=>{


    const account = useSelector(
        state => get(state, 'loadweb3Reducer.connectedAccount')
    )


    return (
       <nav className="nav-bar">
           <h1>ZAMAR</h1>
           <p>{account}</p>
       </nav>
    )
}

export default Header