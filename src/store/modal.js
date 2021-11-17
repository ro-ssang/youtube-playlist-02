import { playItemsApi, playlistsApi } from '../lib/api';

const HAS_REDIRECTED = 'modal/HAS_REDIRECTED';
const SHOW_ADD_MODAL = 'modal/SHOW_ADD_MODAL';
const SHOW_DELETE_MODAL = 'modal/SHOW_DELETE_MODAL';
const SHOW_UPDATE_MODAL = 'modal/SHOW_UPDATE_MODAL';
const SHOW_ADD_ITEM_MODAL = 'modal/SHOW_ADD_ITEM_MODAL';
const SHOW_DELETE_ITEM_MODAL = 'modal/SHOW_DELETE_ITEM_MODAL';
const HIDE_MODAL = 'modal/HIDE_MODAL';
const ADDING_TITLE = 'modal/ADDING_TITLE';
const ADDING_DESCRIPTION = 'modal/ADDING_DESCRIPTION';
const ADD_PLAYLIST = 'modal/ADD_PLAYLIST';
const ADD_PLAYLIST_SUCESS = 'modal/ADD_PLAYLIST_SUCESS';
const ADD_PLAYLIST_FAILURE = 'modal/ADD_PLAYLIST_FAILURE';
const DELETE_PLAYLIST = 'modal/DELETE_PLAYLIST';
const DELETE_PLAYLIST_SUCESS = 'modal/DELETE_PLAYLIST_SUCESS';
const DELETE_PLAYLIST_FAILURE = 'modal/DELETE_PLAYLIST_FAILURE';
const UPDATE_PLAYLIST = 'modal/UPDATE_PLAYLIST';
const UPDATE_PLAYLIST_SUCESS = 'modal/UPDATE_PLAYLIST_SUCESS';
const UPDATE_PLAYLIST_FAILURE = 'modal/UPDATE_PLAYLIST_FAILURE';
const ADD_PLAYITEM = 'modal/ADD_PLAYITEM';
const ADD_PLAYITEM_SUCESS = 'modal/ADD_PLAYITEM_SUCESS';
const ADD_PLAYITEM_FAILURE = 'modal/ADD_PLAYITEM_FAILURE';
const DELETE_PLAYITEM = 'modal/DELETE_PLAYITEM';
const DELETE_PLAYITEM_SUCESS = 'modal/DELETE_PLAYITEM_SUCESS';
const DELETE_PLAYITEM_FAILURE = 'modal/DELETE_PLAYITEM_FAILURE';

export const changeRedirectState = () => ({ type: HAS_REDIRECTED });
export const showAddModal = () => ({ type: SHOW_ADD_MODAL });
export const showDeleteModal = () => ({ type: SHOW_DELETE_MODAL });
export const showUpdateModal = () => ({ type: SHOW_UPDATE_MODAL });
export const showAddItemModal = () => ({ type: SHOW_ADD_ITEM_MODAL });
export const showDeleteItemModal = () => ({ type: SHOW_DELETE_ITEM_MODAL });
export const hideModal = () => ({ type: HIDE_MODAL });
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
export const deletePlaylist = (playlistId, history) => async (dispatch) => {
  dispatch({ type: DELETE_PLAYLIST });
  try {
    playlistsApi.deleteList(playlistId);
    await dispatch({ type: DELETE_PLAYLIST_SUCESS });
    setTimeout(() => {
      history.push('/');
      dispatch({ type: HAS_REDIRECTED });
    }, 500);
  } catch (error) {
    dispatch({ type: DELETE_PLAYLIST_FAILURE, payload: error, error: true });
  }
};
export const updatePlaylist = (playlistId, history) => async (dispatch, getState) => {
  const {
    modal: { addingTitle },
  } = getState();
  dispatch({ type: UPDATE_PLAYLIST });
  try {
    const {
      data: { id },
    } = await playlistsApi.updateList(playlistId, addingTitle);
    dispatch({ type: UPDATE_PLAYLIST_SUCESS });
    history.push(`/playlist/${id}`);
    dispatch({ type: HAS_REDIRECTED });
  } catch (error) {
    dispatch({ type: UPDATE_PLAYLIST_FAILURE, payload: error, error: true });
    throw error;
  }
};
export const postAddPlayItem = (playlistId, history) => async (dispatch, getState) => {
  const {
    videos: {
      selectedVideoId: { resourceId },
    },
  } = getState();
  dispatch({ type: ADD_PLAYITEM });
  try {
    await playItemsApi.postAddPlayItem(playlistId, resourceId);
    dispatch({ type: ADD_PLAYITEM_SUCESS });
    if (history) {
      history.push(`/playlist/${playlistId}`);
      dispatch({ type: HAS_REDIRECTED });
    }
  } catch (error) {
    dispatch({ type: ADD_PLAYITEM_FAILURE, payload: error, error: true });
    throw error;
  }
};
export const deletePlayItem = (playlistId, history) => async (dispatch, getState) => {
  const {
    videos: {
      selectedVideoId: { id },
    },
  } = getState();
  dispatch({ type: DELETE_PLAYITEM });
  try {
    playItemsApi.deletePlayItem(id);
    await dispatch({ type: DELETE_PLAYITEM_SUCESS });
    if (history) {
      setTimeout(() => {
        history.push(`/playlist/${playlistId}`);
        dispatch({ type: HAS_REDIRECTED });
      }, 500);
    }
  } catch (error) {
    dispatch({ type: DELETE_PLAYITEM_FAILURE, payload: error, error: true });
  }
};

