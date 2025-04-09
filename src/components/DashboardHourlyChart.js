import React, { useEffect, useState } from "react";
import { getHourlyStatsByPage, getPageList } from "../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Select, MenuItem, FormControl, InputLabel, Typography, Box } from "@mui/material";

const DashboardHourlyChart = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      const pageList = await getPageList();
      setPages(pageList);
      if (pageList.length > 0) setSelectedPage(pageList[0].route);
    };
    fetchPages();
  }, []);

  useEffect(() => {
    if (!selectedPage) return;
    const fetchHourlyStats = async () => {
      const stats = await getHourlyStatsByPage(selectedPage);
      const formatted = stats.map(item => ({
        hour: `${item.hour}:00`,
        visits: parseInt(item.visits),
        avgDuration: parseFloat(item.avgDuration).toFixed(1),
      }));
      setData(formatted);
    };
    fetchHourlyStats();
  }, [selectedPage]);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h6" fontWeight={600} fontFamily='poppins' mb={3} align="center" sx={{color: "#1976D2"}}>
        Horaires des visites par page
      </Typography>
      <FormControl size="small" sx={{ mb: 3, minWidth: 140 }}>
        <InputLabel>Page</InputLabel>
        <Select
          value={selectedPage}
          label="Page"
          onChange={(e) => setSelectedPage(e.target.value)}
          sx={{ borderRadius: 2 }}
        >
          {pages.map((page) => (
            <MenuItem key={page.route} value={page.route}>
              {page.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="visits" stroke="#8884d8" name="Visites" />
          <Line type="monotone" dataKey="avgDuration" stroke="#82ca9d" name="Durée moyenne (s)" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DashboardHourlyChart;
