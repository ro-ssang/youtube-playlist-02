const SET_PLAYER = 'player/SET_PLAYER';

export const setPlayer = (player) => ({ type: SET_PLAYER, payload: player });

const initialState = {
  player: null,
};

function player(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
      return { ...state, player: action.payload };
    default:
      return state;
  }
}

export default player;
