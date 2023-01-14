import React, { useEffect, useState } from "react";
import LauncherCard from "../components/LauncherCard";
import useContent from "../hooks/useContent";
import CustomBackdrop from "../components/CustomBackdrop";

const VirusTableIntro = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const Content = useContent("catalog");
  useEffect(() => {
    setImage(Content.image);
    setContent(Content.content);
  }, [Content]);
  return (
    <div style={{ marginTop: "4%", marginBottom: "7%" }}>
      {Content.isLoading ? (
        <CustomBackdrop isLoading={Content.isLoading} />
      ) : (
        <>
          <div className="container marketing" style={{ marginTop: "2%" }}>
            <h4 className=" featurette-heading">
              Catalog of Viruses and Hosts
            </h4>
            <hr />

            <div className="row featurette shadow-lg p-3 mt-4">
              <div className="col-md-7 order-md-2">
                <p
                  style={{
                    textAlign: "justify",
                    marginTop: "5%",
                    whiteSpace: "pre-line",
                    verticalAlign: "bottom",
                  }}
                >
                  {content}
                </p>
                <div className="row featurette p-3 mt-4 justify-content-center">
                  <LauncherCard
                    iconTitle2="Visit Catalog"
                    bg="#87aca3"
                    to="viruses-and-hosts/adenovirus"
                    style={{ width: "60%", height: "10%" }}
                  />
                </div>
              </div>
              <div className="col-md-5 order-md-1">
                <br />

                <figure>
                  <img className="ml-4" height="80%" width="80%" src={image} />
                  <figcaption
                    style={{
                      display: "flex",
                      marginLeft: "4%",
                      fontSize: "10px",
                    }}
                  >
                    {Content?.figureCapture}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VirusTableIntro;
