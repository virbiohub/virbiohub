import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  const filterHandler = (event) => {
    setFilter(event.target.value);
  };
  return (
    <span>
      <input value={filterValue || ""} onChange={filterHandler}></input>
    </span>
  );
};

export default ColumnFilter;
