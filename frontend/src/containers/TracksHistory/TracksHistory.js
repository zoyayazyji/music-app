import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTrackHistory } from "../../store/actions/musicActions";
import TrackHistory from "../../components/TrackHistory/TrackHistory";


const TracksHistory = () => {

  const dispatch = useDispatch();
  const { trackHistory, artist, tracks } = useSelector(state => state.music);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(getTrackHistory(user._id));
  }, []);

  return (
    <TrackHistory
      tracks={tracks}
      trackHistory={trackHistory}
      artist={artist}
    />
  );
};

export default TracksHistory;