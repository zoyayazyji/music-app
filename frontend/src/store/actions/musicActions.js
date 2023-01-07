import axios from "../../axiosMusic";
import { FETCH_ARTISTS_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_TRACKS_SUCCESS, FETCH_REQUEST, FETCH_ERROR, ARTIST_NAME, TRACK_HISTORY } from "../actionTypes";

const fetchArtistsSuccess = (value) => {
  return { type: FETCH_ARTISTS_SUCCESS, value };
};


const fetchAlbumsSuccess = (value) => {
  return { type: FETCH_ALBUMS_SUCCESS, value };
};

export const artistName = (value) => {
  return { type: ARTIST_NAME, value };
};

const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};

const fetchTracksSuccess = (value) => {
  return { type: FETCH_TRACKS_SUCCESS, value }
};

const trackHistory = (value) => {
  return { type: TRACK_HISTORY, value }
};

export const addTrackHistory = (value) => {
  return async (dispatch, getState) => {
    const token = getState().users?.user?.token;
    try {
      await axios.post("/tracks_history", value, {
        headers: {
          'Authorization': token
        }
      });
    } catch (e) {
      fetchError(e);
    }
  }
};


export const getTrackHistory = (id) => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/tracks_history?user=" + id);
      dispatch(trackHistory(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};


export const getArtistName = (id) => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/albums?artist=" + id);
      dispatch(artistName({ name: response.data[0].artist.name, id: response.data[0].artist._id }));
    } catch (e) {
      fetchError(e);
    }
  }
};


export const fetchArtists = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/artists?published=true");
      dispatch(fetchArtistsSuccess(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};


export const fetchAlbumTracks = (id) => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/tracks?album=" + id);
      dispatch(fetchTracksSuccess(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};

export const fetchArtistAlbums = (id) => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/albums?artist=" + id);
      dispatch(fetchAlbumsSuccess(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};


export const createArtist = (newArtist, navigate) => {
  return async (dispatch) => {
      try {
          await axios.post("/artists", newArtist);
          navigate("/");
      } catch (e) {
          fetchError(e);
      }
  };
}

export const createAlbum = (newAlbum, navigate) => {
  return async (dispatch) => {
      try {
          await axios.post("/albums", newAlbum);
          navigate("/");
          
      } catch (e) {
          fetchError(e);
      }
  };
}

export const createTrack = (newTrack, navigate) => {
  return async (dispatch) => {
      try {
          await axios.post("/tracks", newTrack);
          navigate("/");
          
      } catch (e) {
          fetchError(e);
      }
  };
}