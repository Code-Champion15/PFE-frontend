import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Section 1", "Section 2", "Section 3", "Section 4", "Section 5"],
    datasets: [{
      data: [9, 26, 25, 28, 12],
      backgroundColor: ["#E58E26", "#F0A500", "#D98E04", "#C67801", "#A65D03"],
    }],
  };

  return (
    <Box sx={{ width: "90%", height: "260px" }}>
        <Pie data={data} />
    </Box>
  );
};

export default PieChart;
