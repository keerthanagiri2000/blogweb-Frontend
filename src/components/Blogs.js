import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://blogweb-node.herokuapp.com/api/blog")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  
  return (
    <div className="blogs-container">
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
            createdAt={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
