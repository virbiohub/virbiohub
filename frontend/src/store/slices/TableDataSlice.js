import { createSlice } from "@reduxjs/toolkit";
import axios from "../../config/@axios";
import ColumnFilter from "../../components/ColumnFilter";

const initialState = {
  data: [],
  headers: [],
  headerGroup: [],
  error: false,
  loading: false,
  columns: [],
};
const TableDataSlice = createSlice({
  name: "TableDataSlice",
  initialState,
  reducers: {
    getVirusData(state) {
      state.loading = true;
    },
    getDataSuccess(state, action) {
      state.data = action.payload.data;
      state.loading = false;
      state.headers = action.payload.headers;
      state.error = false;
    },
    getDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    /*     getHeaderGroups(state) {
      state.headerGroup = [];
      const headers = state.headers;

      for (const key in headers) {
        const obj = {
          Header:
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/_/g, " ").toUpperCase(),
          columns: [],
        };

        for (const column of headers[key]) {
          obj.columns.push({
            Header: columnName(column),
            accessor: column,
            id: Math.random().toString(),
            Filter: ColumnFilter,
          });
        }

        state.headerGroup.push(obj);
      }
    }, */

    getColumns(state) {
      const columnKey = state.data[0];
      if (columnKey) {
        const column =
          columnKey &&
          Object.keys(columnKey).map((key) => {
            return {
              Header: key.replace("_", "/"),
              accessor: key,
              Filter: ColumnFilter,
            };
          });
        state.columns = column;
      } else {
        return [];
      }
    },
  },
});

export const TableDataActions = TableDataSlice.actions;

export default TableDataSlice;

export const fetchVirusData = (virusFamily) => {
  return async (dispatch) => {
    dispatch(TableDataActions.getVirusData());
    try {
      const response = await axios({
        method: "GET",
        url: `viruses-hosts`,
        params: { virusFamily },
      });
      const data = await response.data;
      dispatch(
        TableDataActions.getDataSuccess({
          data: data.data,
          headers: data.headers,
        })
      );
      //dispatch(TableDataActions.getHeaderGroups());
      dispatch(TableDataActions.getColumns());
    } catch (err) {
      dispatch(TableDataActions.getDataFailure(err));
    }
  };
};
