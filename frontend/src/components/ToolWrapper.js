import React, { useState } from "react";
import "./ToolWrapper.css";
import { Link } from "react-router-dom";
import { GiVirus } from "react-icons/gi";
import { RiVirusLine } from "react-icons/ri";
import { BsTable } from "react-icons/bs";
import { Card, CardBody, CardTitle } from "reactstrap";
import { GrCatalog } from "react-icons/gr";

const ToolWrapper = (props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="col-sm"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      style={{ marginLeft: "25px", marginRight: "25px" }}
    >
      <Link
        to={props.path}
        className="container"
        style={{ margin: "3px", textDecoration: "none" }}
      >
        <div
          className="card shadow-lg"
          style={
            isHover
              ? {
                  transform: "scale(1.10)",
                  transition: "transform .3s",
                }
              : null
          }
        >
          <Card
            className="cardContainer"
            style={{ backgroundColor: `${props.backgroundColor}` }}
          >
            <div className="cardImg" style={{ color: `${props.color}` }}>
              {props.type === "db" ? (
                <GrCatalog size={60} style={{ marginLeft: "17px" }} />
              ) : props.title === "Virus-Host PPI Predictor" ? (
                <RiVirusLine size={60} style={{ marginLeft: "20px" }} />
              ) : (
                <GiVirus size={60} style={{ marginLeft: "12px" }} />
              )}
            </div>
            <br />
            <CardBody>
              <CardTitle
                className="cardText"
                style={{ color: `${props.color}` }}
              >
                {props.title}
              </CardTitle>
            </CardBody>
          </Card>
        </div>
      </Link>
    </div>
  );
};

export default ToolWrapper;
