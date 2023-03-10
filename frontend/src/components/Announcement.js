import React, { useEffect, useState } from "react";
import AnnouncementItem from "./AnnouncementItem";
import { Card } from "react-bootstrap";
import axios from "../config/@axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchAnnouncements() {
      const announcement = await axios.get(`announcements`);
      if (!announcement) {
        setIsError(true);
        return;
      }
      setAnnouncements(announcement.data);
    }
    fetchAnnouncements();
  }, []);

  return (
    <Card
      style={{
        marginTop: "4%",
        marginBottom: "4%",
      }}
    >
      <Card.Body>
        <Card.Title
          style={{
            textAlign: "center",
            backgroundColor: "#2B7C85",
            paddingTop: "0.5%",
            width: "100%",
            height: "50%",
            color: "white",
            fontWeight: "bold",
            paddingBottom: "0.5%",
          }}
        >
          Announcements
        </Card.Title>

        <div
          style={{
            width: "100%",
            overflowY: "scroll",
            height: "280px",
            flex: 1,
            flexGrow: 1,
          }}
        >
          {announcements.map((announcement, index) => {
            return (
              <AnnouncementItem
                key={index}
                title={announcement.title}
                content={announcement.content}
                date={announcement.date}
              />
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Announcement;
