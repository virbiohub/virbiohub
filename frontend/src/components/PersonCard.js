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
      className={props.title === "PhD" ? `` : `col-md-8`}
      style={{
        marginBottom: "10%",
      }}
    >
      <div className="card-header " style={{ backgroundColor: "#87ACA3" }}>
        <b
          style={{
            color: "white",
            marginLeft:
              props.e_posta === "barissuzek@mu.edu.tr" ? `40%` : "20%",
          }}
        >
          {toTitle(props.name)}
        </b>
      </div>

      <div className="card shadow-lg">
        <img
          style={{ width: "250px", height: "250px", marginTop: "20px" }}
          className="featurette-image img-fluid mx-auto  border-dark shadow-lg rounded "
          src={props.image}
          alt="member"
        />
        <div className="card-body">
          <p className="text-center">{props.role}</p>

          <hr />

          <p>
            <b>E-mail : </b>
            <span
              onClick={contactHandler}
              style={{ color: "#175873", cursor: "pointer" }}
            >
              {props.e_posta}
            </span>
            <br />
            {props.e_posta == "barissuzek@mu.edu.tr" ? (
              <>
                <span>
                  <b>Web :</b>
                </span>
                <a
                  href="http://akademik.mu.edu.tr/barissuzek"
                  target="_blank"
                  style={{
                    marginLeft: "8px",
                    textDecoration: "None",
                    color: "#175873",
                    marginLeft: "1%",
                  }}
                  rel="noreferrer"
                >
                  http://akademik.mu.edu.tr/barissuzek
                </a>
                <br />
              </>
            ) : null}
            <b>Phone :</b> {props.phone} <br />
          </p>

          <div className="float-right">
            <FaResearchgate
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={redirectToResearchGate}
            />
            <GrLinkedin
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={redirectToLinkedin}
            />
            <SiGooglescholar
              style={{ cursor: "pointer" }}
              onClick={redirectToGoogleScholar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
