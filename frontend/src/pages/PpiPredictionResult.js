import React, { useCallback,useEffect, useState } from "react";
import PPIResult from "../components/PPIResult";
import { useSelector} from "react-redux";
import {useParams} from "react-router-dom"
const PpiPredictionResult = () => {
  
  const[tools,setTools] = useState();



  const PPIPredictionResultTableColumns = useCallback(
    [
      {
        Header: "Pairs",
        columns: [
          { Header: "Host Sequence", accessor: "host" },
          { Header: "Virus Sequence", accessor: "virus" },
        ],
      },
      {
        Header: "Hopitor",
        columns: [
          { Header: "Accuracy", accessor: "accuracy_hopitor" },
          { Header: "Result", accessor: "result_hopitor" },
        ],
      },
      {
        Header: "Hvppi",
        columns: [
          { Header: "Accuracy", accessor: "accuracy_hvppi" },
          { Header: "Result", accessor: "result_hvppi" },
        ],
      },
      {
        Header: "Denovo",
        columns: [
          { Header: "Accuracy", accessor: "accuracy_denovo" },
          { Header: "Result", accessor: "result_denovo" },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <PPIResult
        results={useSelector((state) => state.ppiPredicter.results)}
        columns={PPIPredictionResultTableColumns}
      ></PPIResult>
    </div>
  );
};

export default PpiPredictionResult;
