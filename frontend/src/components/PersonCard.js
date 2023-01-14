import { GrLinkedin } from "react-icons/gr";
import { SiGooglescholar } from "react-icons/si";
import { FaResearchgate } from "react-icons/fa";
const PersonCard = (props) => {
  const toTitle = (word) => {
    const name = word.split(" ");
    let titleCase = "";
    name.forEach((i) => {
      let temp = i.charAt(0).toUpperCase() + i.slice(1) + " ";
      titleCase += temp;
    });
    return titleCase;
  };
  const contactHandler = () => {
    window.location.href = `mailto:${props.e_posta}?subject=Suzek Lab Virus Group: Contact `;
  };
  const redirectToLinkedin = () => {
    const url =
      props.web_accounts?.linkedin == "-"
        ? "https://www.linkedin.com/"
        : props.web_accounts?.linkedin;
    window.open(url, "_blank");
  };
  const redirectToResearchGate = () => {
    const url =
      props.web_accounts?.researchGate == "-"
        ? "https://www.researchgate.net/"
        : props.web_accounts?.researchGate;
    window.open(url, "_blank");
  };
  const redirectToGoogleScholar = () => {
    const url =
      props.web_accounts?.googleScholar == "-"
        ? "https://scholar.google.com/"
        : props.web_accounts?.googleScholar;

    window.open(url, "_blank");
  };
  return (
    <div
      className={props.title === "PhD" ? `` : `col-md-8 text-center`}
      style={{
        marginBottom: "10%",
      }}
    >
      <div
        className="card-header card-body small text-muted text-center"
        style={{ backgroundColor: "#222831"}}
      >
        <b
          style={{
            color: "white",
          }}
        >
          {toTitle(props.name)}
        </b>
      </div>

      <div className="card shadow-lg" style={{ backgroundColor: "#EEEEEE"}}>
        <img
          style={{ width: "250px", height: "250px", marginTop: "20px" }}
          className="img-fluid img-thumbnail shadow-sm mx-auto"
          src={props.image}
          alt="member"
        />
        <div className="card-body small text-muted">
          <p  style={{ color: "#00ADB5" }}className="text-center text-uppercase mb-1">{props.role}</p>

          <div className="text-center float-right mb-1">
            <FaResearchgate
              style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={redirectToResearchGate}
            />
            <GrLinkedin
              style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={redirectToLinkedin}
            />
            <SiGooglescholar
              style={{ cursor: "pointer" }}
              onClick={redirectToGoogleScholar}
            />
          </div>

          <p>
            <p style={{ color: "#00ADB5" }}>E-mail :
            <span
              onClick={contactHandler}
              style={{ color: "#222831", cursor: "pointer" }}
            > {props.e_posta} </span>
            </p>
            {props.e_posta == "barissuzek@mu.edu.tr" ? (
              <>
                  <p style={{ color: "#00ADB5" }}>Web :
                <a
                  href="http://akademik.mu.edu.tr/barissuzek"
                  target="_blank"
                  style={{
                    marginLeft: "8px",
                    textDecoration: "None",
                    color: "#222831",
                    marginLeft: "1%",
                  }}
                  rel="noreferrer"
                >
                  http://akademik.mu.edu.tr/barissuzek
                </a>
                </p>
              </>
            ) : null}
            <p style={{ color: "#00ADB5" }}>Phone :<span style={{ color: "#222831" }}> {props.phone}</span></p> 
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
