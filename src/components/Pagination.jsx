import React from "react";

const Pagination = (props) => {
  // Crear array de números de cada página de posts
  const pagesArray = Array(parseInt(props.totalPages));
  const numbersArray = [];
  for(let i = 0; i < pagesArray.length; i++) {
    numbersArray.push(i + 1)
  }

  // Setear la página actual
  const setCurrentPageHandler = (page) => {
    props.setCurrentPage(page)
  }

  // Crear paginación
  const pages = () => {
    return numbersArray.map(num => {
      return (
        <li
          key={num}
          className={`page-item ${props.currentPage === num && "active"}`}
          onClick={() => setCurrentPageHandler(num)}
        >
          <span className="page-link" href="/">{num}</span>
        </li>
      )
    })
  }
  
  return (
    <div className="container w-100 mt-4 d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages()}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
