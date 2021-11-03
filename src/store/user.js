const PROFILE = 'user/PROFILE';

export const setProfile = (name, avatarUrl) => ({ type: PROFILE, payload: { name, avatarUrl } });

const initialState = {
  profile: {
    name: '',
    avatarUrl: '',
  },
};

function user(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

export default user;
