import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import ErrorMessage from "./ErrorMessage";

const SinglePost = (props) => {
  const {postId} = useParams();

  const [post, setPost] = useState({});
  const [postAuthor, setPostAuthor] = useState(null);
  const [postImg, setPostImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar data del post y la imagen del post
  useEffect(() => {
    axios.get(`/posts/${postId}`)
    .then((res) => {
      setPost(res.data);
      return axios.get(`/media/${res.data.featured_media}`);
    })
    .then((res) => {
      setPostImg(res.data.guid.rendered);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
      console.log(err.message)
    })

    // Buscar el autor del post
    if(Object.keys(post).length > 0) {
      axios.get(`/users/${post.author}`)
      .then((res) => {
        setPostAuthor(res.data.name)
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message)
      })
    }
  }, [postId, post]);

  return (
    <React.Fragment>
      {isLoading && !error &&
        <React.Fragment>
          <SkeletonTheme color="#a0a0a0" highlightColor="#c5c5c5">
            <p>
              <Skeleton count={1} height={25} />
              <Skeleton count={1} height={500} />
              <Skeleton count={3} height={15} />
            </p>
          </SkeletonTheme>
        </React.Fragment>
      }
      {!isLoading && !error &&
        <div className="single-post mb-3">
          <p className="single-post__date border-bottom pb-3">
            Posted on: {moment(post.date).format('MMMM Do YYYY, h:mm:ss a')} &nbsp; &mdash; &nbsp; By <strong>{postAuthor}</strong>
          </p>
          <div className="single-post__img">
            <img className="img-fluid mb-3" src={postImg} alt=""/>
          </div>
          <div className="single-post__content" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
        </div>
      }
      {!isLoading && error &&
        <ErrorMessage message="There was an error trying to load the post data." />
      }
    </React.Fragment>
  );
}

export default SinglePost;
