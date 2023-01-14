import React from "react";

function Footer() {
  return (
    <footer
      className="shadow-lg mt-auto "
      style={{
        marginBottom: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        flexShrink: 0,
      }}
    >
      <div className="row">
        <div className="text-center">
          <span> Copyright ©️ 2022 </span>
          <a
            className="text-dark"
            style={{ cursor: "pointer", color: "#0645AD" }}
            onClick={() => {
              window.open("https://suzek-lab.org/", "_blank");
            }}
          >
            SuzekLab
          </a>
          <p className="text-dark ">
            VirBioHub is supported by The Scientific and Technological Research
            Council of Turkey (Grant number: 119E664) and Muğla Sıtkı Koçman
            University.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
