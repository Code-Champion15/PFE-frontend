import { Card, Box, Typography } from "@mui/material";
import CardInfo from "../components/CardInfo";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const DashboardContent = () => {
    return (
        <Card sx={{ width: "95%", boxShadow: 3, marginTop: "64px", marginLeft: "64px" }}>
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h3" sx={{ my: 2, textAlign: "center", color: "#F39325" }}>
                            Dashboard
                        </Typography>
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(4, 1fr)"
                            gap={3}
                            sx={{ flexGrow: 1 }}
                            justifyContent="space-around"
                        >
                            <Box>
                                <CardInfo title="nb visiteurs totale" value={88} />
                            </Box>
                            <Box>
                                <CardInfo title="nb visiteurs par mois" value={33} />
                            </Box>
                            <Box>
                                <CardInfo title="nb visiteurs par semaine" value={11} />
                            </Box>
                            <Box>
                                <CardInfo title="nb visiteurs par jour" value={11} />
                            </Box>
                        </Box>
                        <Box display="grid" container gap={3} gridTemplateColumns="repeat(2, 1fr)" justifyContent="center" padding={4}>
                            <Card sx={{ width: "500px", height: "280px" }}>
                                <Box display="grid" item md={4}>
                                    <BarChart />
                                </Box>
                            </Card>
                            <Card sx={{ width: "500px", height: "280px" }}>
                                <Box dislay="grid" item md={4}>
                                    <PieChart />
                                </Box>
                            </Card>

                        </Box>

                    </Box>
                </Card>
    );
};
export default DashboardContent;
