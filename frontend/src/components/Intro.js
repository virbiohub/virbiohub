import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
const Intro = (props) => {
  return (
    <div>
      <p
        style={{
          fontSize: "17px",
          width: "100%",
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
