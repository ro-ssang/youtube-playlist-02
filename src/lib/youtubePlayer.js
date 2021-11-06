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
  });
}

export function createIframeByPlaylistId(playlistId) {
  const player = new window.YT.Player('player', {
    height: '360',
    width: '640',
  });
  player.loadPlaylist({ list: playlistId, listType: 'playlist' });

  return player;
}
