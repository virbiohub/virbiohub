import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LauncherCard.css";
import {FiExternalLink} from "react-icons/fi";
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
      className="p-2 rounded align-center mainContainer"
      style={{
        height: "50%",
        width: "40%",
        ...style,
      }}
    >
      <div
        className="p-2 rounded align-center fs-2"
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
          to={to}
          style={{
            textDecoration: "underline",
            width: "90%",
            height: "90%",
            color: "#00ADB5",
          }}
        >
          {iconTitle2} <FiExternalLink size={30} style={{ display: "inline-block" }}/>
        </Link>
      </div>
    </div>
  );
};

export default LauncherCard;
