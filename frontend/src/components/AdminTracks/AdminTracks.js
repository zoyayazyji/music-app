import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import { publishTrackAdmin, deleteTrackAdmin } from "../../store/actions/adminActions";
import { useDispatch } from "react-redux";


const AdminTracks = ({ tracks }) => {
  const dispatch = useDispatch();

  const clickDeleteHandler = (id) => {
    dispatch(deleteTrackAdmin(id));
  };

  const clickPablishedHandler = (id) => {
    dispatch(publishTrackAdmin(id))
  };

  function createData(
    number, title, duration, id, album
  ) {
    return { number, title, duration, id, album };
  };

  const rows = tracks.map((track) => (
    createData(track.number, track.title, track.duration, track._id, track.album.title)
  ));


  return (
    <Grid container direction="column" spacing={2} style={{ marginBottom: "30px", marginTop: "30px" }}>
      <Typography variant="h4">
        <hr />
        List of Tracks for publishing
      </Typography>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "20%" }}>Track Actions </TableCell>
                  <TableCell align="center" style={{ width: "35%" }}>Track Title</TableCell>
                  <TableCell align="center" style={{ width: "35%" }}>Album</TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>Track Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" style={{ width: "100px", textDecoration: "none", cursor: "pointer" }} >
                      <IconButton onClick={() => clickPablishedHandler(row.id)}>Publish</IconButton>
                      <IconButton onClick={() => clickDeleteHandler(row.id)}>Delete</IconButton>
                    </TableCell>
                    <TableCell component="td" scope="row" align="center"><strong>{row.title}</strong></TableCell>
                    <TableCell component="td" scope="row" align="center"><strong>{row.album}</strong></TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>) : <Grid style={{ fontSize: "16px", marginBottom: "40px", marginLeft: "10px" }}>No unpublished Tracks</Grid>}
    </Grid>
  )
};

export default AdminTracks;