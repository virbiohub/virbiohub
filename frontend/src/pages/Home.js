import React, { useEffect, useState } from "react";
import ToolWrapper from "../components/ToolWrapper";
import Intro from "../components/Intro";
import Announcements from "../components/Announcement";
import tools from "../data/tools";
import GoogleMap from "../components/GoogleMap";
import Address from "../components/Address";
import useContent from "../hooks/useContent";

export const Home = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const Content = useContent("home");
  useEffect(() => {
    setImage(Content.image);
    setContent(Content.content);
  }, [Content]);

  return (
    <div style={{ marginTop: 90 }}>
      <div className="container ">
        <div className=" justify-content-center " style={{ marginLeft: "7%" }}>
          <Intro image={image} content={content} />
        </div>

        <div className="row card-body">
          <div className="d-flex justify-content-center">
            <div className="row">
              {tools.map((item) => (
                <ToolWrapper
                  key={item.id}
                  title={item.title}
                  path={item.path}
                  backgroundColor={item.backgroundColor}
                  type={item.type}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container card ">
        <Announcements />
      </div>
      <div className="container">
        <div className="row" style={{ marginTop: "2%", marginBottom: "4%" }}>
          <div className="col-sm">
            <Address />
          </div>
          <div className="col-sm">
            <GoogleMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
