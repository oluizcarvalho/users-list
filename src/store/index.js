import { createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import filterStore from "./reducer";
import root from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({
        filterStore,
    }),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(root)
console.log("🚀 ~ sagaMiddleware", root)

export default store