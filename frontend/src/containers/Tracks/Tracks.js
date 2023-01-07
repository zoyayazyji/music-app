import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumTracks, getArtistName } from "../../store/actions/musicActions";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Track from "../../components/Track/Track";

const Tracks = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tracks, artist } = useSelector(state => state.music);
  const user = useSelector(state => state.users.user);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchAlbumTracks(params.id))
  }, []);

  useEffect(() => {
    dispatch(getArtistName(tracks[0]?.album.artist))
  }, [tracks]);



  function createData(
    number, title, duration, id
  ) {
    return { number, title, duration, id };
  };

  const rows = tracks.map((track) => (
    createData(track.number, track.title, track.duration, track._id)
  ));

  
  return <>
    <Track
      tracks={tracks}
      rows={rows}
      artist={artist}
      user={user}
      navigate={navigate}
    />
  </>;
};

export default Tracks;