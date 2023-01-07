import { useDispatch } from "react-redux";
import { createArtist } from "../../store/actions/musicActions";
import { useNavigate } from "react-router-dom";
import ArtistForm from "../../components/Add/AddArtistForm/ArtistForm";
import { Grid } from "@mui/material";

const AddArtist = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (postData) => {
    await dispatch(createArtist(postData, navigate));
  };

  return <>
    <Grid style={{ textAlign: 'center', fontSize: "25px", marginBottom: "25px" }}>Add Artist Form</Grid>
    <ArtistForm onSubmit={onSubmit} />
  </>
};

export default AddArtist;