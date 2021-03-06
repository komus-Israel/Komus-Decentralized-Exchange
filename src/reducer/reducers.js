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

const loadContractReducer=(state={}, action)=>{
    switch (action.type) {
        case "TOKEN_CONTRACT":
            return {...state, token: action.payload}
        case "EXCHANGE_CONTRACT":
            return {...state, exchange: action.payload}
        default:
            return state
    }
}

const loadEventsReducer=(state={}, action)=>{
    switch (action.type) {
        case "CREATED_ORDERS":
            return {...state, createdOrders: action.payload}
        case "CANCELLED_ORDERS":
            return {...state, cancelledOrders: action.payload}
        case "FILLED_ORDERS":
            return {...state, filledOrders: action.payload}
        case "ORDER_CANCELLED":
            return {
                ...state,
                cancelledOrders: [...state.cancelledOrders, action.payload]
            }
        case "ORDER_FILLED":
            return {
                ...state,
                filledOrders: [...state.filledOrders, action.payload]
            }
        default:
            return state
    }
}

const loadEthToUsd=(state={}, action)=>{
    switch (action.type) {
        case "ETH_TO_USD":
            return {...state, ethToUsd: action.payload}
        default:
            return state
    }
}




export const combinedReducers = combineReducers({
    counter,
    loadweb3Reducer,
    loadContractReducer,
    loadEventsReducer,
    loadEthToUsd
})

