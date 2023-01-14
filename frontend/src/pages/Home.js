import React, { useEffect, useState } from "react";
import "./HomeP.css";
import ToolWrapper from "../components/ToolWrapper";
import Intro from "../components/Intro";
import Announcements from "../components/Announcement";
import tools from "../data/tools";
import GoogleMap from "../components/GoogleMap";
import Address from "../components/Address";
import useContent from "../hooks/useContent";
import coronaImage from "../assets/background-image-modified.png";

export const Home = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const Content = useContent("home");
  useEffect(() => {
    setImage(Content.image);
    setContent(Content.content);
  }, [Content]);

  return (
    <>
      <div class="row" style={{ height: "100vh" }}>
        <div class="col coronaBackGround"></div>
        <div class="col">
          <div class="bioTitle">
            <h1 class="pb-4">Welcome to VirBioHub</h1>
            <h4>
              VirBioHub is developed by a group of bioinformaticians from
              different backgrounds at Muğla Sıtkı Koçman University.
            </h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-7 p-0">
            <div
              className=" justify-content-center"
              style={{ marginLeft: "10%",  minHeight: "100vh",  display: "flex", alignItems: "center" }}
            >
              <Intro image={image} content={content} />
            </div>
          </div>
        <div class="col-5 p-0 adenoBackGround"></div>
      </div>

      <div className="container" style={{ marginTop: 30 }}>
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
      <div className="container card " style={{ border: "none" }}>
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
    </>
  );
};

export default Home;
