import React from "react";
import HistoryViewer from "../components/HistoryViewer";
import { Padding } from "@mui/icons-material";

const HistoryPage = () => {
  return (
    <div style={{ margin: "25px", padding: "30px" }}>
      <h1 style={{color: "#F39325"}}>Historique de toutes les modifications</h1>
      <HistoryViewer />
    </div>
  );
};

export default HistoryPage;