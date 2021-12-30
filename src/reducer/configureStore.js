import { combinedReducers } from "./reducers";
import { createStore } from "redux";

const store = createStore(
    combinedReducers
)