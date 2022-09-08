import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import "./blog.css";

const Blog = ({
  title,
  description,
  imageURL,
  userName,
  createdAt,
  isUser,
  id,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://blogweb-node.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div className="blog-card">
      {" "}
      <Card
        sx={{
          width: "100%",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="warning" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
          subheader={new Date(createdAt).toDateString()}
        />

        <CardMedia
          component="img"
          height="184"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
