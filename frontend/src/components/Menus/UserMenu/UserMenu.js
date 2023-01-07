import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {logoutUser} from "../../../store/actions/usersActions";
import HasAccess from "../../UI/HasAccess/HasAccess";


const UserMenu = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const logout = () => {
        dispatch(logoutUser(navigate));
    };

    return <>
        <Button
            component={NavLink}
            color="inherit"
            to="/tracks_history"
        >
            Track History
        </Button>
        
        <Button
            color="inherit"
        >
            Hello, {user?.username}
        </Button>
        <Button
            color="inherit"
            onClick={logout}
        >
            Logout
        </Button>
        <Button
            color="inherit"
            onClick={handleClick}
        >
           Add
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={()=> navigate("/add_artist")}>Add Artist</MenuItem>
            <MenuItem onClick={()=> navigate("/add_album")}>Add Album</MenuItem>
            <MenuItem onClick={()=> navigate("/add_track")}>Add Track</MenuItem>
        </Menu>
        <HasAccess roles={["admin"]}>
         <Button
            component={NavLink}
            color="inherit"
            to="/admin"
        >
            Admin Panel
        </Button>
        </HasAccess>
    </>
};

export default UserMenu;
