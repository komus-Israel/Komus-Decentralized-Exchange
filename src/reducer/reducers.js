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
            return state = action.payload
        default:
            return state
    }
}

const connectedAccountReducer=(state="", action)=>{
    switch (action.type) {
        case "CONNECTED_ACCOUNT":
            return state = action.payload
        default:
            return state
    }
}


export const combinedReducers = combineReducers({
    counter,
    loadweb3Reducer,
    connectedAccountReducer
})