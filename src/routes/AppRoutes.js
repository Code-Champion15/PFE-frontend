import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../client/Navbar";
import PageCreation from "../admin/PageCreation";
import DashboardContent from "../admin/DashboardContent";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SultanChatbot from "../admin/SultanChatBot";
import SultanPreview from "../admin/SultanPreview";
import PageRenderer from "../client/PageRenderer";
import { useParams } from "react-router-dom"; 
import AdminModificationWizard from "../admin/AdminModificationWizard";
import HistoryPage from "../pages/HistoryPage";
import AuthPage from "../pages/AuthPage";

const DynamicPage = () => {
  const { route } = useParams(); 
  return <PageRenderer route={route} />;
};

const AppRoutes = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); 
  const isLoginPage = location.pathname === "/login";
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isAdminPage && !isLoginPage && <Navbar />}
      {isAdminPage &&  (
        <>
          <Header toggleSidebar={toggleSidebar} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }} />
          <Sidebar open={sidebarOpen} />
        </>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 2 }}>
        <Routes>
          {/* Interface Client */}
          <Route path="/:route" element={<DynamicPage />} />

          {/* Interface Admin */}
          <Route path="/login" element={<AuthPage />} />         
          <Route path="/admin/dashboard" element={<DashboardContent />} />
          <Route path="/admin/create" element={<PageCreation />} />
          <Route path="/admin/SultanChatbot/:pageId" element={<SultanChatbot />} />
          <Route path="/admin/SultanPreview" element={<SultanPreview />} />
          <Route path="/admin/modify" element={<AdminModificationWizard />} />
          <Route path="/admin/history" element={<HistoryPage />} />

        </Routes>
      </Box>
    </Box>
  );
};

export default AppRoutes;

