import axios from "../../axiosMusic";
import { FETCH_REQUEST, FETCH_ERROR, ADMIN_ARTISTS, ADMIN_ALBUMS, ADMIN_TRACKS } from "../actionTypes";

const fetchAdminArtists = (value) => {
  return { type: ADMIN_ARTISTS, value };
};

const fetchAdminAlbums = (value) => {
  return {type: ADMIN_ALBUMS, value}
}

const fetchAdminTracks = (value) => {
  return { type: ADMIN_TRACKS, value };
};

const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};



export const getAdminArtists = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/artists?published=false");
      dispatch(fetchAdminArtists(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};

export const getAdminAlbums = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/albums?published=false");
      dispatch(fetchAdminAlbums(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};

export const getAdminTracks = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("/tracks?published=false");
      dispatch(fetchAdminTracks(response.data));
    } catch (e) {
      fetchError(e);
    }
  }
};


export const publishedArtist = (id) => {
  return async (dispatch) => {
      try {
          await axios.patch("/artists/" + id);
      } catch (e) {
        fetchError(e);
      }
  }
};  

export const publishAlbumAdmin = (id) => {
  return async (dispatch) => {
      try {
          await axios.patch("/albums/" + id);
      } catch (e) {
        fetchError(e);
      }
  }
};  

export const publishTrackAdmin = (id) => {
  return async (dispatch) => {
      try {
          await axios.patch("/tracks/" + id);
      } catch (e) {
        fetchError(e);
      }
  }
};  

export const deleteArtistAdmin = (id) => {
  return async (dispatch, getState) => {
    try {
        await axios.delete("/artists/" + id, {
            headers: {
                'Authorization': getState().users.user?.token
            }
        });
    } catch (e) {
      fetchError(e);
    }
}
}

export const deleteAlbumAdmin = (id) => {
  return async (dispatch, getState) => {
    try {
        await axios.delete("/albums/" + id, {
            headers: {
                'Authorization': getState().users.user?.token
            }
        });
    } catch (e) {
      fetchError(e);
    }
}
}

export const deleteTrackAdmin = (id) => {
  return async (dispatch, getState) => {
    try {
        await axios.delete("/tracks/" + id, {
            headers: {
                'Authorization': getState().users.user?.token
            }
        });
    } catch (e) {
      fetchError(e);
    }
}
}
