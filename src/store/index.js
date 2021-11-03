import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import videos from './videos';

const rootReducer = combineReducers({
  auth,
  user,
  videos,
});

export default rootReducer;
