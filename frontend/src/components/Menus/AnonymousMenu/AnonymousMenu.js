import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return <>
        <Button
            component={NavLink}
            color="inherit"
            to="/sign-up"
        >
            Sign Up
        </Button>
        <Button
            component={NavLink}
            color="inherit"
            to="/sign-in"
        >
            Sign In
        </Button>
    </>
};

export default AnonymousMenu;
