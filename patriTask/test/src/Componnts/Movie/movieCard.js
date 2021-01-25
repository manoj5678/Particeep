import React, { Component } from 'react';
import Card                  from '@material-ui/core/Card';
import CardActionArea        from '@material-ui/core/CardActionArea';
import CardActions           from '@material-ui/core/CardActions';
import CardContent           from '@material-ui/core/CardContent';
import CardMedia             from '@material-ui/core/CardMedia';
import Typography            from '@material-ui/core/Typography';
import IconButton            from '@material-ui/core/IconButton';
import ThumbUpOutlinedIcon   from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpRoundedIcon    from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon  from '@material-ui/icons/ThumbDownRounded';
import { connect }           from "react-redux";

class MediaCard extends Component {
  handleClickLikeDislike = (movie, action) => {
    if (action === 'like') {
      let updateMovie = {
        ...movie,
        like: movie.like ? !movie.like : true,
        dislike: null
      }
      this.props.dispatch({
        type: 'UPDATE_DATA',
        id: movie.id,
        data: updateMovie
      })
      this.props.onChange(updateMovie)
    }
    if (action === 'dislike') {
      let updateMovie = {
        ...movie,
        like: null,
        dislike: movie.dislike ? !movie.dislike : true
      }
      this.props.dispatch({
        type: 'UPDATE_DATA',
        id: movie.id,
        data: updateMovie
      })
      this.props.onChange(updateMovie)
    }
  }

  render() {
    const {movieData} = this.props
    return (
        <Card>
          <CardActionArea>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={movieData.image && movieData.image.original ? movieData.image.original: (movieData.image && movieData.image.medium ? movieData.image.medium : null)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {movieData.name ? movieData.name : "Unknown"}
              </Typography>
              <ui style={{textAlign: "left"}}>
                <li>Type: <b>{movieData.type}</b></li>
                <li>Genres: <b>
                  {movieData.genres.length ? movieData.genres.join(', '): null}
                </b></li>
              </ui>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton color="primary" onClick={() => this.handleClickLikeDislike(movieData, "like")}>
              {movieData.like === true ? <ThumbUpRoundedIcon/> :<ThumbUpOutlinedIcon />}
            </IconButton>
            <IconButton color="secondary" onClick={() => this.handleClickLikeDislike(movieData, "dislike")}>
              {movieData.dislike === true ? <ThumbDownRoundedIcon/> :<ThumbDownOutlinedIcon />}
            </IconButton>
          </CardActions>
        </Card>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state
  }
}
export default connect(mapStateToProps)(MediaCard);
