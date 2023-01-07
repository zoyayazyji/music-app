import { FETCH_REQUEST, FETCH_ERROR, ADMIN_ARTISTS, ADMIN_ALBUMS, ADMIN_TRACKS } from "../actionTypes";

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  loading: false,
  error: null
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case ADMIN_ARTISTS:
      return { ...state, loading: false, artists: action.value }
    case ADMIN_ALBUMS:
      return { ...state, loading: false, albums: action.value }
    case ADMIN_TRACKS:
      return { ...state, loading: false, tracks: action.value }
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state;
  }
};

export default adminReducer;
