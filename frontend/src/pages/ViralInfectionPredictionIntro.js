import React, { useEffect, useState } from "react";
import LauncherCard from "../components/LauncherCard";
import { actions } from "../store/slices/ViralInfectionPredicterSlice";
import { useDispatch } from "react-redux";
import CustomBackdrop from "../components/CustomBackdrop";

import useContent from "../hooks/useContent";
const ViralInfectionPredictionIntro = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const Content = useContent("viralIntro");
  useEffect(() => {
    setImage(Content.image);
    setContent(Content.content);
  }, [Content]);
  return (
    <div
      className="container marketing"
      style={{ marginTop: "6%", height: "100%", marginBottom: "7%" }}
    >
      {Content.isLoading ? (
        <CustomBackdrop isLoading={Content.isLoading} />
      ) : (
        <>
          <div className="row featurette">
            <div className="col-md-7 order-md-2" style={{ marginTop: "2%" }}>
              <div className="row featurette">
                <LauncherCard
                  iconTitle2="Viral Infection Predictor"
                  to="viral-infection-predictor"
                  style={{ width: "65%", height: "10%" }}
                ></LauncherCard>
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
              <br/>
              <figure>
                <img className="ml-4" height="80%" width="80%" src={image} />
                <figcaption
                  style={{
                    display: "flex",
                    marginLeft: "5%",
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

export default ViralInfectionPredictionIntro;