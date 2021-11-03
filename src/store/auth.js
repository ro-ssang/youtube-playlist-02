const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

const initialState = {
  isLogin: false,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}

export default auth;
