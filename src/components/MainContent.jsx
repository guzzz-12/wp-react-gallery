import React, {useEffect, useState} from "react";
import axios from "axios";
import PostItem from "./PostItem";
import ErrorMessage from "./ErrorMessage";

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/posts")
    .then((res) => {
      setPosts(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
      console.log(err.message)
    })
  }, [])

  return (
    <div className="content-wrapper">
      <h3>All Posts</h3>
      <div className="row">
        {!isLoading && error &&
          <ErrorMessage />
        }
        {!isLoading && !error &&
          posts.map(post => {
            return (
              <PostItem key={post.id} post={post} />
            )
          })      
        }
      </div>
    </div>
  );
}

export default MainContent;
