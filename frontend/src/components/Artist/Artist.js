import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { uploadsUrl } from "../../constants";

const Artist = ({ artists }) => {
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
          <Typography variant="h4" style={{ marginLeft: "530px" }}>
            Artists
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {artists.map(artist => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={artist._id} >
              <Card style={{ backgroundColor: "#dcebf8", marginBottom: "50px" }}>
                <CardHeader title={artist.name} />
                <CardContent>
                  <img src={`${uploadsUrl}/${artist.image}`} alt="pic" style={{ width: '200px', height: "200px" }} />
                </CardContent>
                <CardActions>
                  <IconButton component={Link} to={"/albums/" + artist._id} >
                    {"Learn more >>>"}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Artist;