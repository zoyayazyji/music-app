import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { uploadsAlbumsUrl } from "../../constants";
import { Link } from "react-router-dom";

const Album = ({ albums }) => {

  return (
    <Grid container direction="column" spacing={2}>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4">
            {albums[0]?.artist.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {albums.length > 0 ? (albums.map(album => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={album._id} >
              <Card style={{ backgroundColor: "#dcebf8" }}>
                <CardHeader title={album.title} />
                <CardContent>
                  {album.image ? (
                    <img src={`${uploadsAlbumsUrl}/${album.image}`} alt="pic"
                      style={{ width: '200px', height: "200px" }} />
                  ) : (<img src="https://becompact.ru/upload/iblock/5e4/5e4a8f969a51729d5b30acdfeff1edc7.jpg" alt="pic" style={{ width: '200px', height: "200px" }} />)}
                  <Typography component="div">
                    Relise at {album.relise}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton component={Link} to={"/tracks/" + album._id} >
                    {"Learn more >>>"}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })) : <Grid style={{ margin: "0 auto", fontSize: "28px" }}>No information yet &#9785;</Grid>}
      </Grid>
    </Grid>
  )
};

export default Album;