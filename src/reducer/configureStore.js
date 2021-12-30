import { combinedReducers, applyMiddleWare, compose } from "./reducers";
import { createLogger } from "redux-logger";
import { createStore } from "redux";


const loggerMiddleWare = createLogger()
const middleWare = []
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose


export const configureStore=(preloadedState)=>{
    return createStore(

        combinedReducers,
        preloadedState,
        composeEnhancer(applyMiddleWare(...middleWare, loggerMiddleWare))
    )
}