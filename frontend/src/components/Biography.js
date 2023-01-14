import React from "react";

const Biography = () => {
  const contactHandler = () => {
    window.location.href = `mailto:barissuzek@mu.edu.tr?subject=Suzek Lab Virus Group: Contact `;
  };
  return (
    <div
      style={{backgroundColor:"#87ACA3", height: "300px" ,borderRadius:"6px",borderWidth:"12px"}}
    >
      <div className="m-4" style={{paddingTop:"20px"}}>
        <h2 className="featurette-heading ">
          Ph.D. Barış Süzek <span className="text-muted">Biography</span>
        </h2>
        <p>
          Project manager
          <br />
          Barış Ethem Süzek, Ph.D.
        </p>

        <p className="lead">
          E-mail : barissuzek@mu.edu.tr <br />
          Phone : 0252 211 5583 <br />
          Web :
          <a
            href="http://akademik.mu.edu.tr/barissuzek"
            target="_blank"
            style={{ marginLeft: "8px" , textDecoration:"None",color:"#2B7C85" }}
            rel="noreferrer"
          >
            http://akademik.mu.edu.tr/barissuzek
          </a>
          <br />
        </p>
        <button className="btn "  style={{backgroundColor:"#2B7C85",borderColor:"#2B7C85"}}onClick={contactHandler}>
          Contact
        </button>
      </div>
    </div>
  );
};

export default Biography;