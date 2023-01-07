import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { uploadsAlbumsUrl } from "../../constants";
import { publishAlbumAdmin, deleteAlbumAdmin} from "../../store/actions/adminActions";
import { useDispatch } from "react-redux";


const AdminAlbums = ({albums}) => {
  const dispatch = useDispatch();

  const clickDeleteHandler = (id) => {
    dispatch(deleteAlbumAdmin(id));
   };

   const clickPablishedHandler = (id) => {
    dispatch(publishAlbumAdmin(id))
  };

  return (
    <Grid container direction="column" spacing={2} style={{marginTop: "15px"}}>
      <Typography variant="h4">
      <hr/>
           List of Albums for publishing
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
                  Artist is {album.artist.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={()=>clickPablishedHandler(album._id)} >
                    {"Publish"}
                  </IconButton>
                  <IconButton onClick={()=>clickDeleteHandler(album._id)} >
                    {"Delete"}
                  </IconButton >
                </CardActions>
              </Card>
            </Grid>
          )
        })) : <Grid style={{ fontSize: "16px", marginBottom: "40px", marginLeft:"10px" }}>No unpublished Albums</Grid>}
      </Grid>
    </Grid>
  )
};

export default AdminAlbums;