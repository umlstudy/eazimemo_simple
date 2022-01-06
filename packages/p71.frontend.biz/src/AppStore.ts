import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer/AppReducer';
import rootSaga from './saga/AppSaga';

const sagaMiddleware = createSagaMiddleware();
export const AppStore = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(rootSaga);
