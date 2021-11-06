import { playlistsApi, playItemsApi } from '../lib/api';

const PROFILE = 'user/PROFILE';
const PLAYLISTS = 'user/PLAYLISTS';
const PLAYLISTS_SUCCESS = 'user/PLAYLISTS_SUCCESS';
const PLAYLISTS_FAILURE = 'user/PLAYLISTS_FAILURE';
const PLAYLIST_DETAIL = 'user/PLAYLIST_DETAIL';
const PLAYLIST_DETAIL_SUCCESS = 'user/PLAYLIST_DETAIL_SUCCESS';
const PLAYLIST_DETAIL_FAILURE = 'user/PLAYLIST_DETAIL_FAILURE';
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
export const getPlaylistDetail = (id) => async (dispatch) => {
  dispatch({ type: PLAYLIST_DETAIL });
  try {
    const {
      data: { items },
    } = await playlistsApi.getPlaylistDetail(id);
    const {
      contentDetails: { itemCount },
      snippet: {
        channelTitle,
        title,
        thumbnails: {
          medium: { url },
        },
      },
    } = items[0];
    dispatch({ type: PLAYLIST_DETAIL_SUCCESS, payload: { itemCount, channelTitle, title, url } });
  } catch (error) {
    dispatch({ type: PLAYLIST_DETAIL_FAILURE, payload: error, error: true });
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
    PLAYLIST_DETAIL: false,
    PLAYITEMS: false,
  },
  profile: {
    name: '',
    avatarUrl: '',
  },
  playlists: null,
  playlistDetail: null,
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
    case PLAYLIST_DETAIL:
      return { ...state, loading: { ...state.loading, PLAYLIST_DETAIL: true } };
    case PLAYLIST_DETAIL_SUCCESS:
      return { ...state, loading: { ...state.loading, PLAYLIST_DETAIL: false }, playlistDetail: action.payload };
    case PLAYLIST_DETAIL_FAILURE:
      return { ...state, loading: { ...state.loading, PLAYLIST_DETAIL: false } };
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
