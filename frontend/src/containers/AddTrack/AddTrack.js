import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {createTrack, fetchArtists} from "../../store/actions/musicActions";
import {useNavigate} from "react-router-dom";
import TrackForm from "../../components/Add/AddTrackForm/TrackForm";
import { Grid} from "@mui/material";

const AddTrack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artists = useSelector(state => state.music.artists);
  const albums = useSelector(state => state.music.albums);

  useEffect(() => {
    dispatch(fetchArtists());
}, []);

const onSubmit = async (value) => {
  await dispatch(createTrack(value, navigate));
};

  return <>
  <Grid style={{textAlign: 'center', fontSize: "25px", marginBottom: "25px"}}>Add Track Form</Grid>
<TrackForm artists={artists} albums={albums} onSubmit={onSubmit}/>
  </>;
};

export default AddTrack;