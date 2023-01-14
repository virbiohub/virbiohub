import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import pubmed from "../assets/pubmed.png";

const ModelSelection = ({ tool, handleSelectedTools }) => {
  const [isModelSelected, setIsModelSelected] = useState(true);
  const [popoverState, setPopoverState] = useState(false);

  const popoverHandler = () => {
    setPopoverState(!popoverState);
  };

  const handleTooltip = (tool) => {
    setPopoverState(true);
  };

  const redirectToArticlePage = (url) => {
    window.open(url, "_blank");
  };

  const onSelectionChange = (cmd) => {
    setIsModelSelected(!isModelSelected);
    handleSelectedTools(cmd);
  };

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "25px",
        }}
        onMouseLeave={() => popoverHandler(false)}
      >
        <input
          type="checkbox"
          onChange={onSelectionChange.bind(null, tool?.cmd_arg)}
          checked={isModelSelected}
          style={{ height: 14, width: 14 }}
        />

        <button
          className="btn btn-link"
          id={tool?.name + "ref"}
          onMouseEnter={handleTooltip.bind(null, tool?.name)}
        >
          {tool?.name}
        </button>
        <div onMouseLeave={() => popoverHandler(false)}>
          <Popover
            flip
            target={tool?.name + "ref"}
            toggle={function noRefCheck() {}}
            isOpen={popoverState}
          >
            <PopoverHeader>{tool?.name}</PopoverHeader>
            <PopoverBody>
              {tool?.title}
              <br />
              {tool?.authors}
              <br />
              {tool?.journal}
              <br />
              <img
                style={{ width: "30%", height: "30%", cursor: "pointer" }}
                src={pubmed}
                onClick={redirectToArticlePage.bind(null, tool?.articleAddress)}
              ></img>
              <a
                style={{ cursor: "pointer" }}
                href={tool?.articleAddress}
                target="_blank"
              >
                {tool?.articleAddress}
              </a>
            </PopoverBody>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ModelSelection;
