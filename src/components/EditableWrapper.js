import React from "react";
import { Box } from "@mui/material";
const EditableWrapper = ({ children, onClick }) => {
    return (
      <Box onClick={onClick} sx={{ cursor: "pointer" }}>
        {children}
      </Box>
    );
  };
  
  export default EditableWrapper;