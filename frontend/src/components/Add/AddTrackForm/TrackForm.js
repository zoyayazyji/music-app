import { Button, Grid } from "@mui/material";
import { useState } from "react";
import FormElement from "../../UI/Form/FormElement/FormElement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArtistAlbums } from "../../../store/actions/musicActions";


const TrackForm = ({ onSubmit, artists }) => {

  const dispatch = useDispatch();
  const albums = useSelector(state => state.music.albums);

  useEffect(() => {
    dispatch(fetchArtistAlbums(state.artist))
  }, [albums])

  const [state, setState] = useState({
    artist: "",
    album: "",
    title: "",
    duration: "",
    number: ""
  });

  const submitFormHandler = (e) => {
    e.preventDefault();
    onSubmit({ title: state.title, album: state.album, duration: state.duration, number: state.number })
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };


  return <form onSubmit={submitFormHandler}>
    <Grid container direction="column" spacing={2}>
      <FormElement
        onChange={inputChangeHandler}
        name={"artist"}
        label={"Artist"}
        state={state}
        select
        options={artists || []}
      />
      <FormElement
        onChange={inputChangeHandler}
        name={"album"}
        label={"Album"}
        state={state}
        select
        options={albums || []}
      />
      <FormElement
        onChange={inputChangeHandler}
        name={"title"}
        label={"Track"}
        state={state}
      />
      <FormElement
        onChange={inputChangeHandler}
        name={"duration"}
        label={"Track duration"}
        state={state}
      />
      <FormElement
        onChange={inputChangeHandler}
        name={"number"}
        label={"Track number"}
        state={state}
      />
      <Grid item>
        <Button
          type="submit"
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </Grid>
    </Grid>
  </form>

};

export default TrackForm;