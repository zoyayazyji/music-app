import {CircularProgress} from "@mui/material";

const Loader = ({loading}) => {
    return loading && <CircularProgress color="primary" size={100} style={{marginLeft: "500px", marginTop: "100px"}}/>
};

export default Loader;
