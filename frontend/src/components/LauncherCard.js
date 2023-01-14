import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LauncherCard.css";
const LauncherCard = ({
  iconTitle1,
  iconTitle2,
  bg,
  hoverColor,
  to,
  style,
}) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className=" p-2  rounded align-center mainContainer"
      style={{
        height: "50%",
        width: "40%",
        ...style,
      }}
    >
      <div
        className=" p-2  rounded align-center"
        style={
          isHover
            ? {
                transform: "scale(1.05)",
                transition: "transform .3s",
              }
            : null
        }
      >
        <Link
          className="btn  btn-block "
          to={to}
          style={{
            backgroundColor: `${bg}`,
            width: "90%",
            height: "90%",
          }}
        >
          <h4 className="text-white" style={{ margin: "20px" }}>
            {iconTitle2}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default LauncherCard;
