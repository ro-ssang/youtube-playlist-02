import { videosApi } from '../lib/api';

const GET_POPULAR_VIDEOS = 'videos/GET_POPULAR_VIDEOS';
const GET_POPULAR_VIDEOS_SUCCESS = 'videos/GET_POPULAR_VIDEOS_SUCCESS';
const GET_POPULAR_VIDEOS_FAILURE = 'videos/GET_POPULAR_VIDEOS_FAILURE';

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

const initialState = {
  loading: {
    GET_POPULAR_VIDEOS: false,
  },
  popularVideos: null,
};

function videos(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR_VIDEOS:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: true } };
    case GET_POPULAR_VIDEOS_SUCCESS:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: false }, popularVideos: action.payload };
    case GET_POPULAR_VIDEOS_FAILURE:
      return { ...state, loading: { ...state.loading, GET_POPULAR_VIDEOS: false } };
    default:
      return state;
  }
}

export default videos;
