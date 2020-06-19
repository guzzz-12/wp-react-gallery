import React from "react";
import ErrorImg from "../assets/img/error.png";

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <img className="img-fluid" style={{maxWidth: "300px"}} src={ErrorImg} alt=""/>
      <h3 className="text-center">There was an error trying to load the posts.</h3>
    </div>
  );
}

export default ErrorMessage;
