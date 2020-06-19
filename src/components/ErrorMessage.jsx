import React from "react";
import ErrorImg from "../assets/img/error.png";

const ErrorMessage = (props) => {
  return (
    <div className="error-message">
      <img className="img-fluid" style={{maxWidth: "300px"}} src={ErrorImg} alt=""/>
      <p
        className="text-center lead"
        dangerouslySetInnerHTML={{__html: props.message}}
      />
    </div>
  );
}

export default ErrorMessage;
