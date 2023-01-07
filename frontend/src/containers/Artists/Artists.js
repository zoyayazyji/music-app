import { useEffect } from "react";
import { fetchArtists } from "../../store/actions/musicActions";
import { useDispatch, useSelector } from "react-redux";
import Artist from "../../components/Artist/Artist";
import Loader from "../../components/UI/Loader/Loader";

const Artists = () => {

    const dispatch = useDispatch();
    const { artists, loading } = useSelector(state => state.music);
    
    useEffect(() => {
        dispatch(fetchArtists());
    }, []);

    return <>
        <Artist artists={artists} />
        <Loader loading={loading} />
    </>;
};

export default Artists;