import {combineReducers} from 'redux';
import Strings from '../constants/Strings';

import * as apiReducers from './api.reducers';

const appReducer = combineReducers({
  ...apiReducers,
});

const rootReducer = (state, action) => {
  if (action.type == Strings.CLEAR_REDUX) return appReducer(undefined, action);
  return appReducer(state, action);
};

export default rootReducer;
