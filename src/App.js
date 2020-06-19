import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import PostsByCategory from "./components/PostsByCategory";
import CategoryMenu from "./components/CategoryMenu";
import SinglePost from "./components/SinglePost";
import "./main.css";

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);

  const selectedCategory = (cat) => {
    setCurrentCategory(cat)
  }

  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Header />
        <div className="main-content container pt-3">
          <div className="row">
            <div className="col-3">
              <CategoryMenu selectedCategory={selectedCategory} />
            </div>
            <div className="col-9">
              <Switch>
                <Route exact path="/" component={MainContent} />
                <Route
                  exact
                  path="/category/:categoryId"
                  render={() => <PostsByCategory currentCategory={currentCategory}/>}
                />
                <Route exact path="/post/:postId" component={SinglePost} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
