import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const PostItem = (props) => {
  const {id, title, excerpt, featured_media} = props.post;

  const [postImage, setPostImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/media/${featured_media}`)
    .then((res) => {
      setPostImage(res.data.media_details.sizes.medium_large.source_url)
    })
    .catch((err) => {
      setError(err.message)
    })
  }, [])

  return (
    <div className="col-6 post-item">
      <Link to={`/post/${id}`}>
        <img className="img-fluid" src={postImage} alt=""/>
        <p dangerouslySetInnerHTML={{__html: excerpt.rendered}}></p>
      </Link>
      <div className="post-item-overlay"></div>
    </div>
  );
}

export default PostItem;
