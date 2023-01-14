import { createSlice, current } from "@reduxjs/toolkit";
import axios from "../../config/@axios";
const initialState = {
  isLoading: false,
  isRunning: false,
  isResultExist: false,
  results: [],
  isError: false,
  Error: "",
  tools: [],
};

const PPISlice = createSlice({
  name: "PPISlice",
  initialState,
  reducers: {
    setError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.Error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setIsResultExist(state, action) {
      state.isResultExist = action.payload;
    },
    clearSelectedTools: (state, action) => {
      state.tools = [];
    },
    setSelectedTools: (state, action) => {
      state.tools = action.payload;
    },
  },
});
export const PPIactions = PPISlice.actions;

export default PPISlice;

export const receiveResults = (hostSequenceFile, virusSequenceFile, tools) => {
  return async (dispatch) => {
    dispatch(PPIactions.setSelectedTools([...tools]));
    const formData = new FormData();
    const uuid = localStorage.getItem("uuid");
    formData.append(`hostSequenceFile`, hostSequenceFile);
    formData.append(`virusSequenceFile`, virusSequenceFile);
    formData.append("tools", tools);
    dispatch(PPIactions.setIsLoading(true));
    formData.append(`uuid`, uuid);

    const response = await axios.post("ppi-predicter/", formData);

    if (response.status !== 200) {
      dispatch(PPIactions.setError(true));
      return;
    }
    const result = await response.data.data;

    dispatch(PPIactions.setResults([...result]));

    dispatch(PPIactions.setIsLoading(false));
    dispatch(PPIactions.setIsResultExist(true));
  };
};
