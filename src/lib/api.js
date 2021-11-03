import axios from 'axios';
import { LS_TOKEN, YOUTUBE_BASE_URL } from '../contants';

const instance = axios.create({
  baseURL: YOUTUBE_BASE_URL,
});

export const videosApi = {
  getPopular: () =>
    instance.get('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
        regionCode: 'KR',
        videoCategoryId: 10,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
};

export const playlistsApi = {
  getLists: () =>
    instance.get('/playlists', {
      params: {
        part: 'snippet',
        mine: true,
        maxResults: 30,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
};
