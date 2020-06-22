import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {SearchContext} from "../context/searchContext";
import ErrorMessage from "./ErrorMessage";

const SearchResults = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="content-wrapper">
      <h3 className="mb-3">Search results for: {searchContext.searchTerm}</h3>
      <div className="row">
        {!searchContext.isSearching && searchContext.searchError &&
          <ErrorMessage message="There was an error searchig the posts."/>
        }
        {/* Mostrar spinner mientras cargan los resultados de la búsqueda */}
        {searchContext.isSearching &&
          <div className="spinner-wrapper w-100">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }
        {!searchContext.isSearching && !searchContext.searchError &&
        <React.Fragment>
          <div className="col-2"></div>
          <div className="col-8 search-results">
            <ul className="list-group">
              {/* Mostrar mensaje en caso de no retornar resultados */}
              {!searchContext.isSearching && searchContext.searchResults.length === 0 &&
                <div className="w-100 mt-5">
                  <h3 className="lead text-center">
                    No results found for <span className="font-weight-bold">{searchContext.searchTerm}</span>
                  </h3>
                </div>
              }
              {/* Mostrar lista de resultados */}
              {!searchContext.isSearching && searchContext.searchResults.length > 0 && searchContext.searchResults.map(post => {
                return (
                  <Link to={`/post/${post.id}`}>
                    <li className="list-group-item list-group-item-secondary mb-1">{post.title}</li>
                  </Link>
                )
              })}
            </ul>
          </div>
          <div className="col-2 offset-10"></div>
        </React.Fragment>
        }
      </div>
    </div>
  );
}

export default SearchResults;
