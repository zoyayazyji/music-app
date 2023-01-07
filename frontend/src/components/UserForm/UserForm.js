import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";

const UserForm = ({state, onChange, onSubmit, getFieldError, buttonText}) => {
    return <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
            <FormElement
                onChange={onChange}
                name="username"
                label="Username"
                state={state}
                error={getFieldError?.("username")}
            />
            <FormElement
                onChange={onChange}
                name="password"
                label="Password"
                state={state}
                error={getFieldError?.("password")}
            />
        </Grid>
        <Button
            sx={{mt: "30px"}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        >
            {buttonText}
        </Button>
    </form>
};

export default UserForm;
