import React, { useState, useEffect } from "react";
import "./ColumnToggle.css";

const ColumnToggle = ({ allColumns, show }) => {
  const [showToggleMenu, setShowToggleMenu] = useState(true);
  return (
    <div
      className="toggle-container overflow-auto "
      style={{
        display: !showToggleMenu || !show ? "none" : null,
        marginTop: "2%",
      }}
      onMouseLeave={() => {
        setShowToggleMenu(false);
      }}
    >
      {allColumns?.map((column) => {
        return (
          <div className="list-group-item " key={Math.random().toString()}>
            <label>
              {typeof column.Header !== "string" ? null : (
                <input
                  type="checkbox"
                  {...column.getToggleHiddenProps()}
                ></input>
              )}
              {column?.Header}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnToggle;
