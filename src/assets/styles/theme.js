const colors = {
  red: '#ff453a',
  primary: 'rgba(0,0,0,0.85)',
  secondary: 'rgba(0,0,0,0.5)',
  theme: {
    default: '#000',
    background: 'transparent',
  },
  searchBox: {
    border: '#ccc',
    background: '#fff',
    icon: 'rgba(0,0,0,0.65)',
    text: '#111',
  },
  sidebar: {
    background: {
      default: 'rgba(60,60,67,0.03)',
      selected: 'rgba(60,60,67,0.1)',
    },
    border: 'rgba(0,0,0,0.1)',
  },
  divider: 'rgba(0,0,0,0.15)',
  googleBtn: {
    color: '#fff',
  },
  musicItem: {
    background: {
      even: 'rgba(0,0,0,0.02)',
    },
  },
  player: {
    background: 'rgba(255,255,255,1)',
  },
  playlist: {
    shadow: 'rgba(0,0,0,0.1)',
  },
  playlistItem: {
    background: 'rgba(255,255,255,0.05)',
  },
  profileBox: {
    background: 'rgba(60,60,67,0.03)',
  },
  soundProgress: {
    background: '#f00',
  },
  tracklist: {
    background: {
      hover: 'rgba(0,0,0,0.06)',
    },
  },
};

const sizes = {
  sidebar: {
    width: '260px',
  },
  playerBar: {
    height: '72px',
  },
  scrollBar: {
    width: '15px',
  },
};

const fonts = {
  family: {
    base: '-apple-system, BlinkMacSystemFont, "Apple Color Emoji", "SF Pro", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
};

export const defaultTheme = {
  colors,
  sizes,
  fonts,
};
