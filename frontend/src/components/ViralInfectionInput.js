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

  return (
    <div
      className="row"
      style={{ backgroundColor: "#b9b7bd", marginTop: "20px" }}
    >
      <div className="col-sm">
        <div className="container">
          <div className="row">
            <div style={{ width: "400px" }}>
              <Select
                onChange={onHostSelect}
                placeholder="Host"
                options={isOptionsLoading ? [] : transformOptions(hostOptions)}
                isLoading={isOptionsLoading}
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
              className="form-control  bg-light "
              value={getHosts()}
              onChange={() => {}}
              style={{ width: "96.5%", color: "#2B7C85" }}
            ></textarea>
            <div className="col-sm-3 text-white">Host Entries</div>
          </form>
        </div>
      </div>
      <div className="col-sm">
        <div className="container">
          <div className="row">
            <div style={{ width: "400px" }}>
              <Select
                onChange={onVirusSelect}
                options={
                  isOptionsLoading ? [] : transformOptions(virusesOptions)
                }
                placeholder="Virus"
                isLoading={isOptionsLoading}
              />
            </div>
            <div className="col-sm-1" style={{ marginBottom: "3%" }}>
              <button onClick={addVirus} className="btn btn-dark">
                Add
              </button>
            </div>
          </div>

          <form className="mr-5">
            <textarea
              id="virus_name_textarea"
              rows="3"
              className="form-control bg-light "
              value={getViruses()}
              style={{ width: "96.5%", color: "#2B7C85" }}
              readOnly
            ></textarea>
            <div className="col-sm-3 text-white">Virus Entries</div>
          </form>
        </div>
      </div>
      <br />

      <div className="row">
        <Button
          onClick={onPredicterRunButtonPressed}
          disabled={hosts.length === 0 || viruses.length === 0}
          style={{
            marginBottom: "10%",
            marginLeft: "40%",
            marginTop: "10%",
            width: "20%",
            backgroundColor: "#2B7C85",
            borderColor: "#2B7C85",
          }}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default ViralInfectionInput;
