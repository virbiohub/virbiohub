import React from "react";

const Search = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
      ></input>
    </span>
  );
};

export default Search;
