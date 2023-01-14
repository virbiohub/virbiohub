import React from "react";
import { GrAnnounce } from "react-icons/gr";
import { Badge } from "react-bootstrap";
const AnnouncementItem = (props) => {
  return (
    <div className="container-sm">
      <div style={{ display: "flex", alignItems: "center" }}>
        <GrAnnounce
          size={20}
          style={{
            marginBottom: "4px",
          }}
        />

        <p style={{ fontWeight: "bold", marginTop: "12px", marginLeft: "8px" }}>
          {props.title}
        </p>
      </div>

      <div>{props.content}</div>
      <div style={{ textAlign: "right", fontStyle: "italic" }}>
        {props.date}
      </div>
      <hr />
    </div>
  );
};

export default AnnouncementItem;
