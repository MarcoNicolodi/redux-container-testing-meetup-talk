import React from "react";

const Alert = ({ children, level }) => (
  <div className={`alert alert-${level}`} role="alert">
    {children}
  </div>
);

export default Alert;
