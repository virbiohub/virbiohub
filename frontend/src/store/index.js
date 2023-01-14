import { configureStore } from "@reduxjs/toolkit";
import TableDataSlice from "./slices/TableDataSlice";
import PPISlice from "./slices/PPISlice";
import ViralInfectionPredicterSlice from "./slices/ViralInfectionPredicterSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    tableData: TableDataSlice.reducer,
    ppiPredicter: PPISlice.reducer,
    viralInfectionPredicter: ViralInfectionPredicterSlice.reducer,
  },
  middleware: customizedMiddleware,
  devTools: true,
});

export default store;
