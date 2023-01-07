import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

const TrackHistory = ({ trackHistory }) => {
 
  const getTimeFormat = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
    }).format(new Date(date));
  };

  return (
    
    <Grid container direction="column" spacing={2}>
      {trackHistory.length > 0  ? (
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
             <TableCell align="center" style={{ width: "20%" }}><strong>Artist</strong></TableCell>
             <TableCell align="center" style={{ width: "60%" }}><strong>Track Title</strong></TableCell>
             <TableCell align="center" style={{ width: "20%" }}><strong>Track Duration</strong></TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {trackHistory?.map((row) => (
             <TableRow
               key={row._id}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <TableCell align="center" style={{ width: "20%", textDecoration: "none" }}>{row.artist.name}</TableCell>
               <TableCell align="center" style={{ width: "60%", textDecoration: "none" }}>{row.track.title}</TableCell>
               <TableCell component="td" scope="row" align="center" style={{ width: "20%", textDecoration: "none" }}>{getTimeFormat(row.datetime)}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     </>
) : <Grid style={{ margin: "0 auto", fontSize: "28px" }}>No history yet &#9785;</Grid>}   
    </Grid>
  );
};

export default TrackHistory;