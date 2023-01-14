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
      style={{ marginTop: "4%", marginBottom: "4%" }}
    >
      {Content.isLoading ? (
        <CustomBackdrop isLoading={Content.isLoading} />
      ) : (
        <>
          <h4>Viral Infection Predictor</h4>
          <hr />
          <div className="row featurette shadow-lg p-3 mt-4">
            <div className="col-md-7 order-md-2">
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
                  title="Launch Viral Infection Prediction"
                  to="viral-infection-predictor"
                  bg="#87aca3"
                  iconTitle1="Launch"
                  iconTitle2="Viral Infection Predictor"
                  style={{ width: "60%", height: "10%" }}
                ></LauncherCard>
              </div>
            </div>
            <div className="col-md-5 order-md-1">
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
