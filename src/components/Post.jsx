import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_POST, GET_POST, LIKE_POST } from "../api/apiCalls";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.user);
  const [likes, setLikes] = React.useState(post?.likes);
  const userId = authData?.result?.googleId || authData?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const navigate = useNavigate();

  const handleLike = async () => {
    LIKE_POST(post._id, dispatch);
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon />
          &nbsp;
          {likes.length > 2 ? (
            <span className="font-[Poppins] text-sm ">
              {" "}
              {`You and ${likes.length - 1} others`}
            </span>
          ) : (
            <span className="font-[Poppins] text-sm ">
              {`${likes.length} like${likes.length > 1 ? "s" : ""}`}
            </span>
          )}
        </>
      ) : (
        <>
          <FavoriteBorder />
          <span className="font-[Poppins] text-sm ">
            &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </>
      );
    }

    return (
      <>
        <FavoriteBorder />
        {/* &nbsp;Like */}
      </>
    );
  };

  return (
    <Card>
      <CardHeader
        sx={{ minHeight: 100 }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.creator.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => GET_POST(post._id, dispatch)}
          >
            {(authData?.result?._id === post.userId ||
              authData?.result?.googleId === post.userId) && <MoreVertIcon />}
          </IconButton>
        }
        title={post.creator}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        sx={{ maxHeight: { lg: 150, sm: 140 } }}
        // height="194"
        image={post.selectedFile}
      />
      <CardContent sx={{ minHeight: { lg: 150, sm: 150 } }}>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          {post.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {post?.tags?.map((t) => `#${t} `)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.message.length > 50
            ? `${post.message.substring(0, 50)}`
            : post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label="add to favorites"
          disabled={!authData}
          color="error"
          onClick={handleLike}
        >
          <Likes />
        </Button>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {(authData?.result?._id === post.userId ||
          authData?.result?.googleId === post.userId) && (
          <IconButton
            aria-label="share"
            onClick={() => DELETE_POST(post._id, dispatch)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
