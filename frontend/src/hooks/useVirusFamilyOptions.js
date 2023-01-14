import { FormControlUnstyledContext } from "@mui/base";
import { useState, useEffect } from "react";
import axios from "../config/@axios";

const useVirusFamilyOptions = () => {
  const [virusFamilyOptions, setVirusFamilyOptions] = useState([]);
  const [isError, setIsError] = useState(false);
  const getVirusFamilyOptions = (families) => {
    const options = [];
    for (const family of families) {
      const obj = {};
      obj.value = family.toLowerCase();
      obj.label = family[0].toUpperCase() + family.slice(1);
      options.push(obj);
    }
    return options;
  };
  useEffect(() => {
    async function fetchVirusFamilies() {
      try {
        const virusFamilies = await axios({
          method: "GET",
          url: `viruses`,
        });

        const data = await virusFamilies.data.virusFamilies;
        setVirusFamilyOptions(getVirusFamilyOptions(data));
      } catch (err) {
        setIsError(true);
      }
    }
    fetchVirusFamilies();
  }, []);

  return { virusFamilyOptions, isError };
};

export default useVirusFamilyOptions;
