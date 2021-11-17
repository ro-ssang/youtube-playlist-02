const SHOW_PLAYER = 'player/SHOW_PLAYER';
const SET_PLAYER = 'player/SET_PLAYER';
const SET_CURRENT_VIDEO_ID = 'player/SET_CURRENT_VIDEO_ID';

export const showPlayer = () => ({ type: SHOW_PLAYER });
export const setPlayer = (player) => (dispatch) => {
  dispatch({ type: SHOW_PLAYER });
  dispatch({ type: SET_PLAYER, payload: player });

  player.addEventListener('onStateChange', (event) => {
    if (event.data === -1) {
      const videoId = event.target.getVideoUrl().split('v=')[1];
      dispatch({ type: SET_CURRENT_VIDEO_ID, payload: videoId });
    }
  });
};

const initialState = {
  showingPlayer: false,
  player: null,
  currentVideoId: null,
};

function player(state = initialState, action) {
  switch (action.type) {
    case SHOW_PLAYER:
      return { ...state, showingPlayer: true };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case SET_CURRENT_VIDEO_ID:
      return { ...state, currentVideoId: action.payload };
    default:
      return state;
  }
}

export default player;
