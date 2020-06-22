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
        {/* Mostrar spinner al cargar data de los posts */}
        {isLoading && !error &&
          <div className="spinner-wrapper w-100">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }
        {!isLoading && error &&
          <ErrorMessage message="There was an error trying to load the posts." />
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
