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
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PendingAdmins from "../admin/PendingAdmins";
import PageGenerator from "../pages/PageGenerator";
import ActivityLog from "../admin/ActivityLog";
import SupprimerPage from "../admin/SupprimerPage";
import VersionManager from "../admin/VersionManager";
import AdminList from "../admin/AdminList";
import Unauthorized from "../admin/Unauthorized";
import RequireAuth from "../pages/RequireAuth";
import EditFilePage from "../pages/admin/EditFilePage";
import DynamiquePage from "./DynamiquePage";
import AdminCreatePage from "../pages/admin/AdminCreatePage";

import Parking from "../pages/Parking";
import PagePreviewInterface from "../pages/admin/PagePreviewInterface";

const DynamicPage = () => {
  const { route } = useParams();
  return <PageRenderer route={route} />;
};

const AppRoutes = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname.startsWith("/login");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isAdminPage && !isLoginPage && <Navbar />}
      {isAdminPage && (
        <>
          <Header toggleSidebar={toggleSidebar} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }} />
          <Sidebar open={sidebarOpen} />
        </>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 2 }}>
        <Routes>

          {/* <Route path="/:route" element={<DynamicPage />} /> */}

          <Route path="/login" element={<AuthPage />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />

          <Route path="/admin/dashboard" element={<DashboardContent />} />
          <Route path="/admin/delete" element={<SupprimerPage />} />
          <Route path="/admin/create" element={<PageCreation />} />
          <Route path="/admin/SultanChatbot/:pageId" element={<SultanChatbot />} />
          <Route path="/admin/SultanPreview" element={<SultanPreview />} />
          <Route path="/admin/modify" element={<AdminModificationWizard />} />
          <Route path="/admin/history" element={<HistoryPage />} />
          <Route path="/admin/my-history" element={<ActivityLog />} />
          <Route path="/admin/version-manager" element={<VersionManager />} />

          <Route path="/admins" element={<AdminList />} />
          <Route path="/admins/pending" element={<PendingAdmins />} />

          <Route path="/admin/SultanPreview/:pageId" element={<SultanPreview />} />
          {/* <Route path="/admin/generator" element={<PageGenerator/>}/> */}

          <Route path="/unauthorized" element={<Unauthorized />} />

          {/****************************************************************************************** */}
          <Route path="/preview" element={<PagePreviewInterface />} />
          <Route path="/admin/editfile" element={<EditFilePage />} />

          <Route path="/admin/createFile" element={<AdminCreatePage />} />
          {/* <Route path="/page/:pageName" element={<DynamiquePage />} /> */}

           Page 404 pour routes non trouvées 
          <Route path="*" element={<div>Page non trouvée</div>} />
          <Route path="/:pageName" element={<DynamiquePage />} /> 
        </Routes>
      </Box>
    </Box>
  );
};

export default AppRoutes;

