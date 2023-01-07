import { Button, Grid } from "@mui/material";
import { useState } from "react";
import FormElement from "../../UI/Form/FormElement/FormElement";


const AlbumForm = ({onSubmit, artists}) => {

  const [state, setState] = useState({
    title: "",
    artist: "",
    image: ""
});

const submitFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach(key => {
        formData.append(key, state[key]);
    });
    onSubmit(formData);
};

const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setState(prevState => {
        return {...prevState, [name]: value};
    });
};
const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setState(prevState => {
        return {
            ...prevState,
            [name]: file
        }
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
            name={"title"}
            label={"Album"}
            state={state}
        />
        <FormElement
            onChange={fileChangeHandler}
            name="image"
            label="Image"
            type="file"
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

export default AlbumForm;