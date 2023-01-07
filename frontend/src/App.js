import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Admin from "./containers/Admin/Admin";
import TracksHistory from "./containers/TracksHistory/TracksHistory";
import { Alert, Container, Slide, Snackbar } from "@mui/material";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AddArtist from "./containers/AddArtist/AddArtist";
import AddAlbum from "./containers/AddAlbum/AddAlbum";
import AddTrack from "./containers/AddTrack/AddTrack";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "./store/actions/commonActions";


const ProtectedRoute = ({ isAllowed, redirectUrl, children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectUrl} />
    }
    return children || <Outlet />;
};

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
};


const App = () => {
    const { user, notificationOpened, notificationMessage } = useSelector(state => state.users);
    const dispatch = useDispatch();

    return <>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={notificationOpened}
            autoHideDuration={3000}
            TransitionComponent={TransitionLeft}
            onClose={() => {
                dispatch(hideNotification());
            }}>
            <Alert severity={"error"} sx={{ width: '100%' }}>{notificationMessage}</Alert>
        </Snackbar>
        <Routes>
            <Route element={<>
                <AppToolbar />
                <main>
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </>}>
                <Route path={"/"} element={<Artists />} />
                <Route path={"/albums/:id"} element={<Albums />} />
                <Route path={"/tracks/:id"} element={<Tracks />} />
               
                <Route path={"/sign-up"} element={
                    <ProtectedRoute
                        isAllowed={!user}
                        redirectUrl={"/"}
                    >
                        <Register />
                    </ProtectedRoute>
                } />
                <Route path={"/sign-in"} element={
                    <ProtectedRoute
                        isAllowed={!user}
                        redirectUrl={"/"}
                    >
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path={"/tracks_history"} element={
                    <ProtectedRoute
                        isAllowed={!!user}
                        redirectUrl={"/sign-in"}
                    >
                        <TracksHistory />
                    </ProtectedRoute>
                } />
                  <Route path={"/add_artist"} element={
                    <ProtectedRoute
                        isAllowed={!!user}
                        redirectUrl={"/sign-in"}
                    >
                        <AddArtist />
                    </ProtectedRoute>
                } />
                 <Route path={"/add_album"} element={
                    <ProtectedRoute
                        isAllowed={!user}
                        redirectUrl={"/sign-in"}
                    >
                        <AddAlbum />
                    </ProtectedRoute>
                } />
                 <Route path={"/add_track"} element={
                    <ProtectedRoute
                        isAllowed={!!user}
                        redirectUrl={"/sign-in"}
                    >
                        <AddTrack />
                    </ProtectedRoute>
                } />

                <Route path={"/admin"} element={
                    <ProtectedRoute
                        isAllowed={user?.role !== "user"}
                        redirectUrl={"/sign-in"}
                    >
                        <Admin />
                    </ProtectedRoute>
                } />
            </Route>
            
        </Routes>
    </>
};

export default App;