import React, { useState, useRef } from "react";
import ColumnToggle from "./ColumnToggle";
import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const Export = (props) => {
  const [selectedAction, setSelectedAction] = useState("");
  const toggleClose = () => {
    setIsClicked(false);
  };
  const [isClicked, setIsClicked] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const csvRef = useRef();
  const tsvRef = useRef();
  const data = props.selectedrows;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const exportToXLSX = (exportData) => {
    const ws = XLSX.utils.json_to_sheet(exportData || []);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const data = new Blob(
      [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
      { type: fileType }
    );
    FileSaver.saveAs(data, "VirBioHub.xlsx");
  };

  const toggle = (selectedAction) => {
    setSelectedAction(selectedAction);

    if (selectedAction === "CSV") {
      exportToCSV();
    }
    if (selectedAction === "Excel") {
      exportToXLSX(data);
    }
    if (selectedAction === "TSV") {
      tsvRef?.current?.link.click();
    }
  };

  const exportToCSV = () => {
    csvRef?.current?.link.click();
  };

  return (
    <>
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          backgroundColor: "	#D3D3D3",
          display: isClicked ? "none" : null,
          width: "100px",
        }}
        onMouseLeave={() => setIsClicked(true)}
      >
        <ul style={{ padding: 0 }}>
          <li onClick={toggle.bind(null, "TSV")} className="dropdown-item">
            TSV
          </li>
          <li onClick={toggle.bind(null, "Excel")} className="dropdown-item">
            Excel
          </li>
          <li onClick={toggle.bind(null, "CSV")} className="dropdown-item">
            CSV
          </li>
        </ul>
      </div>

      <CSVLink
        data={data}
        ref={tsvRef}
        filename="VirBioHub.tsv"
        separator={"\t"}
      />

      <CSVLink
        data={data}
        value={selectedAction}
        filename={"VirBioHub.csv"}
        target="_blank"
        ref={csvRef}
      ></CSVLink>
    </>
  );
};

export default Export;
