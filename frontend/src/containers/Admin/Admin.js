import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminArtists, getAdminAlbums, getAdminTracks } from "../../store/actions/adminActions";
import AdminArtist from "../../components/AdminArtists/AdminArtists";
import AdminAlbums from "../../components/AdminAlbums/AdminAlbums";
import AdminTracks from "../../components/AdminTracks/AdminTracks";

const Admin = () => {

  const dispatch = useDispatch();
  const { tracks, artists, albums } = useSelector(state => state.admin);
  

  useEffect(() => {
    dispatch(getAdminArtists())
  }, [artists]);

  useEffect(() => {
    dispatch(getAdminAlbums())
  }, [albums]);

  useEffect(() => {
    dispatch(getAdminTracks())
  }, [tracks]);


  return <>

    <AdminArtist
      artists={artists}
    />
    <AdminAlbums
      albums={albums}
    />
    <AdminTracks
      tracks={tracks}
    />
  </>;
};

export default Admin;