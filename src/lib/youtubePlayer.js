export function loadYoutubeIframeAPI() {
  const tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

export function createIframeByVideoId(videoId) {
  return new window.YT.Player('player', {
    height: '360',
    width: '640',
    videoId,
    events: {
      onReady: (event) => event.target.playVideo(),
    },
    playerVars: {
      controls: 0,
    },
  });
}

export function createIframeByPlaylistId(playlistId, index = 0) {
  return new window.YT.Player('player', {
    height: '360',
    width: '640',
    events: {
      onReady: (event) => event.target.loadPlaylist({ listType: 'playlist', playlist: playlistId, index }),
    },
    playerVars: {
      controls: 0,
    },
  });
}
