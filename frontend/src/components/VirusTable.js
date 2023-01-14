import React, { useState, useEffect, useCallback } from "react";
import Export from "./Export";
import { useSelector } from "react-redux";
import TablePagination from "./TablePagination";
import { transformColumnName } from "../utils/helpers/transformColumnName";
import ColumnFilter from "../components/ColumnFilter";
import ColumnToggle from "./ColumnToggle";
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import CheckBox from "./CheckBox";
import renderAccessionCell from "../utils/helpers/renderAccessionCell";
//import Search from "./Search";
import CellToggle from "../components/CellToggle";
import { RiArrowRightUpFill } from "react-icons/ri";

const VirusTable = () => {
  const headers = useSelector((state) => state.tableData.headers);
  const [columns, setcolumns] = useState([]);
  const [referenceIDs, setReferenceIDs] = useState(
    "https://pubmed.ncbi.nlm.nih.gov/?format=abstract&term="
  );
  let ref = "https://pubmed.ncbi.nlm.nih.gov/?format=abstract&term=";
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  useEffect(() => {
    setcolumns([]);
    getHeaders(headers);
  }, []);
  const transformReceptorColumn = (column) => {
    let str = column.split("_");

    let title = str[1] + " " + str[2].split(";")[0];

    let ids = str[2].split(";").slice(1);

    let url = "";
    ids.map((id) => {
      setReferenceIDs((ref) => ref + id + "[UID] OR ");
    });

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
            Header: column.includes("hostReceptorProteins")
              ? transformReceptorColumn(column)
              : transformColumnName(column),
            accessor: column,
            Cell: (props) => {
              return <div></div>;
            },

            id: Math.random().toString(),
            Filter: ColumnFilter,
          });
        }

        setcolumns((columns) => [...columns, obj]);
      }
    },
    [headers, columns, setcolumns]
  );

  const [showDropdown, setShowDropdown] = useState(false);
  //const columns = useSelector((state) => state.tableData.headerGroup);

  const { data, error, loading } = useSelector((state) => state.tableData);

  const table = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <>
                <p>Select All </p>
                <CheckBox {...getToggleAllRowsSelectedProps()} />
              </>
            ),
            Cell: ({ row }) => (
              <>
                <CheckBox {...row.getToggleRowSelectedProps()} />
              </>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
    allColumns,
    gotoPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    state,
    nextPage,
    previousPage,
    setGlobalFilter,
  } = table;

  const { globalFilter, pageIndex } = state;

  useEffect(() => {
    allColumns?.map(
      (column) => column.Header === "taxid" && column.toggleHidden()
    );
  }, [allColumns]);

  const selectedRows =
    selectedFlatRows.length !== 0
      ? selectedFlatRows.map((row) => row.original)
      : "";

  return (
    <>
      <div style={{ height: "100%" }}>
        <div>
          <div class="row" style={{ marginBottom: "0.5%" }}>
            <div class="col-8" style={{ marginLeft: "1%" }}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                style={{ marginLeft: 0, backgroundColor: "#393E46" }}
                id="dropdownMenuButton"
                data-toggle="dropdown"
                onClick={() => {
                  setShowColumnVisibility(!showColumnVisibility);
                  setShowColumnVisibility(!showColumnVisibility);
                }}
              >
                Column Visibility
              </button>
              {showColumnVisibility && (
                <ColumnToggle
                  allColumns={allColumns.filter((col) => col.id != "selection")}
                  show={showColumnVisibility}
                />
              )}
            </div>

            <div class="col" style={{ marginLeft: "24%" }}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                style={{ backgroundColor: "#393E46"}}
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
              >
                Export
              </button>
              {showDropdown && (
                <Export
                  columns={allColumns}
                  selectedrows={selectedRows || data}
                  isColumnVisibility={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="m-3 mt-0">
        {/*
      <Search
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      ></Search>
    -
       */}

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
                        backgroundColor: "#00ADB5",
                        fontSize: "12px",
                        fontWeight: "normal",
                      }}
                    >
                      {column.originalId === "HOST RESEPTOR PROTEINS" ? (
                        <span>
                          HOST RECEPTOR PROTEINS
                          {referenceIDs.length > 54 && (
                            <>
                              <br />
                              <a
                                href={referenceIDs}
                                target="_blank"
                                style={{ color: "white" }}
                              >
                                REFERENCES
                              </a>
                              <RiArrowRightUpFill />
                            </>
                          )}
                        </span>
                      ) : (
                        column.render("Header")
                      )}

                      <br />
                      {column.canFilter ? column.render("Filter") : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{ fontSize: "10px" }}
                        >
                          <>
                            {cell.render("Cell")}

                            {
                              <span>
                                {cell.column.id !== "selection" && (
                                  <span>
                                    {cell.column.Header.includes("Accession") ||
                                    cell.column.Header.includes("Receptor") ? (
                                      <>{renderAccessionCell(cell.value)}</>
                                    ) : (
                                      <CellToggle cell={cell} />
                                    )}
                                  </span>
                                )}
                              </span>
                            }
                          </>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <TablePagination
              pageCount={pageCount}
              goToPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              page={pageIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VirusTable;
