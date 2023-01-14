import { useEffect, useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const [isFastaFormat, setIsFastaFormat] = useState(true);

  useEffect(() => {
    checkFastaFormat();
  }, [value]);

  const checkFastaFormat = () => {
    if (value.includes(">")) {
      var fastas = value.split(">");
      fastas.forEach((fasta) => {
        if (fasta.split("\n")[1] != null) {
          fasta = fasta.split("\n")[1].trim();
          if (fasta.match(/^[ACDEFGHIKLMNPQRSTVWY]*$/) == null) {
            return setIsFastaFormat(false);
          } else {
            return setIsFastaFormat(true);
          }
        }
        return setIsFastaFormat(false);
      });
    } else if (value.length == 0) {
      return setIsFastaFormat(true);
    } else {
      return setIsFastaFormat(false);
    }
  };

  const onValueChange = (event) => {
    setValue(event.target.value);
  }


  return {
    value,
    onValueChange,
    isFastaFormat,
  };
};

export default useInput;

