import { combineReducers } from 'redux';

import App from './app/reducer';
import HistoryReducer from './history/reducer';

export default combineReducers({
	App,
	History: HistoryReducer,
});
