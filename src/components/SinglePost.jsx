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
    const fetchData = async () => {
      try {
        // Cargar data del post
        const postData = await axios.get(`/posts/${postId}`);
        setPost(postData.data);

        // Cargar imagen del post
        const postImg = await axios.get(`/media/${postData.data.featured_media}`);
        setPostImg(postImg.data.guid.rendered);

        // Buscar el autor del post
        const postAuthor = await axios.get(`/users/${postData.data.author}`);
        setPostAuthor(postAuthor.data.name);

        setIsLoading(false)

      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.log(err.message)
      }
    }

    fetchData();
    
  }, [postId]);

  return (
    <React.Fragment>
      {isLoading && !error &&
        <React.Fragment>
          <SkeletonTheme color="#a0a0a0" highlightColor="#c5c5c5">
            <p>
              <Skeleton count={1} width="50%" height={25} />
              <Skeleton count={1} height={500} />
              <Skeleton count={1} width="98%" height={15} />
              <Skeleton count={1} width="95%" height={15} />
              <Skeleton count={1} width="50%" height={15} />
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
