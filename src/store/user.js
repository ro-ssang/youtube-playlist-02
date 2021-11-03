import { playlistsApi, playItemsApi } from '../lib/api';

const PROFILE = 'user/PROFILE';
const PLAYLISTS = 'user/PLAYLISTS';
const PLAYLISTS_SUCCESS = 'user/PLAYLISTS_SUCCESS';
const PLAYLISTS_FAILURE = 'user/PLAYLISTS_FAILURE';
const PLAYITEMS = 'user/PLAYITEMS';
const PLAYITEMS_SUCCESS = 'user/PLAYITEMS_SUCCESS';
const PLAYITEMS_FAILURE = 'user/PLAYITEMS_FAILURE';

export const setProfile = (name, avatarUrl) => ({ type: PROFILE, payload: { name, avatarUrl } });
export const getPlaylists = () => async (dispatch) => {
  dispatch({ type: PLAYLISTS });
  try {
    const {
      data: { items },
    } = await playlistsApi.getPlaylists();
    dispatch({ type: PLAYLISTS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: PLAYLISTS_FAILURE, payload: error, error: true });
    throw error;
  }
};
export const getPlayItems = (id) => async (dispatch) => {
  dispatch({ type: PLAYITEMS });
  try {
    const {
      data: { items },
    } = await playItemsApi.getPlayItems(id);
    console.log(items);
    dispatch({ type: PLAYITEMS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: PLAYITEMS_FAILURE, payload: error, error: true });
    throw error;
  }
};

const initialState = {
  loading: {
    PLAYLISTS: false,
    PLAYITEMS: false,
  },
  profile: {
    name: '',
    avatarUrl: '',
  },
  playlists: null,
  playItems: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      return { ...state, profile: action.payload };
    case PLAYLISTS:
      return { ...state, loading: { ...state.loading, PLAYLISTS: true } };
    case PLAYLISTS_SUCCESS:
      return { ...state, loading: { ...state.loading, PLAYLISTS: false }, playlists: action.payload };
    case PLAYLISTS_FAILURE:
      return { ...state, loading: { ...state.loading, PLAYLISTS: false } };
    case PLAYITEMS:
      return { ...state, loading: { ...state.loading, PLAYITEMS: true } };
    case PLAYITEMS_SUCCESS:
      return { ...state, loading: { ...state.loading, PLAYITEMS: false }, playItems: action.payload };
    case PLAYITEMS_FAILURE:
      return { ...state, loading: { ...state.loading, PLAYITEMS: false } };
    default:
      return state;
  }
}

export default user;
