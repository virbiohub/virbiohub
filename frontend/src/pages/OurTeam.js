import React, { useState, useEffect } from "react";
import PersonCard from "../components/PersonCard";
import Biography from "../components/Biography";
//import members from "../data/members";
import axios from "../config/@axios";
import TeamMemberWrapper from "../components/TeamMemberWrapper";
import LoadingBar from "../components/LoadingBar";
import CustomBackdrop from "../components/CustomBackdrop";

export const OurTeam = () => {
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      let membersData;
      membersData = await axios.get(`members`);
      if (!membersData) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setMembers(membersData.data.data);
      setIsLoading(false);
    }
    setTimeout(() => fetchMembers(), 300);
  }, []);

  const lead = members.filter(
    (member) => member.role === "Associate Professor"
  );
  const phdStudents = members.filter(
    (member) => member.title === "PhD Student"
  );
  const mscStudents = members.filter(
    (member) => member.title === "MsC Student"
  );
  const bscStudents = members.filter(
    (member) => member.title === "BSc Student"
  );

  return (
    <div style={{ marginBottom: "20%" }}>
      {isLoading ? (
        <CustomBackdrop isLoading={isLoading} />
      ) : (
        <div style={{ marginTop: "120px" }}>
          <div
            className="container marketing "
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="row ">
              <div
                className="col-md-8"
                style={{ backgroundColor: "#87ACA3", marginLeft: "20%" }}
              >
                {lead.map((person) => (
                  <PersonCard
                    key={Math.random(36).toString()}
                    role={person.role}
                    title={person.title}
                    name={person.name + " " + person.surname}
                    e_posta={person.email}
                    image={person.photo}
                    web_accounts={{
                      linkedin: person.linkedin_address,
                      researchGate: person.researchgate_address,
                      googleScholar: person.googlescholar_address,
                    }}
                    phone={person.phone}
                  />
                ))}
              </div>
            </div>
          </div>

          {phdStudents.length > 0 && (
            <TeamMemberWrapper
              data={phdStudents}
              title={"PhD STUDENTS"}
            ></TeamMemberWrapper>
          )}
          {mscStudents.length > 0 && (
            <TeamMemberWrapper
              data={mscStudents}
              title={"MSc STUDENTS"}
            ></TeamMemberWrapper>
          )}
          {bscStudents.length > 0 && (
            <TeamMemberWrapper
              data={bscStudents}
              title={"BSc STUDENTS"}
            ></TeamMemberWrapper>
          )}
        </div>
      )}
    </div>
  );
};

export default OurTeam;
