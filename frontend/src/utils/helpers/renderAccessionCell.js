const renderAccessionCell = (value) => {
  return (
    <span>
      {value.split("/")[0] !== "-" ? (
        <a
          style={{
            cursor: "pointer",
            color: "#175873",
          }}
          href={`https://www.uniprot.org/uniprot/${value.split("/")[0]}`}
          target="_blank"
          rel="noreferrer"
        >
          {value.split("/")[0]}
        </a>
      ) : (
        "N/A"
      )}
      {typeof value.split("/")[1] === "undefined" ? (
        value.split("/")[1]?.length > 0 ? (
          "-"
        ) : null
      ) : (
        <span>{" / " + value.split("/")[1]}</span>
      )}
    </span>
  );
};

export default renderAccessionCell;
