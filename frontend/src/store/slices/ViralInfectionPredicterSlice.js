import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import axios from "../../config/@axios";

const initialState = {
  results: [],
  isError: false,
  isLoading: false,
  isResultExist: false,
  error: "",
  hosts: [],
  viruses: [],
  headers: [],
  isOptionsLoading: false,
};

const ViralInfectionPredicterSlice = createSlice({
  name: "ViralInfectionPredicter",
  initialState,
  reducers: {
    setError(state, action) {
      state.isError = true;
      state.error = action.payload;
    },
    setOptionsLoading(state, action) {
      state.isOptionsLoading = action.payload;
    },
    setIsResultExist(state, action) {
      state.isResultExist = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
    setHosts(state, action) {
      state.hosts = action.payload;
    },
    setViruses(state, action) {
      state.viruses = action.payload;
    },
  },
});

export const actions = ViralInfectionPredicterSlice.actions;

export default ViralInfectionPredicterSlice;

export const getOptions = (virusfamily) => {
  return async (dispatch) => {
    dispatch(actions.setOptionsLoading(true));
    try {
      const response = await axios({
        method: "GET",
        url: `viral-infection-predicter-options/`,
        params: {
          virusfamily,
        },
      });
      const data = await response.data;
      dispatch(actions.setHosts(data.hosts));
      dispatch(actions.setViruses(data.viruses));
      dispatch(actions.setOptionsLoading(false));
    } catch (err) {
      dispatch(actions.setError(err));
    }
  };
};

export const runPredicter = (virusfamily, hosts, viruses) => {
  return async (dispatch) => {
    dispatch(actions.setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        url: `viral-infection-predicter/`,
        params: {
          virusfamily,
          hosts: JSON.stringify(hosts),
          viruses: JSON.stringify(viruses),
        },
      });
      const data = await response.data;
      dispatch(actions.setResults(data.data));
      dispatch(actions.setHeaders(data.headers));
      dispatch(actions.setLoading(false));
      dispatch(actions.setIsResultExist(true));
    } catch (err) {
      dispatch(actions.setError(err));
    }
  };
};
