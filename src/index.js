import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
axios.defaults.baseURL = "http://localhost/gallery-theme/wp-json/wp/v2"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
