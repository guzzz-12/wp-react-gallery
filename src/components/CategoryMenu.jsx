import React, {useState, useEffect} from "react";
import axios from "axios";
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
      {categories.map(category => {
        return (
          <CategoryItem
            key={category.id}
            category={category}
            selectedCategory={props.selectedCategory}
          />
        )
      })}
    </ul>
  );
}

export default CategoryMenu;
