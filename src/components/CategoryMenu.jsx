import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import CategoryItem from "./CategoryItem";

const CategoryMenu = (props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    axios.get("/categories?_fields=id,name")
    .then((res) => {
      setCategories(res.data)
      setIsLoading(false)
    })
    .catch((error) => {
      setErr(error.message)
      setIsLoading(false)
    })
  }, [])

  return (
    <ul className="list-group">
      <React.Fragment>
        {isLoading &&
          <SkeletonTheme color="#a0a0a0" highlightColor="#c5c5c5">
            <p>
              <Skeleton count={7} height={35}/>
            </p>
          </SkeletonTheme>
        }
        {!isLoading &&
          <React.Fragment>
            <NavLink exact to={`/`}>
              <li className="list-group-item border-bottom category-item">
                All
              </li>
            </NavLink>
            {categories.map(category => {
              return (
                <CategoryItem
                  key={category.id}
                  category={category}
                  selectedCategory={props.selectedCategory}
                />
              )
            })}
          </React.Fragment>        
        }
      </React.Fragment>
    </ul>
  );
}

export default CategoryMenu;
