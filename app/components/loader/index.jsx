import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSpinner from "@fortawesome/fontawesome-free-solid/faSpinner";

const Loader = () => (
  <span>
    <FontAwesomeIcon icon={faSpinner} spin size="lg" />
  </span>
);

export default Loader;
