import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import ErrorMessage from "./ErrorMessage";

const PostItem = (props) => {
  const {id, excerpt, featured_media} = props.post;

  const [postImage, setPostImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/media/${featured_media}`)
    .then((res) => {
      setPostImage(res.data.media_details.sizes.medium_large.source_url);
      setIsLoading(false)
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false)
    });
    
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <div className="col-lg-6 post-item">
        {isLoading && !error &&
          <React.Fragment>
            <SkeletonTheme color="#a0a0a0" highlightColor="#c5c5c5">
              <p>
                <Skeleton count={1} height={350} />
                <Skeleton count={1} width="100%" height={15}/>
                <Skeleton count={1} width="90%" height={15}/>
                <Skeleton count={1} width="95%" height={15}/>
                <Skeleton count={1} width="50%" height={15}/>
              </p>
            </SkeletonTheme>
          </React.Fragment>
        }
        {!isLoading && !error &&
        <React.Fragment>
          <Link to={`/post/${id}`}>
            <img className="img-fluid" src={postImage} alt=""/>
            <p dangerouslySetInnerHTML={{__html: excerpt.rendered}}></p>
          </Link>
          <div className="post-item-overlay"></div>
        </React.Fragment>
        }
        {!isLoading && error &&
          <ErrorMessage message="There was an error trying to load the post." />
        }
      </div>      
    </React.Fragment>
  );
}

export default PostItem;
