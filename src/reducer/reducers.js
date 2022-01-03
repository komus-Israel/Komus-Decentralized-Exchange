import { combineReducers } from "redux"

const counter=(state=0, action)=>{
    switch (action.type) {
        case "INCREMENT":
            return state += 1
        default:
            return state
    }
}

const loadweb3Reducer=(state={}, action)=>{
    switch (action.type) {
        case "LOAD_WEB3":
            return {...state, web3: action.payload}
        case "CONNECTED_ACCOUNT": 
            return {...state, connectedAccount: action.payload}

        default:
            return state
    }
}

const loadTokenContractReducer=(state={}, action)=>{
    switch (action.type) {
        case "TOKEN_CONTRACT":
            return state = action.payload
        default:
            return state
    }
}




export const combinedReducers = combineReducers({
    counter,
    loadweb3Reducer,
    loadTokenContractReducer
})