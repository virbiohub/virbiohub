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
          <div className="row featurette">
            <div className="col order-md-2" style={{ marginTop: "2%" }}>
              <div className="row featurette">
                <LauncherCard
                  iconTitle2="Virus-Host PPI Predictor"
                  to="/ppi-predictor"
                  style={{ width: "65%", height: "10%" }}
                />
              </div>
              <p
                style={{
                  textAlign: "justify",
                  whiteSpace: "pre-line",
                  verticalAlign: "bottom",
                }}
              >
                {content}
              </p>
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
        </>
      )}
    </div>
  );
};

export default PPIPredictionIntro;
