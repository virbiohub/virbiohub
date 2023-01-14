import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import transformOptions from "../utils/helpers/transformViralInfectionPredicterOptions";
import { runPredicter } from "../store/slices/ViralInfectionPredicterSlice";

import Button from "react-bootstrap/Button";

const ViralInfectionInput = ({ virusfamily }) => {
  const dispatch = useDispatch();
  const [hosts, setHosts] = useState([]);
  const [host, setSelectedHost] = useState("");
  const [virus, setSelectedVirus] = useState("");
  const [viruses, setViruses] = useState([]);

  const hostOptions = useSelector(
    (state) => state.viralInfectionPredicter.hosts
  );
  const virusesOptions = useSelector(
    (state) => state.viralInfectionPredicter.viruses
  );

  const isOptionsLoading = useSelector(
    (state) => state.viralInfectionPredicter.isOptionsLoading
  );

  useEffect(() => {
    transformOptions(virusesOptions);
  }, []);
  const addHost = () => {
    if (hosts.includes(host)) {
      return;
    }
    setHosts([host, ...hosts]);
  };

  const addVirus = () => {
    if (viruses.includes(virus)) {
      return;
    }
    setViruses([virus, ...viruses]);
  };

  const getHosts = () => {
    let value = "";
    for (const i in hosts) {
      value += hosts[i] + ", ";
    }
    return value;
  };
  const getViruses = () => {
    let value = "";
    for (const i in viruses) {
      value += viruses[i] + ", ";
    }
    return value;
  };

  const onHostSelect = (host) => {
    setSelectedHost(host.value);
  };

  const onVirusSelect = (virus) => {
    setSelectedVirus(virus.value);
  };

  const onPredicterRunButtonPressed = async () => {
    await dispatch(runPredicter(virusfamily, hosts, viruses));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#EEEEEE",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#00ADB5" : "#EEEEEE",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "#00ADB5"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  return (
    <div
      className="row"
      style={{ marginTop: "20px" }}
    >
      <div className="col-sm">
      <div className="text-center">
        <label className="mb-2">
          <b>Host Entries</b>
        </label>
      </div>
        <div className="container">
          <div className="row">
            <div style={{ width: "480px" }}>
              <Select
                onChange={onHostSelect}
                placeholder="Host"
                options={isOptionsLoading ? [] : transformOptions(hostOptions)}
                isLoading={isOptionsLoading}
                styles={customStyles}
              />
            </div>
            <div className="col-sm-1" style={{ marginBottom: "3%" }}>
              <button onClick={addHost} className="btn btn-dark">
                Add
              </button>
            </div>
          </div>

          <form className="mr-5">
            <textarea
              id="host_name_textarea"
              rows="3"
              className="form-control "
              value={getHosts()}
              onChange={() => {}}
              style={{ width: "96.5%", color: "#2B7C85", background: "#EEEEEE" }}
            ></textarea>
          </form>
        </div>
      </div>
      <div className="col-sm">
        <div className="container">
          <div className="text-center">
              <label className="mb-2">
                <b>Virus Entries</b>
              </label>
          </div>
          <div className="row">
            <div style={{ width: "480px" }}>
              <Select
                styles={customStyles}
                onChange={onVirusSelect}
                options={
                  isOptionsLoading ? [] : transformOptions(virusesOptions)
                }
                placeholder="Virus"
                isLoading={isOptionsLoading}
              />
            </div>
            <div className="col-sm-1" style={{ marginBottom: "3%"}}>
              <button onClick={addVirus} className="btn btn-dark">
                Add
              </button>
            </div>
          </div>

          <form className="mr-5">
            <textarea
              id="virus_name_textarea"
              rows="3"
              className="form-control"
              value={getViruses()}
              style={{ width: "96.5%", color: "#2B7C85", background: "#EEEEEE"}}
              readOnly
            ></textarea>
          </form>
        </div>
      </div>

      <div className="row">
        <Button
          onClick={onPredicterRunButtonPressed}
          disabled={hosts.length === 0 || viruses.length === 0}
          style={{
            marginBottom: "2%",
            marginLeft: "40%",
            marginTop: "2%",
            width: "20%",
            backgroundColor: "#222831",
            borderColor: "#222831",
          }}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default ViralInfectionInput;
