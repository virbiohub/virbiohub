import React from "react";
import PersonCard from "./PersonCard";

const TeamMemberWrapper = (props) => {
  return (
    <div className="card ">
      <h3
        className=" d-flex justify-content-center"
        style={{ marginTop: "3%", marginBottom: "3%" }}
      >
        <b>{props.title}</b>
      </h3>

      <div className="row ">
        {props.data.map((person) => (
          <div
            className="col-md-4 d-flex justify-content-center"
            key={person.id}
          >
            <PersonCard
              role={person.role}
              name={person.name + " " + person.surname}
              title={person.title}
              e_posta={person.email}
              image={person.photo}
              web_accounts={{
                linkedin: person.linkedin_address,
                researchGate: person.researchgate_address,
                googleScholar: person.googlescholar_address,
              }}
              phone={person.phone}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberWrapper;
