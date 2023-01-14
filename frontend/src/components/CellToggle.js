import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
const CellToggle = ({ cell }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleHandler = () => {
    setIsToggled(!isToggled);
  };

  return (
    <p
      style={{
        textAlign: "left",
      }}
    >
      {cell?.value?.length > 50 && !cell.column.Header.includes("Accession") ? (
        <>
          {isToggled ? (
            <span>{cell?.value}</span>
          ) : (
            cell?.value.slice(0, 50) + "..."
          )}
          <span
            style={{
              color: "#175873",
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => toggleHandler()}
          >
            <br />
            {isToggled ? (
              <>
                Show Less
                <div style={{ marginTop: "8%" }}>
                  <AiOutlineArrowUp />
                </div>
              </>
            ) : (
              <>
                Show More
                <div style={{ marginTop: "8%" }}>
                  <AiOutlineArrowDown />
                </div>
              </>
            )}
          </span>
        </>
      ) : (
        <span>{cell?.value}</span>
      )}
    </p>
  );
};

export default CellToggle;
