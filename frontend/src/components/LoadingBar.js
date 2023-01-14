import React from "react";
import { Spinner } from "react-bootstrap";
const LoadingBar = () => {
  // const isLoading = useSelector(state => state.ui.status.isLoading);

  return (
    <div
      className="loading-bar"
      style={{
        marginTop: "24%",
        marginLeft: "40%",
      }}
    >
      <Spinner
        animation="border"
        style={{
          color: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,55,1) 35%, rgba(0,212,255,1) 100%)`,
        }}
      />
    </div>
  );
};

export default LoadingBar;
