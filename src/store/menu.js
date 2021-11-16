const SHOW_MENU = 'menu/SHOW_MENU';
const HIDE_MENU = 'menu/HIDE_MENU';
const SET_POSITION = 'menu/SET_POSITION';

export const showMenu = () => ({ type: SHOW_MENU });
export const hideMenu = () => ({ type: HIDE_MENU });
export const setPosition = (offsetTop, offsetLeft) => ({ type: SET_POSITION, payload: { offsetTop, offsetLeft } });

const initialState = {
  showingMenu: false,
  position: {
    offsetTop: 0,
    offsetLeft: 0,
  },
};

function menu(state = initialState, action) {
  switch (action.type) {
    case SHOW_MENU:
      return { ...state, showingMenu: true };
    case HIDE_MENU:
      return { ...state, showingMenu: false, offsetTop: 0, offsetLeft: 0 };
    case SET_POSITION:
      return {
        ...state,
        position: {
          ...state.position,
          offsetTop: action.payload.offsetTop,
          offsetLeft: action.payload.offsetLeft,
        },
      };
    default:
      return state;
  }
}

export default menu;
