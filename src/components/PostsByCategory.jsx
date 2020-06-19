import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import PostItem from "./PostItem";

const PostsByCategory = (props) => {
  const {categoryId} = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/posts?categories=${categoryId}`)
    .then((res) => setPosts(res.data))
    .catch((error) => setError(error.message))
  }, [categoryId])

  return (
    <div className="content-wrapper">
      <h3>Posts by Category: {props.currentCategory}</h3>
      <div className="row">
        {posts.map(post => {
            return (
              <PostItem key={post.id} post={post} />
            )
        })}
      </div>
    </div>
  );
}

export default PostsByCategory;