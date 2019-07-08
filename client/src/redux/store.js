import createSagaMiddleware from 'redux-saga';
import createSocketIoMiddleware from 'redux-socket.io';
import { createStore, applyMiddleware, compose } from 'redux';

import { socket } from '../socket-io';
import { subscribeOnSocketStatus } from '../socket-io/subscribe';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketIoMiddleware(socket, 'Socket/Client/');

const middlewares = [sagaMiddleware, socketMiddleware];

const composeEnhancers = (
	process.env.NODE_ENV !== 'production'
	&& typeof window === 'object'
	&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
)
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 20 })
	: compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

subscribeOnSocketStatus(socket, store);

export {
	store,
};
