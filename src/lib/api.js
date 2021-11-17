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
  getPlaylists: () =>
    instance.get('/playlists', {
      params: {
        part: 'snippet',
        mine: true,
        maxResults: 30,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
  getPlaylistDetail: (playlistId) =>
    instance.get('/playlists', {
      params: {
        part: 'snippet,contentDetails',
        id: playlistId,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
  postAddList: (title, description) =>
    instance.post(
      '/playlists',
      {
        snippet: {
          title,
          description,
        },
      },
      {
        params: {
          part: 'snippet',
          access_token: localStorage.getItem(LS_TOKEN),
        },
      }
    ),
  deleteList: (playlistId) =>
    instance.delete('/playlists', {
      params: {
        id: playlistId,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
  updateList: (playlistId, title) =>
    instance.put(
      '/playlists',
      {
        id: playlistId,
        snippet: {
          title,
        },
      },
      {
        params: {
          part: 'snippet',
          access_token: localStorage.getItem(LS_TOKEN),
        },
      }
    ),
};

export const playItemsApi = {
  getPlayItems: (id) =>
    instance.get('/playlistItems', {
      params: {
        part: 'snippet',
        playlistId: id,
        maxResults: 50,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
  postAddPlayItem: (playlistId, resourceId) =>
    instance.post(
      '/playlistItems',
      {
        snippet: {
          playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId: resourceId,
          },
        },
      },
      {
        params: {
          part: 'snippet',
          access_token: localStorage.getItem(LS_TOKEN),
        },
      }
    ),
  deletePlayItem: (id) =>
    instance.delete('/playlistItems', {
      params: {
        id,
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
};

export const searchApi = {
  getSearchByKeyword: (keyword) =>
    instance.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
        type: 'video',
        access_token: localStorage.getItem(LS_TOKEN),
      },
    }),
};
