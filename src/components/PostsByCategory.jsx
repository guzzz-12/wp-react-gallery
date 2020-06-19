import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import PostItem from "./PostItem";
import ErrorMessage from "./ErrorMessage";

const PostsByCategory = (props) => {
  const {categoryId} = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/posts?categories=${categoryId}`)
    .then((res) => {
      setPosts(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setIsLoading(false);
    })
  }, [categoryId])

  return (
    <div className="content-wrapper">
      <h3>Posts by Category: {props.currentCategory}</h3>
      <div className="row">
        {!isLoading && error &&
          <ErrorMessage message={`There was an error trying to load the <strong>${props.currentCategory}</strong> category posts.`} />
        }
        {!isLoading && !error && posts.length > 0 &&
          posts.map(post => {
            return (
              <PostItem key={post.id} post={post} />
            )
          })        
        }
        {!isLoading && !error && posts.length === 0 &&
          <div className="w-100 mt-5">
            <h3 className="lead text-center">No posts found for this category.</h3>
          </div>
        }
      </div>
    </div>
  );
}

export default PostsByCategory;