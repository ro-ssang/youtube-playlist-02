import { playlistsApi } from '../lib/api';

const HAS_REDIRECTED = 'modal/HAS_REDIRECTED';
const ADDING_TITLE = 'modal/ADDING_TITLE';
const ADDING_DESCRIPTION = 'modal/ADDING_DESCRIPTION';
const ADD_PLAYLIST = 'modal/ADD_PLAYLIST';
const ADD_PLAYLIST_SUCESS = 'modal/ADD_PLAYLIST_SUCESS';
const ADD_PLAYLIST_FAILURE = 'modal/ADD_PLAYLIST_FAILURE';

export const changeRedirectState = () => ({ type: HAS_REDIRECTED });
export const changeAddingTitle = (text) => ({ type: ADDING_TITLE, payload: text });
export const changeAddingDescription = (text) => ({ type: ADDING_DESCRIPTION, payload: text });
export const postAddPlaylist = (history) => async (dispatch, getState) => {
  const {
    modal: { addingTitle, addingDescription },
  } = getState();
  dispatch({ type: ADD_PLAYLIST });
  try {
    const {
      data: { id },
    } = await playlistsApi.postAddList(addingTitle, addingDescription);
    dispatch({ type: ADD_PLAYLIST_SUCESS });
    history.push(`/playlist/${id}`);
    dispatch({ type: HAS_REDIRECTED });
  } catch (error) {
    dispatch({ type: ADD_PLAYLIST_FAILURE, payload: error, error: true });
    throw error;
  }
};

const initialState = {
  hasRedirected: false,
  loading: {
    ADD_PLAYLIST: false,
  },
  addingTitle: '',
  addingDescription: '',
};

function modal(state = initialState, action) {
  switch (action.type) {
    case HAS_REDIRECTED:
      return { ...state, hasRedirected: !state.hasRedirected };
    case ADDING_TITLE:
      return { ...state, addingTitle: action.payload };
    case ADDING_DESCRIPTION:
      return { ...state, addingDescription: action.payload };
    case ADD_PLAYLIST:
      return { ...state, loading: { ...state.loading, ADD_PLAYLIST: true } };
    case ADD_PLAYLIST_SUCESS:
      return { ...state, loading: { ...state.loading, ADD_PLAYLIST: false } };
    case ADD_PLAYLIST_FAILURE:
      return { ...state, loading: { ...state.loading, ADD_PLAYLIST: false } };
    default:
      return state;
  }
}

export default modal;
