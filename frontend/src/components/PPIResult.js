import React, { useCallback, useState, useEffect } from "react";
import { useTable } from "react-table";
import Export from "./Export";
import { useDispatch, useSelector } from "react-redux";
import { PPIactions } from "../store/slices/PPISlice";
const PPIResult = ({ results }) => {
  const dispatch = useDispatch();
  const col = useSelector((state) => state.ppiPredicter.tools);

  useEffect(() => {
    dispatch(PPIactions.setIsResultExist(false));
  }, []);

  const PPIPredictionResultTableColumns = React.useMemo(() => {
    const result = [
      {
        Header: "Pairs",
        columns: [
          { Header: "Host", accessor: "host" },
          { Header: "Virus", accessor: "virus" },
        ],
      },
    ];
    col.includes("m2") &&
      result.push({
        Header: "Hopitor",
        columns: [
          {
            Header: "Probability",
            accessor: "hopitor_accuracy",
            Cell: (info) => {
              return <p>{Number(info.value).toFixed(2)}</p>;
            },
          },
          {
            Header: "Result",
            accessor: "hopitor_pred",
            Cell: (info) => {
              return <p>{info.value == "-1" ? 0 : 1}</p>;
            },
          },
        ],
      });
    col.includes("m3") &&
      result.push({
        Header: "HVPPI",
        columns: [
          {
            Header: "Probability",
            accessor: "hvppi_accuracy",
            Cell: (info) => {
              return <p>{Number(info.value).toFixed(2)}</p>;
            },
          },
          {
            Header: "Result",
            accessor: "hvppi_pred",
            Cell: (info) => {
              return <p>{info.value == "no" ? 0 : 1}</p>;
            },
          },
        ],
      });

    return result;
  }, [col]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: PPIPredictionResultTableColumns,
      data: results,
    });
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="m-5">
      <div
        className="dropdown"
        style={{ marginBottom: "10px", marginLeft: "93%", marginTop: "6%" }}
      >
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          Export
        </button>
        {showDropdown && (
          <Export selectedrows={results} isColumnVisibility={false} />
        )}
      </div>
      <table
        {...getTableProps()}
        className="table table-striped  table-bordered text-center"
        style={{ width: "100%" }}
      >
        <thead>
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
                style={{ border: "0.25px solid black" }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PPIResult;
