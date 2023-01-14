import React, { useState, useEffect } from "react";
import Select from "react-select";
import classes from "./VirusesHosts.module.css";
import VirusTable from "../components/VirusTable";
import { useHistory, useParams } from "react-router-dom";
import { fetchVirusData } from "../store/slices/TableDataSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../components/LoadingBar";
import useVirusFamilyOptions from "../hooks/useVirusFamilyOptions";
import { MdError } from "react-icons/md";

const VirusesHost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedVirusFamily, setSelectedVirusFamily] = useState("");
  const [virusFamilyOptions1, setVirusFamilyOptions] = useState([]);
  const { virusfamily } = useParams();

  const { virusFamilyOptions } = useVirusFamilyOptions();

  useEffect(() => {
    setVirusFamilyOptions(virusFamilyOptions);
  }, [virusFamilyOptions]);
  // const getVirusFamilyOptions = (families) => {
  //   const options = [];
  //   for (const family of families) {
  //     const obj = {};
  //     obj.value = family.toLowerCase();
  //     obj.label = family[0].toUpperCase() + family.slice(1);
  //     options.push(obj);
  //   }

  //   return options;
  // };

  // useEffect(async () => {
  //   const virusFamilies = await axios({
  //     method: "GET",
  //     url: `http://localhost:8000/api/viruses`,
  //   });

  // }, []);

  const onSelectedVirusFamily = (selectedVirusFamily) => {
    setSelectedVirusFamily(selectedVirusFamily.value);
    history.push(`/viruses-and-hosts/${selectedVirusFamily.value}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVirusData(virusfamily));
    };
    fetchData();
  }, [virusfamily]);

  const renderErrorMessage = () => {
    return (
      <div className=" container justify-content-center ">
        <div className="col align-items-center justify-content-center">
          <MdError size={60} color="red" />
        </div>

        <div className="col align-items-center">
          <p>Sorry, something went wrong!</p>
        </div>
      </div>
    );
  };

  const { data, error, loading } = useSelector((state) => state.tableData);
  return (
    <div style={{ marginTop: "90px" }}>
      <div className={classes.selectContainer}>
        <h6>Please Select Viral Family</h6>
        <Select
          value={selectedVirusFamily.value}
          onChange={onSelectedVirusFamily}
          options={virusFamilyOptions}
          placeholder={selectedVirusFamily.value || "Adenovirus"}
          className={classes.select}
        />
      </div>
      <div>
        {!error && !loading && <VirusTable />}
        {error && renderErrorMessage()}
        {loading && <LoadingBar />}
      </div>
    </div>
  );
};

export default VirusesHost;
