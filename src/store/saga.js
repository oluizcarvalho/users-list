import { delay } from "redux-saga";
import { takeLatest, put } from "redux-saga/effects";

function* asyncFilterByValue(action) {
    
    yield delay(1000); //*delay on text search

    yield put({ type: 'FILTER_BY_VALUE', payload: { value: action.payload.value } })
}

export default function* root() {
    yield [
        takeLatest('ASYNC_FILTER_BY_VALUE', asyncFilterByValue)
    ];
}
