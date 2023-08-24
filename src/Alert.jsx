import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list}) => {
  console.log(msg, type, removeAlert)
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 1200);
    return () => clearTimeout(timeout)
  }, [list])
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
