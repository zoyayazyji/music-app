import { FETCH_ARTISTS_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_TRACKS_SUCCESS, FETCH_ERROR, FETCH_REQUEST, ARTIST_NAME, TRACK_HISTORY, NEW_ARTIST } from "../actionTypes";

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  loading: false,
  artist: null,
  newArtist: null,
  trackHistory: []
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_ARTISTS_SUCCESS:
      return { ...state, loading: false, artists: action.value }
    case FETCH_ALBUMS_SUCCESS:
      return { ...state, loading: false, albums: action.value }
    case FETCH_TRACKS_SUCCESS:
      return { ...state, loading: false, tracks: action.value }
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    case ARTIST_NAME:
      return { ...state, artist: action.value }
    case TRACK_HISTORY:
      return { ...state, ...state.trackHistory, trackHistory: action.value }
     case NEW_ARTIST:
      return { ...state, newArtist: action.value } 
    default:
      return state;
  }
};

export default musicReducer;
