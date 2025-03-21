import { Box, Button, Card, Grid2, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
const SultanPreview = () => {
    return (
        <Grid2 item
            sx={{
                p: 10,
                bgcolor: "#f9f9f9",
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Box>
                <Typography variant="h6" align="center" color="#747474">Prévisualisation de l'interface</Typography>
            </Box>

            <Card
                sx={{
                    display: "flex",
                    mt: 2, borderRadius: 2,
                    overFlow: "hidden",
                    border: "1px solid #fff",
                    height: "450px",
                    width: "800px"
                }}>

            </Card>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, gap:1 }}>
                <Button
                    variant="outlined"
                    sx={{
                        backgroundColor: '#F5F5F5',
                        color: '#000',
                        borderColor: '#1B374C',
                        height: '40px',
                        borderRadius: 5,
                        '&:active': {
                            backgroundColor: '#1B374C',
                            color: '#FFF',
                            borderColor: '#1B374C',
                        }
                    }}
                ><span><ClearIcon /></span>Annuler</Button>
                <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#1B374C', 
                        color: '#FFF', 
                        height: '40px', 
                        borderRadius: 5 
                        }}
                >Valider<span><DoneIcon/></span></Button>
            </Box>

        </Grid2>

    );
};
export default SultanPreview;