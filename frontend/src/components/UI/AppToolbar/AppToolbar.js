import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import HasAccess from "../HasAccess/HasAccess";
import UserMenu from "../../Menus/UserMenu/UserMenu";
import AnonymousMenu from "../../Menus/AnonymousMenu/AnonymousMenu";

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);

    return <Box sx={{ flexGrow: 1, mb: "40px" }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Music Gallery
                </Typography>
                <Button
                    component={NavLink}
                    to="/"
                    color="inherit"
                >
                    Main
                </Button>
                <HasAccess allowed={!!user}>
                    <UserMenu user={user} />
                </HasAccess>
                <HasAccess allowed={!user}>
                    <AnonymousMenu />
                </HasAccess>
            </Toolbar>
        </AppBar>
    </Box>
};

export default AppToolbar;
