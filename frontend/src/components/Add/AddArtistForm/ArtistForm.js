import FormElement from "../../UI/Form/FormElement/FormElement";
import { useState } from "react";
import { Grid, Button } from "@mui/material";


const ArtistForm = ({ onSubmit }) => {

    const [state, setState] = useState({
        name: "",
        information: "",
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
        const { name, value } = e.target;
        setState(prevState => {
            return { ...prevState, [name]: value };
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
                name={"name"}
                label={"Name"}
                state={state}
            />
            <FormElement
                onChange={inputChangeHandler}
                name={"information"}
                label={"Information"}
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

export default ArtistForm;