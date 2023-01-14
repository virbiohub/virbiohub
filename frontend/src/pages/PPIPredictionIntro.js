import React, { useEffect, useState } from "react";
import LauncherCard from "../components/LauncherCard";
import useContent from "../hooks/useContent";
import CustomBackdrop from "../components/CustomBackdrop";

const PPIPredictionIntro = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const Content = useContent("ppi");
  useEffect(() => {
    setImage(Content.image);
    setContent(Content.content);
  }, [Content]);
  return (
    <div
      className="container marketing "
      style={{ marginTop: "6%", height: "100%", marginBottom: "2%" }}
    >
      {Content.isLoading ? (
        <CustomBackdrop isLoading={Content.isLoading} />
      ) : (
        <>
          <h4 className=" featurette-heading">
            Protein-Protein Interaction Predictor
          </h4>
          <hr />
          <div className="row featurette shadow-lg p-3 mt-4 justify-content-center">
            <div className="col order-md-2" style={{ marginTop: "2%" }}>
              <p
                style={{
                  textAlign: "justify",
                  whiteSpace: "pre-line",
                  verticalAlign: "bottom",
                }}
              >
                {content}
              </p>

              <div className="row featurette p-3 mt-4 justify-content-center">
                <LauncherCard
                  iconTitle1="Launch"
                  iconTitle2="Virus-Host PPI Predictor"
                  bg="#87aca3"
                  to="/ppi-predictor"
                  hoverColor="#9dc209"
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
                    marginLeft: "10%",

                    fontSize: "10px",
                  }}
                >
                  {Content?.figureCapture}
                </figcaption>
              </figure>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PPIPredictionIntro;
