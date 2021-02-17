import { createStore, combineReducers } from "redux";

import filterStore from "./reducer";

const store = createStore(combineReducers({
    filterStore,
}))

export default store