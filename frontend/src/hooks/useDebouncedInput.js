import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const useDebouncedInput = (event) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedInputHandler = useDebouncedCallback((event) => {
    setSearchTerm(event.target.value);
  }, 1000);

  return { debouncedInputHandler };
};

export default useDebouncedInput;