const initialState = {
  hasRedirected: false,
  showing: {
    add: false,
    delete: false,
    update: false,
    addItem: false,
    deleteItem: false,
  },
  loading: {
    ADD_PLAYLIST: false,
    DELETE_PLAYLIST: false,
    UPDATE_PLAYLIST: false,
    ADD_PLAYITEM: false,
    DELETE_PLAYITEM: false,
  },
  addingTitle: '',
  addingDescription: '',
};

function modal(state = initialState, action) {
  switch (action.type) {
    case HAS_REDIRECTED:
      return { ...state, hasRedirected: !state.hasRedirected };
    case SHOW_ADD_MODAL:
      return { ...state, showing: { ...state.showing, add: true } };
    case SHOW_DELETE_MODAL:
      return { ...state, showing: { ...state.showing, delete: true } };
    case SHOW_UPDATE_MODAL:
      return { ...state, showing: { ...state.showing, update: true } };
    case SHOW_ADD_ITEM_MODAL:
      return { ...state, showing: { ...state.showing, addItem: true } };
    case SHOW_DELETE_ITEM_MODAL:
      return { ...state, showing: { ...state.showing, deleteItem: true } };
    case HIDE_MODAL:
      return { ...state, showing: { add: false, delete: false, update: false, addItem: false, deleteItem: false } };
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
    case DELETE_PLAYLIST:
      return { ...state, loading: { ...state.loading, DELETE_PLAYLIST: true } };
    case DELETE_PLAYLIST_SUCESS:
      return { ...state, loading: { ...state.loading, DELETE_PLAYLIST: false } };
    case DELETE_PLAYLIST_FAILURE:
      return { ...state, loading: { ...state.loading, DELETE_PLAYLIST: false } };
    case UPDATE_PLAYLIST:
      return { ...state, loading: { ...state.loading, UPDATE_PLAYLIST: true } };
    case UPDATE_PLAYLIST_SUCESS:
      return { ...state, loading: { ...state.loading, UPDATE_PLAYLIST: false } };
    case UPDATE_PLAYLIST_FAILURE:
      return { ...state, loading: { ...state.loading, UPDATE_PLAYLIST: false } };
    case ADD_PLAYITEM:
      return { ...state, loading: { ...state.loading, ADD_PLAYITEM: true } };
    case ADD_PLAYITEM_SUCESS:
      return { ...state, loading: { ...state.loading, ADD_PLAYITEM: false } };
    case ADD_PLAYITEM_FAILURE:
      return { ...state, loading: { ...state.loading, ADD_PLAYITEM: false } };
    case DELETE_PLAYITEM:
      return { ...state, loading: { ...state.loading, DELETE_PLAYITEM: true } };
    case DELETE_PLAYITEM_SUCESS:
      return { ...state, loading: { ...state.loading, DELETE_PLAYITEM: false } };
    case DELETE_PLAYITEM_FAILURE:
      return { ...state, loading: { ...state.loading, DELETE_PLAYITEM: false } };
    default:
      return state;
  }
}

export default modal;
