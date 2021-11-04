const PLAYER = 'player/PLAYER';
const VIDEOINFO = 'player/VIDEOINFO';
const RENDER = 'player/RENDER';
const TOGGLE = 'player/TOGGLE';
const READY = 'player/READY';
const LOAD = 'player/LOAD';
const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';

export const setPlayer = (player) => ({ type: PLAYER, payload: player });
export const setVideoInfo = (id, title, channelTitle, thumbnail, publishedAt) => ({
  type: VIDEOINFO,
  payload: { id, title, channelTitle, thumbnail, publishedAt },
});
export const renderPlayer = () => ({ type: RENDER });
export const togglePlayer = () => ({ type: TOGGLE });
export const readyPlayer = () => ({ type: READY });
export const loadPlayer = () => ({ type: LOAD });
export const playPlayer = () => ({ type: PLAY });
export const puasePlayer = () => ({ type: PAUSE });

const initialState = {
  player: null,
  playing: false,
  videoInfo: null,
  render: false,
  toggle: false,
  ready: false,
  loading: false,
};

function player(state = initialState, action) {
  switch (action.type) {
    case PLAYER:
      return { ...state, player: action.payload };
    case VIDEOINFO:
      return { ...state, videoInfo: action.payload };
    case RENDER:
      return { ...state, render: true };
    case TOGGLE:
      return { ...state, toggle: !state.toggle };
    case READY:
      return { ...state, ready: true };
    case LOAD:
      return { ...state, loading: true };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    default:
      return state;
  }
}

export default player;
