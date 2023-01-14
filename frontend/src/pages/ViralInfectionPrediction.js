import React, { useState, useEffect } from "react";
import "./PPIPrediction.css";
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#EEEEEE",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#00ADB5" : "#EEEEEE",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "#00ADB5"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  const styles = {
    container: {
      marginBottom: !isSelected ? "40%" : "4%",
      marginTop: "5%",
    },
    rowStyle: {
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
      className="container justify-content-center align-items-center a"
      style={styles.container}
    >
      <div className="row featurette pt-5 p-3">
        <div className="text-center mb-4">
          <h1 className="featurette-heading mb-0" style={{ color: "#222831" }}>
            <em> Viral Infection Predictor</em>
          </h1>
        </div>
        <div
          className="row align-items-center justify-content-center"
          style={{
            marginLeft: "1%",
            width: "96%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Select
            styles={customStyles}
            options={virusFamilies}
            onChange={onSelect}
            placeholder="Viral Family"
            style={{ backgroundColor: "red" }}
          />
        </div>
        {isSelected && <ViralInfectionInput virusfamily={family} />}
      </div>
    </div>
  );
};

export default ViralInfectionPrediction;
