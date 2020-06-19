import React, {useEffect, useState} from "react";
import axios from "axios";
import PostItem from "./PostItem";

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/posts")
    .then((res) => {
      setPosts(res.data);
      console.log(res.data)
    })
    .catch((err) => {
      setError(err.message);
      console.log(err.message)
    })
  }, [])

  return (
    <div className="content-wrapper">
      <h3>All Posts</h3>
      <div className="posts-items">
        {posts.map(post => {
          return (
            <PostItem key={post.id} post={post} />
          )
        })}
      </div>
    </div>
  );
}

export default MainContent;
