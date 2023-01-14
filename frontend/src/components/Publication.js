import React from "react";

const Publication = (props) => {
  return (
    <div className="container" style={{ marginTop: "1%" }}>
      <div className="row featurette shadow-lg p-4  rounded">
        <p style={{ fontSize: "15px" }}>
          {props.authors}
          <a
            href={props.url}
            target="_blank"
            style={{
              marginLeft: "2%",
              marginRight: "1%",
              textDecoration: "None",
              color: "blue",
            }}
            rel="noreferrer"
          >
            {props.title}
          </a>
          {props?.date}
        </p>
      </div>
    </div>
  );
};

export default Publication;
