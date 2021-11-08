import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import player from './player';
import user from './user';
import videos from './videos';

const rootReducer = combineReducers({
  auth,
  modal,
  player,
  user,
  videos,
});

export default rootReducer;
