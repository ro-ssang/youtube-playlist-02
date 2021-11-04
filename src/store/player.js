const PLAYER = 'player/PLAYER';
const VIDEOINFO = 'player/VIDEOINFO';
const RENDER = 'player/RENDER';
const TOGGLE = 'player/TOGGLE';
const READY = 'player/READY';
const LOAD = 'player/LOAD';
const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';
const DRAGVOLUME = 'player/DRAGVOLUME';
const VOLUME = 'player/VOLUME';
const MUTE = 'player/MUTE';

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
export const dragVolume = (bool) => ({ type: DRAGVOLUME, payload: bool });
export const setVolume = (percent) => ({ type: VOLUME, payload: percent });
export const setMute = (bool) => ({ type: MUTE, payload: bool });

const initialState = {
  player: null,
  playing: false,
  videoInfo: null,
  render: false,
  toggle: false,
  ready: false,
  loading: false,
  drag: false,
  volume: 50,
  mute: false,
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
    case DRAGVOLUME:
      return { ...state, drag: action.payload };
    case VOLUME:
      return { ...state, volume: action.payload };
    case MUTE:
      return { ...state, mute: action.payload };
    default:
      return state;
  }
}

export default player;
