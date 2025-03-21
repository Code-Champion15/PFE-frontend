import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../client/Navbar";
import PageCreation from "../admin/PageCreation";
import PageEditor from "../admin/PageEditor";
import DashboardContent from "../admin/DashboardContent";
import Login from "../pages/Login";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SultanChatbot from "../admin/SultanChatBot";
import SultanPreview from "../admin/SultanPreview";
import PageRenderer from "../client/PageRenderer";
import { useParams } from "react-router-dom"; 

const DynamicPage = () => {
  const { route } = useParams(); 
  return <PageRenderer route={route} />;
};

const AppRoutes = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); // Vérifie si l'on est sur une page admin

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isAdminPage && <Navbar />}
      {isAdminPage && (
        <>
          <Header toggleSidebar={toggleSidebar} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }} />
          <Sidebar open={sidebarOpen} />
        </>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 2 }}>
        <Routes>
          {/* Interface Client */}
          {/*<Route path="/client" element={<Navbar />} />*/}
          <Route path="/:route" element={<DynamicPage />} />

          {/* Interface Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<DashboardContent />} />
          <Route path="/admin/create" element={<PageCreation />} />
          <Route path="/admin/SultanChatbot/:pageId" element={<SultanChatbot />} />
          <Route path="/admin/SultanPreview" element={<SultanPreview />} />
          <Route path="/admin/edit/:id" element={<PageEditor />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppRoutes;

