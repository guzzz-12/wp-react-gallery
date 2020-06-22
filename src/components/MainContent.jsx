import React, {useEffect, useState} from "react";
import axios from "axios";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import ErrorMessage from "./ErrorMessage";

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/posts?page=${currentPage}&per_page=${postsPerPage}`)
    .then((res) => {
      setPosts(res.data);
      setIsLoading(false);
      setTotalPosts(res.headers["x-wp-total"]);
      setTotalPages(res.headers["x-wp-totalpages"]);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
      console.log(err.message)
    });

    // Scrollear al top
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

    // eslint-disable-next-line
  }, [currentPage]);

  // Actualizar el número de la la página actual
  const currentPageHandler = (page) => {
    setCurrentPage(page);
  }

  return (
    <React.Fragment>
      <div className={`content-wrapper pb-3 ${!isLoading && "border-bottom"}`}>
        <h3>All Posts</h3>
        <div className="row">
          {/* Mostrar spinner al cargar data de los posts */}
          {isLoading && !error &&
            <div className="spinner-wrapper w-100">
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
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
      {!isLoading && totalPages &&
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={currentPageHandler}
        />
      }
    </React.Fragment>
  );
}

export default MainContent;
