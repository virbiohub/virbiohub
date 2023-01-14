import React, { useState, useEffect } from "react";
import useVirusFamilyOptions from "../hooks/useVirusFamilyOptions";
import Select from "react-select";
import ViralInfectionInput from "../components/ViralInfectionInput";
import { getOptions } from "../store/slices/ViralInfectionPredicterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomBackdrop from "../components/CustomBackdrop";
import { actions } from "../store/slices/ViralInfectionPredicterSlice";

const ViralInfectionPrediction = () => {
  const dispatch = useDispatch();
  const [family, setSelectedFamily] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [virusFamilies, setVirusFamiliesOptions] = useState([]);
  const { virusFamilyOptions } = useVirusFamilyOptions();
  const history = useHistory();
  useEffect(async () => {
    setVirusFamiliesOptions(virusFamilyOptions);
    await dispatch(getOptions(family));
  }, [virusFamilyOptions, family]);

  const isResultExist = useSelector(
    (state) => state.viralInfectionPredicter.isResultExist
  );
  const isLoading = useSelector(
    (state) => state.viralInfectionPredicter.isLoading
  );

  const onSelect = (family) => {
    setSelectedFamily(family.value);
    setSelected(true);
  };
  const redirectToResults = () => {
    history.push("/viral-infection-predictor-result");
  };

  const styles = {
    container: {
      marginBottom: !isSelected ? "40%" : "4%",
      marginTop: "4%",
    },
    rowStyle: {
      backgroundColor: "#b9b7bd",
      marginBottom: !isSelected ? 0 : "40%",
      height: !isSelected ? "150px" : "200px",
    },
  };

  useEffect(() => {
    {
      isResultExist && redirectToResults();
    }
  }, [isResultExist]);
  return (
    <div
      className="container justify-content-center  align-items-center"
      style={styles.container}
    >
      <div className="row featurette  p-1 m-2">
        <div style={styles.rowStyle}>
          <div className="m-4 ">
            <div className="text-center">
              <h4
                className="featurette-heading  text-white "
                style={{ marginBottom: "4%" }}
              >
                <em> Viral Infection Predictor</em>
              </h4>
            </div>
          </div>
          <div
            className="row  align-items-center justify-content-center"
            style={{
              marginLeft: "1.5%",
              width: "96%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Select
              options={virusFamilies}
              onChange={onSelect}
              placeholder="Viral Family"
              style={{ backgroundColor: "red" }}
            />
          </div>

          {isSelected && <ViralInfectionInput virusfamily={family} />}
          {isLoading && <CustomBackdrop isLoading={isLoading} />}
        </div>
      </div>
    </div>
  );
};

export default ViralInfectionPrediction;
