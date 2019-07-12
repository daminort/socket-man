import { combineReducers } from 'redux';

import App from './app/reducer';
import Emitter from './emitter/reducer';
import HistoryReducer from './history/reducer';

export default combineReducers({
	App,
	Emitter,
	History: HistoryReducer,
});
