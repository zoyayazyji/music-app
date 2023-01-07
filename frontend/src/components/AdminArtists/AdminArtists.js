import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { uploadsUrl } from "../../constants";
import { publishedArtist, deleteArtistAdmin } from "../../store/actions/adminActions";
import { fetchArtists } from "../../store/actions/musicActions";
import { useDispatch } from "react-redux";

const AdminArtist = ({ artists }) => {
  const dispatch = useDispatch();

  const clickDeleteHandler = (id) => {
    dispatch(deleteArtistAdmin(id))
    dispatch(fetchArtists());
  };

  const clickPablishedHandler = (id) => {
    dispatch(publishedArtist(id));
    dispatch(fetchArtists());
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Typography variant="h4">
        <hr />
        List of Artists for publishing
      </Typography>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {artists.length > 0 ? (artists.map(artist => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={artist._id} >
              <Card style={{ backgroundColor: "#dcebf8" }}>
                <CardHeader title={artist.name} />
                <CardContent>
                  {artist.image ? (
                    <img src={`${uploadsUrl}/${artist.image}`} alt="pic"
                      style={{ width: '200px', height: "200px" }} />
                  ) : (<img src="https://becompact.ru/upload/iblock/5e4/5e4a8f969a51729d5b30acdfeff1edc7.jpg" alt="pic" style={{ width: '200px', height: "200px" }} />)}
                  <Typography component="div">
                    {artist.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => clickPablishedHandler(artist._id)} >
                    {"Publish"}
                  </IconButton>
                  <IconButton onClick={() => clickDeleteHandler(artist._id)} >
                    {"Delete"}
                  </IconButton >
                </CardActions>
              </Card>
            </Grid>
          )
        })) : <Grid style={{ fontSize: "16px", marginBottom: "40px", marginLeft: "10px" }}>No unpublished Artists</Grid>}
      </Grid>
    </Grid>
  )
};

export default AdminArtist;