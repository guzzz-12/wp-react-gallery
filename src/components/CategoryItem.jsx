import React from "react";
import {NavLink} from "react-router-dom";

const CategoryItem = (props) => {
  const setCurrentCategory = (cat) => {
    props.selectedCategory(cat)
  }

  return (
    <NavLink exact to={`/category/${props.category.id}`}>
      <li
        className="list-group-item text-center border-bottom category-item"
        onClick={() => setCurrentCategory(props.category.name)}
      >
        {props.category.name}
      </li>    
    </NavLink>
  );
}

export default CategoryItem;
