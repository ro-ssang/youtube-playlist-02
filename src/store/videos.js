import { searchApi, videosApi } from '../lib/api';

const CHANGE_KEYWORD = 'videos/CHANGE_KEYWORD';
const SELECT_VIDEO = 'videos/SELECT_VIDEO';
const GET_POPULAR_VIDEOS = 'videos/GET_POPULAR_VIDEOS';
const GET_POPULAR_VIDEOS_SUCCESS = 'videos/GET_POPULAR_VIDEOS_SUCCESS';
const GET_POPULAR_VIDEOS_FAILURE = 'videos/GET_POPULAR_VIDEOS_FAILURE';
const GET_SEARCH_VIDEOS = 'videos/GET_SEARCH_VIDEOS';
const GET_SEARCH_VIDEOS_SUCCESS = 'videos/GET_SEARCH_VIDEOS_SUCCESS';
const GET_SEARCH_VIDEOS_FAILURE = 'videos/GET_SEARCH_VIDEOS_FAILURE';

export const changeKeyword = (value) => ({ type: CHANGE_KEYWORD, payload: value });
export const selectVideo = (videoId) => ({ type: SELECT_VIDEO, payload: videoId });
export const getPopularVideos = () => async (dispatch) => {
  dispatch({ type: GET_POPULAR_VIDEOS });
  try {
    const {
      data: { items },
    } = await videosApi.getPopular();
    dispatch({ type: GET_POPULAR_VIDEOS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: GET_POPULAR_VIDEOS_FAILURE, payload: error, error: true });
    throw error;
  }
};
export const getSearchVideos = (keyword) => async (dispatch) => {
  dispatch({ type: GET_SEARCH_VIDEOS });
  try {
    const {
      data: { items },
    } = await searchApi.getSearchByKeyword(keyword);
    dispatch({ type: GET_SEARCH_VIDEOS_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: GET_SEARCH_VIDEOS_FAILURE, payload: error, error: true });
    throw error;
  }
};

const initialState = {
  loading: {
    GET_POPULAR_VIDEOS: false,
    GET_SEARCH_VIDEOS: false,
  },
  keyword: '',
  selectedVideoId: '',
  popularVideos: null,
  searchVideos: null,
};

function videos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return { ...state, keyword: action.payload };
    case SELECT_VIDEO:
      return { ...state, selectedVideoId: action.payload };
    case GET_POPULAR_VIDEOS:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: true } };
    case GET_POPULAR_VIDEOS_SUCCESS:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: false }, popularVideos: action.payload };
    case GET_POPULAR_VIDEOS_FAILURE:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: false } };
    case GET_SEARCH_VIDEOS:
      return { ...state, loading: { ...state.loading, GET_SEARCH_VIDEOS: true } };
    case GET_SEARCH_VIDEOS_SUCCESS:
      return { ...state, loading: { ...state.loading, GET_SEARCH_VIDEOS: false }, searchVideos: action.payload };
    case GET_SEARCH_VIDEOS_FAILURE:
      return { ...state, loading: { ...state.loading, GET_SEARCH_VIDEOS: false } };
    default:
      return state;
  }
}

export default videos;
