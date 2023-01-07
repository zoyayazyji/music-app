import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArtistAlbums } from "../../store/actions/musicActions";
import Album from "../../components/Album/Album";


const Albums = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const albums = useSelector(state => state.music.albums);

    useEffect(() => {
        dispatch(fetchArtistAlbums(params.id));
    }, []);

    return (
        <Album albums={albums} />
    );
};

export default Albums;