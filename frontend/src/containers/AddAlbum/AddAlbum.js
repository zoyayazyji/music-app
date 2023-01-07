import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {createAlbum, fetchArtists} from "../../store/actions/musicActions";
import {useNavigate} from "react-router-dom";
import AlbumForm from "../../components/Add/AddAlbumForm/AlbumForm";
import { Grid} from "@mui/material";

const AddAlbum = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artists = useSelector(state => state.music.artists);

  useEffect(() => {
    dispatch(fetchArtists());
}, []);

const onSubmit = async (value) => {
  await dispatch(createAlbum(value, navigate));
};

  return <>
  <Grid style={{textAlign: 'center', fontSize: "25px", marginBottom: "25px"}}>Add Album Form</Grid>
<AlbumForm artists={artists} onSubmit={onSubmit}/>
  </>;
};

export default AddAlbum;