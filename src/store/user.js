import { playlistsApi } from '../lib/api';

const PROFILE = 'user/PROFILE';
const PLAYLISTS = 'user/PLAYLISTS';
const PLAYLISTS_SUCCESS = 'user/PLAYLISTS_SUCCESS';
const PLAYLISTS_FAILURE = 'user/PLAYLISTS_FAILURE';

export const setProfile = (name, avatarUrl) => ({ type: PROFILE, payload: { name, avatarUrl } });
export const getPlaylists = () => async (dispatch) => {
  dispatch({ type: PLAYLISTS });
  try {
    const {
      data: { items },
    } = await playlistsApi.getLists();
    dispatch({ type: PLAYLISTS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: PLAYLISTS_FAILURE, payload: error, error: true });
    throw error;
  }
};

const initialState = {
  loading: {
    PLAYLISTS: false,
  },
  profile: {
    name: '',
    avatarUrl: '',
  },
  playlists: null,
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
    default:
      return state;
  }
}

export default user;
