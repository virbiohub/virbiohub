import React, { useRef, useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SequenceInput from "../components/SequenceInput";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { receiveResults } from "../store/slices/PPISlice";
import CustomBackdrop from "../components/CustomBackdrop";
import { PPIactions } from "../store/slices/PPISlice";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import Button from "react-bootstrap/Button";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ModelSelection from "../components/ModelSelection";
import axios from "../config/@axios";

import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
const PPIPrediction = () => {
  const dispatch = useDispatch();

  const isResultExist = useSelector(
    (state) => state.ppiPredicter.isResultExist
  );
  const [isFileSelected, setIsFileSelected] = useState(false);
  const history = useHistory();
  const results = useSelector((state) => state.ppiPredicter.results);
  const selectedTools = useSelector((state) => state.ppiPredicter.tools);
  const [tools, setTools] = useState([]);
  //const [selectedTools,setSelectedTools] = useState([])
  const isLoading = useSelector((state) => state.ppiPredicter.isLoading);
  const hostFileRef = useRef(null);
  const virusFileRef = useRef(null);
  const hostSequence = useInput();
  const reseptorSequence = useInput();
  const [hostProteinSequenceFile, setHostProteinSequenceFile] = useState("");
  const [reseptorProteinSequence, setReseptorProteinSequenceFile] =
    useState("");
  const [isPredictionAllowed, setIsPredictionAllowed] = useState(true);
  const [showToolsInfo, setShowToolsInfo] = useState(false);

  const [selectedTol, setSelectedTols] = useState([]);
  const handleSelectedTools = (tool) => {
    //let indx = selectedTools.indexOf(tool.cmd_arg)
    //indx == -1 ?  setSelectedTools([...selectedTools,tool.cmd_arg]) :setSelectedTools([...selectedTools.filter(t => t===tool.cmd_arg)])
    //dispatch(PPIactions.setSelectedTools(tool));
    const isSelected = selectedTol.findIndex((item) => item == tool);

    if (isSelected > -1) {
      setSelectedTols([...selectedTol.filter((p) => p != tool)]);
    } else {
      setSelectedTols((selectedTol) => [...selectedTol, tool]);
    }
  };

  const predictorHandler = () => {
    if (selectedTol.length > 0) {
      setIsPredictionAllowed(true);
    } else {
      setIsPredictionAllowed(false);
      return;
    }

    const tool_cmd = [];
    selectedTol.forEach((t) => tool_cmd.push(t));

    dispatch(
      receiveResults(
        hostSequence?.value?.length > 0
          ? hostSequence?.value
          : hostProteinSequenceFile,
        reseptorSequence?.value?.length > 0
          ? reseptorSequence?.value
          : reseptorProteinSequence,
        selectedTol
      )
    );
  };

  useEffect(() => {
    function getTools() {
      axios
        .get("/models")
        .then((res) => {
          setTools(res.data.data);
          //res.data.data?.map((tool) => handleSelectedTools(tool?.cmd_arg));
          res.data.data?.map((tool) => handleSelectedTools(tool?.cmd_arg));
        })
        .catch((err) => {});
    }
    getTools();
  }, []);

  const onHostFileUpload = () => {
    setHostProteinSequenceFile(hostFileRef.current.files[0]);
    setIsFileSelected(true);
  };
  const onVirusFileUpload = () => {
    setReseptorProteinSequenceFile(virusFileRef.current.files[0]);
  };

  const redirectToResults = () => {
    history.push("/ppi-predictor-result");
  };

  useEffect(() => {
    {
      isResultExist && redirectToResults();
    }
  }, [isResultExist]);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "3%", marginBottom: "8%" }}
      >
        <div className="text-center  text-dark p-3">
          <h4 className="featurette-heading ">
            <em> Virus-Host PPI Predictor</em>
          </h4>
          <hr />
        </div>
        <div className="row">
          <div
            className="col-sm-12  text-center"
            style={{ backgroundColor: "#b9b7bd" }}
          >
            <div className="row  text-center centered">
              <div className="col-sm" style={{ backgroundColor: "#b9b7bd" }}>
                <div className="col-sm-12  text-center">
                  <SequenceInput
                    title="Host"
                    fileRef={hostFileRef}
                    value={hostSequence.value}
                    onChange={hostSequence.onValueChange}
                    onFileChange={onHostFileUpload}
                    isFastaFormat={hostSequence.isFastaFormat}
                    isFileSelected={isFileSelected}
                  />

                  <p>
                    {hostFileRef.current?.files[0]?.name != null &&
                      "Selected File: "}
                    {hostFileRef.current?.files[0]?.name}
                  </p>
                </div>
              </div>
              <div className="col-sm">
                <div className="col-sm-12  text-center">
                  <SequenceInput
                    title="Virus"
                    fileRef={virusFileRef}
                    value={reseptorSequence.value}
                    onChange={reseptorSequence.onValueChange}
                    onFileChange={onVirusFileUpload}
                    isFastaFormat={reseptorSequence.isFastaFormat}
                  />

                  <p>
                    {virusFileRef.current?.files[0]?.name != null &&
                      "Selected File: "}
                    {virusFileRef.current?.files[0]?.name}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <hr />
              <div>
                <span style={{ fontSize: "18px" }}>
                  <b>TOOLS</b>
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    marginLeft: "6px",
                  }}
                  onMouseEnter={() => setShowToolsInfo(true)}
                  onMouseLeave={() => setShowToolsInfo(false)}
                  id={"toolInforef"}
                >
                  ?
                </span>
                <Popover
                  flip
                  target={"toolInforef"}
                  toggle={function noRefCheck() {}}
                  isOpen={showToolsInfo}
                >
                  <PopoverHeader>{}</PopoverHeader>
                  <PopoverBody>
                    <p>Plese select at least one tool to run predictor.</p>
                  </PopoverBody>
                </Popover>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {tools.length > 0 &&
                  tools?.map((tool) => (
                    <ModelSelection
                      tool={tool}
                      handleSelectedTools={handleSelectedTools}
                    />
                  ))}
              </div>

              <hr />
            </div>

            <Button
              className="btn btn-success"
              disabled={
                !(
                  hostSequence?.value.length > 0 ||
                  hostProteinSequenceFile != ""
                ) ||
                !(
                  reseptorSequence?.value.length > 0 ||
                  reseptorProteinSequence != ""
                )
              }
              style={{
                marginTop: "4%",
                marginBottom: "2%",
                backgroundColor: "#2B7C85",
                borderColor: "#2B7C85",
                width: "8%",
              }}
              onClick={predictorHandler}
            >
              Run
            </Button>
          </div>
        </div>
      </div>

      {isLoading && <CustomBackdrop isLoading={isLoading} />}
      {!isPredictionAllowed && (
        <Modal isOpen={!isPredictionAllowed} style={{ marginTop: "20%" }}>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>
            <Col>
              <Row>Please select at least one tool.</Row>
            </Col>
            <Button
              style={{ marginLeft: "90%", backgroundColor: "#385256" }}
              onClick={() => {
                setIsPredictionAllowed(true);
              }}
            >
              OK
            </Button>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default PPIPrediction;
