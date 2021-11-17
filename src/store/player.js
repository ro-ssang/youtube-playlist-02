import { videosApi } from '../lib/api';

const SHOW_PLAYER = 'player/SHOW_PLAYER';
const SET_PLAYER = 'player/SET_PLAYER';
const SET_DURATION = 'player/SET_DURATION';
const SET_CURRENT_TIME = 'player/SET_CURRENT_TIME';
const SET_CURRENT_VIDEO_ID = 'player/SET_CURRENT_VIDEO_ID';
const SET_PROGRESS_PERCENT = 'player/SET_PROGRESS_PERCENT';
const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';
const STAY_PAUSE = 'player/STAY_PAUSE';
const PROGRESS_DRAG = 'player/PROGRESS_DRAG';
const GET_VIDEO_INFO = 'player/GET_VIDEO_INFO';
const GET_VIDEO_INFO_SUCCESS = 'player/GET_VIDEO_INFO_SUCCESS';
const GET_VIDEO_INFO_FAILURE = 'player/GET_VIDEO_INFO_FAILURE';

export const showPlayer = () => ({ type: SHOW_PLAYER });
export const setPlayer = (player) => (dispatch) => {
  dispatch({ type: SHOW_PLAYER });
  dispatch({ type: SET_PLAYER, payload: player });

  let intervalId;
  player.addEventListener('onStateChange', (event) => {
    // 시작되지 않음
    if (event.data === -1) {
      const videoId = event.target.getVideoUrl().split('v=')[1];
      const currentTime = event.target.getCurrentTime();
      const duration = event.target.getDuration();

      dispatch({ type: SET_CURRENT_TIME, payload: currentTime });
      dispatch({ type: SET_DURATION, payload: duration });
      dispatch({ type: SET_CURRENT_VIDEO_ID, payload: videoId });
    }

    // 종료됨
    if (event.data === 0) {
      const duration = event.target.getDuration();

      clearInterval(intervalId);
      dispatch({ type: SET_CURRENT_TIME, payload: duration });
      dispatch({ type: PAUSE });
    }

    // 재생 중
    if (event.data === 1) {
      const duration = event.target.getDuration();
      dispatch({ type: SET_DURATION, payload: duration });

      intervalId = setInterval(() => {
        const currentTime = event.target.getCurrentTime();
        dispatch({ type: SET_CURRENT_TIME, payload: currentTime });
      }, 500);
      dispatch({ type: PLAY });
    }

    // 일시정지
    if (event.data === 2) {
      clearInterval(intervalId);
      dispatch({ type: PAUSE });
    }
  });
};
export const getVideoInfo = (videoId) => async (dispatch) => {
  dispatch({ type: GET_VIDEO_INFO });
  try {
    const {
      data: { items },
    } = await videosApi.getVideoById(videoId);
    dispatch({ type: GET_VIDEO_INFO_SUCCESS, payload: items[0] });
  } catch (error) {
    dispatch({ type: GET_VIDEO_INFO_FAILURE, payload: error, error: true });
  }
};
export const play = () => ({ type: PLAY });
export const pause = () => ({ type: PAUSE });
export const setStayPause = (bool) => ({ type: STAY_PAUSE, payload: bool });
export const setProgressDrag = (bool) => ({ type: PROGRESS_DRAG, payload: bool });
export const setProgressPercent = (percent) => ({ type: SET_PROGRESS_PERCENT, payload: percent });
export const setCurrentTime = (sec) => ({ type: SET_CURRENT_TIME, payload: sec });

const initialState = {
  showingPlayer: false,
  player: null,
  duration: 0,
  currentTime: 0,
  currentVideoId: null,
  loading: {
    VIDEO_INFO: false,
  },
  videoInfo: null,
  playing: false,
  stayingPause: false,
  progressDrag: false,
  progressPercent: 0,
};

function player(state = initialState, action) {
  switch (action.type) {
    case SHOW_PLAYER:
      return { ...state, showingPlayer: true };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case SET_DURATION:
      return { ...state, duration: action.payload };
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case SET_CURRENT_VIDEO_ID:
      return { ...state, currentVideoId: action.payload };
    case SET_PROGRESS_PERCENT:
      return { ...state, progressPercent: action.payload };
    case GET_VIDEO_INFO:
      return { ...state, loading: { ...state.loading, VIDEO_INFO: true } };
    case GET_VIDEO_INFO_SUCCESS:
      return { ...state, loading: { ...state.loading, VIDEO_INFO: false }, videoInfo: action.payload };
    case GET_VIDEO_INFO_FAILURE:
      return { ...state, loading: { ...state.loading, VIDEO_INFO: false } };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    case STAY_PAUSE:
      return { ...state, stayingPause: action.payload };
    case PROGRESS_DRAG:
      return { ...state, progressDrag: action.payload };
    default:
      return state;
  }
}

export default player;
