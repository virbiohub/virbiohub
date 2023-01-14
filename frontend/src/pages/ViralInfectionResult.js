import React from "react";
import PredicterResultTable from "../components/PredicterResultTable";
import { useSelector } from "react-redux";

const ViralInfectionResult = () => {
  const data = useSelector((state) => state.viralInfectionPredicter.results);
  const headers = useSelector((state) => state.viralInfectionPredicter.headers);

  return (
    <div>
      <PredicterResultTable data={data} headers={headers} />
    </div>
  );
};

export default ViralInfectionResult;
