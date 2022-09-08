import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blogweb-node.herokuapp.com/api/blog/user/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  
  return (
    <div
      className="myBlog-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
            createdAt={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
