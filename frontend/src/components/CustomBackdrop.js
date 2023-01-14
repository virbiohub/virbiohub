import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const CustomBackdrop = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <div>
        <CircularProgress color="inherit" />
        <p>Please wait...</p>
      </div>
    </Backdrop>
  );
};

export default CustomBackdrop;
