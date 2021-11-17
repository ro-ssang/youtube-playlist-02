const SHOW_PLAYER = 'player/SHOW_PLAYER';
const SET_PLAYER = 'player/SET_PLAYER';
const SET_CURRENT_VIDEO_ID = 'player/SET_CURRENT_VIDEO_ID';
const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';

export const showPlayer = () => ({ type: SHOW_PLAYER });
export const setPlayer = (player) => (dispatch) => {
  dispatch({ type: SHOW_PLAYER });
  dispatch({ type: SET_PLAYER, payload: player });

  player.addEventListener('onStateChange', (event) => {
    // 시작되지 않음
    if (event.data === -1) {
      const videoId = event.target.getVideoUrl().split('v=')[1];
      dispatch({ type: SET_CURRENT_VIDEO_ID, payload: videoId });
    }

    // 재생 중
    if (event.data === 1) {
      dispatch({ type: PLAY });
    }

    // 일시정지
    if (event.data === 2) {
      dispatch({ type: PAUSE });
    }
  });
};
export const play = () => ({ type: PLAY });
export const pause = () => ({ type: PAUSE });

const initialState = {
  showingPlayer: false,
  player: null,
  currentVideoId: null,
  playing: false,
};

function player(state = initialState, action) {
  switch (action.type) {
    case SHOW_PLAYER:
      return { ...state, showingPlayer: true };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case SET_CURRENT_VIDEO_ID:
      return { ...state, currentVideoId: action.payload };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    default:
      return state;
  }
}

export default player;
