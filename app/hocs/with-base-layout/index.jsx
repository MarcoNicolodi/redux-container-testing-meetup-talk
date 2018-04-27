import React from "react";
import Navbar from "../../components/navbar";

const withBaseLayout = Component => props => (
  <React.Fragment>
    <Navbar />
    <Component {...props} />
  </React.Fragment>
);

export default withBaseLayout;
