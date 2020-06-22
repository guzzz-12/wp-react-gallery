import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import PostsByCategory from "./components/PostsByCategory";
import CategoryMenu from "./components/CategoryMenu";
import SinglePost from "./components/SinglePost";
import SearchResults from "./components/SearchResults";
import {SearchContext} from "./context/searchContext";
import "./main.css";

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Buscar el nombre de la categoría si el usuario actualiza la página de una categoría
  // y actualizar el state
  useEffect(() => {
    if(window.location.href) {
      const currentUrl = window.location.href.split("/");
      const categoryId = currentUrl[currentUrl.length - 1];

      axios.get(`/categories/${categoryId}`)
      .then((res) => {
        setCurrentCategory(res.data.name);
      })
      .catch((err) => console.log(err.message))
    }
  }, [])

  // Actualizar el state del nombre de la categoría
  const selectedCategory = (cat) => {
    setCurrentCategory(cat)
  }

  // Ejecutar la búsqueda
  const search = async (term) => {
    try {
      setIsSearching(true);
      const results = await axios.get(`/search?search=${term}&type=post`);
      setSearchResults(results.data);
      setIsSearching(false);
      
    } catch (error) {
      setIsSearching(false);
      setSearchError(error.message)
    }
  }

  return (
    <div className="main-wrapper">
      <SearchContext.Provider
        value={{
          searchTerm,
          isSearching,
          setSearchTerm,
          search,
          searchResults,
          searchError
        }}
      >
        <BrowserRouter>
          <Header />
          <div className="main-content container-md pt-3">
            <div className="row justify-content-center">
              <div className="col-md-3 col-sm-3 mb-5">
                <CategoryMenu selectedCategory={selectedCategory} />
              </div>
              <div className="col-md-9 col-sm-8">
                <Switch>
                  <Route exact path="/" component={MainContent} />
                  <Route
                    exact
                    path="/category/:categoryId"
                    render={() => <PostsByCategory currentCategory={currentCategory}/>}
                  />
                  <Route exact path="/post/:postId" component={SinglePost} />
                  <Route exact path="/search" component={SearchResults} />
                </Switch>
              </div>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
