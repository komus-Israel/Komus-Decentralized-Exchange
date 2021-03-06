import { combinedReducers } from "./reducers";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";


const loggerMiddleWare = createLogger()
const middleWare = []
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const configureStore=(preloadedState)=>{
    return createStore(

        combinedReducers,
        preloadedState,
        composeEnhancer(applyMiddleware(...middleWare, loggerMiddleWare))
    )
}