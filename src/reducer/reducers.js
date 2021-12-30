import { combineReducers } from "redux"

const counter=(action, state=0)=>{
    switch (action.type) {
        case "INCREMENT":
            return state += 1
        default:
            return state
    }
}


export const combinedReducers = combineReducers({
    counter
})