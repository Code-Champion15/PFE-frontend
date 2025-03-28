import { Box, Card } from "@mui/material";
import HistoriqueHeader from "../components/HistoriqueHeader";
import HistoriqueTable from "../components/HistoriqueTable";

const Historique = () => {
    return (
    <Box sx={{ p: 3, mt: 10, ml: 10}}>
        <Card sx={{ p:3, borderRadius: 3}}>
            <HistoriqueHeader/>
            <HistoriqueTable/>
        </Card>

    </Box>

);
};
export default Historique;