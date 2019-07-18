import { combineReducers } from 'redux';

import App from './app/reducer';
import Emitter from './emitter/reducer';
import HistoryReducer from './history/reducer';
import Queries from './queries/reducer';

export default combineReducers({
	App,
	Emitter,
	History: HistoryReducer,
	Queries,
});
