import React, { useEffect, useState } from "react";
import { getPageList, getStatsByPage } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const DashboardStats = () => {
  const [pageList, setPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await getPageList();
        setPageList(pages);
        if (pages.length > 0) {
          setSelectedPage(pages[0].route);
        }
      } catch (err) {
        console.error("Erreur récupération pages :", err);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!selectedPage) return;
      try {
        const data = await getStatsByPage(selectedPage);
        const formatted = data.map((item) => ({
          visitDate: item.visitDate,
          visits: parseInt(item.visits, 10),
        }));
        setStats(formatted);
      } catch (err) {
        console.error("Erreur récupération stats :", err);
      }
    };
    fetchStats();
  }, [selectedPage]);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h6" fontWeight={600} fontFamily='poppins' mb={3} align="center" sx={{color: "#1976D2"}}>
        Statistiques globales de visites par page
      </Typography>

      {/* <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      > */}
        <FormControl  size="small" sx={{ mb: 3,  minWidth: 140 }}>
          <InputLabel id="page-select-label">Page</InputLabel>
          <Select
            labelId="page-select-label"
            value={selectedPage}
            label="Page"
            onChange={(e) => setSelectedPage(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            {pageList.map((page) => (
              <MenuItem key={page.route} value={page.route}>
                {page.name || page.route}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {stats.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="visitDate" stroke="#888" />
              <YAxis allowDecimals={false} stroke="#888" />
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 13 }}
                labelStyle={{ fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#2196f3"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography color="text.secondary" fontStyle="italic">
            Aucune donnée disponible pour cette page.
          </Typography>
        )}
      {/* </Paper> */}
    </Box>
  );
};

export default DashboardStats;
