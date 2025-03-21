import { Box } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ["Accueil", "Reservez", "Nos services", "Règlement", "Qui sommes-nous ?"],
        datasets: [{
            label: "Les pages les plus visitées",
            data: [30, 18, 24, 3, 7],
            backgroundColor: "#E58E26",
        }],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <Box sx={{ width: "90%", height: "260px" }}>
            <Bar data={data} options={options} />
        </Box>
    );
};

export default BarChart;