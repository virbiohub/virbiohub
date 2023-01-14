import Export from "./Export";
import { useTable } from "react-table";
import { useDispatch } from "react-redux";
import React, { useCallback, useState, useEffect } from "react";
import { transformColumnName } from "../utils/helpers/transformColumnName";
import renderAccessionCell from "../utils/helpers/renderAccessionCell";
import "./Table.css";
//import Search from "./Search";
import { actions } from "../store/slices/ViralInfectionPredicterSlice";

const PredicterResultTable = ({ data, headers }) => {
  const [columns, setcolumns] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setIsResultExist(false));
    getHeaders(headers);
  }, []);

  const renderDataWithTooltip = (value) => {
    const values = value.split(";");
    const accesion = values[0];
    const id = Math.random().toString(36);

    if (value === "--;-- ") {
      return;
    }
    if (value === "-") {
      return "-";
    }

    let accesion_value =
      accesion.split("/").length > 1
        ? accesion?.split("/")?.[1] + "/" + accesion?.split("/")?.[0]
        : accesion;

    return (
      <span data-tip="" data-for={id}>
        {renderAccessionCell(accesion_value)}
      </span>
    );
  };
  const handleColumnName = (col) => {
    const keys = col.split("_");

    let title = "";
    for (let i = 1; i < keys.length; i++) {
      title = title + " " + keys[i][0].toUpperCase() + keys[i].slice(1);
    }

    return title;
  };

  const getHeaders = useCallback(
    (headers) => {
      for (const key in headers) {
        const obj = {
          Header:
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/_/g, " ").toUpperCase(),
          columns: [],
        };

        for (const column of headers[key]) {
          obj.columns.push({
            Header: handleColumnName(column),
            accessor: column,
            id: Math.random().toString(),
          });
        }

        setcolumns((columns) => [...columns, obj]);
      }
    },
    [headers, columns, setcolumns]
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
      data: data,
    });

  return (
    <div className="m-5">
      <div
        className="dropdown"
        style={{ marginLeft: "93.5%", marginTop: "6%" }}
      >
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          style={{ marginBottom: "10px" }}
          id="dropdownMenuButton"
          data-toggle="dropdown"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          Export
        </button>
        {showDropdown && (
          <Export
            columns={columns}
            selectedrows={data}
            isColumnVisibility={false}
          />
        )}
      </div>
      <div style={{ overflowX: "auto", overflowY: "auto" }}>
        <table
          {...getTableProps()}
          className="table table-striped  table-bordered text-center"
          style={{ width: "100%" }}
        >
          <thead className="border table-success">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-white  flex-column th-sm "
                    style={{
                      textAlign: "center",
                      backgroundColor: "#2B7C85",
                      fontSize: "14px",
                      fontWeight: "normal",
                      alignContent: "center",
                      height: "50px",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    lineHeight: "25px",
                    minHeight: "25px",
                    height: "25px",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <>
                          {cell.column.Header.includes("Fiber") ||
                          cell.column.Header.includes("Receptor") ? (
                            <span>{renderDataWithTooltip(cell.value)}</span>
                          ) : (
                            <span>{cell.value}</span>
                          )}
                        </>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredicterResultTable;
