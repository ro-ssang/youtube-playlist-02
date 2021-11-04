const TOGGLE = 'player/TOGGLE';
const LOAD = 'player/LOAD';

export const togglePlayer = () => ({ type: TOGGLE });
export const loadPlayer = () => ({ type: LOAD });

const initialState = {
  toggle: false,
  loading: false,
};

function player(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return { ...state, toggle: !state.toggle };
    case LOAD:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default player;
