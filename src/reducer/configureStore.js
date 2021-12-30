import { combinedReducers, applyMiddleWare, compose } from "./reducers";
import { createLogger } from "redux-logger";
import { createStore } from "redux";


const loggerMiddleWare = createLogger()


export const configureStore=(preloadedState)=>{
    return createStore(

        combinedReducers,
        preloadedState
    )
}