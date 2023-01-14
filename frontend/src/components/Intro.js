import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ppiImage from "../assets/ppi1.jpg";
const Intro = (props) => {
  return (
    <div>
      <h3 className="featurette-heading ">Welcome to VirBioHub</h3>
      <p
        className=" mt-4"
        style={{
          fontSize: "17px",
          width: "90%",
          height: "100%",
          textAlign: "justify",
          whiteSpace: "pre-line",
          verticalAlign: "bottom",
        }}
      >
        {props.content}
      </p>
    </div>
  );
};

export default Intro;
