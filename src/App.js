// import { Box } from "@mui/material";
// import AppRoutes from "./routes/AppRoutes";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// function App() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     return (
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <AppRoutes toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
//         </Box>
//     );
// }

// export default App;


import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppRoutes toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
    </Box>
  );
}

// function App() {
//   return (
//     <Box>
//       <AppRoutes />
//     </Box>
//   );
// }

export default App;
