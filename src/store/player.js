const VIDEOINFO = 'player/VIDEOINFO';
const RENDER = 'player/RENDER';
const TOGGLE = 'player/TOGGLE';
const READY = 'player/READY';
const LOAD = 'player/LOAD';

export const setVideoInfo = (id, title, channelTitle, thumbnail, publishedAt) => ({
  type: VIDEOINFO,
  payload: { id, title, channelTitle, thumbnail, publishedAt },
});
export const renderPlayer = () => ({ type: RENDER });
export const togglePlayer = () => ({ type: TOGGLE });
export const readyPlayer = () => ({ type: READY });
export const loadPlayer = () => ({ type: LOAD });

const initialState = {
  videoInfo: null,
  render: false,
  toggle: false,
  ready: false,
  loading: false,
};

function player(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default player;
