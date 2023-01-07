import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTrackHistory } from "../../store/actions/musicActions";


const Track = ({ tracks, rows, artist, user, navigate }) => {

  const dispatch = useDispatch();

  return ( <>
    <Grid container direction="column" spacing={2}>
      {rows.length > 0 ? (
        <>
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
          </Grid>
          <Grid item>
          <Typography variant="h4">
            {artist?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5"  style={{marginBottom: "10px" }}>
            {tracks[0].album.title}
          </Typography>
        </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "10%" }}>Track Number </TableCell>
                  <TableCell align="center" style={{ width: "70%" }}>Track Title</TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>Track Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {user ? ( <><TableCell align="left" style={{ width: "100px", textDecoration: "none", cursor: "pointer" }} onClick={() => dispatch(addTrackHistory({ track: row.id, artist: artist.id }))}><IconButton>{row.number}</IconButton></TableCell>
                    <TableCell component="td" scope="row" align="center"><strong>{row.title}</strong></TableCell></>) : ( <><TableCell align="left" style={{ width: "100px", textDecoration: "none", cursor: "pointer" }} onClick={() => navigate("/sign-in")}><IconButton>{row.number}</IconButton></TableCell>
                    <TableCell component="td" scope="row" align="center"><strong>{row.title}</strong></TableCell></>)}
                    <TableCell align="center">{row.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>) : <Grid style={{ margin: "0 auto", fontSize: "28px" }}>No one available track in this album &#9785;</Grid>}
    </Grid>
    </>
  );


};

export default Track;