import { combineReducers } from 'redux';
import auth from './auth';
import player from './player';
import user from './user';
import videos from './videos';

const rootReducer = combineReducers({
  auth,
  player,
  user,
  videos,
});

export default rootReducer;
