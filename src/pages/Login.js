import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Box 
            sx={{
                backgroundImage: "url('/assets/images/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 580,
                width: 1136
                
            }}
        >
            <Card sx={{ width: 350, padding: 3, boxShadow: 3, borderRadius: 2, mx:"auto", mt:10 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Connectez-vous
                    </Typography>
                    
                    <TextField 
                        label="Email" 
                        type="email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                    />
                    
                    <TextField 
                        label="Mot de passe" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Link href="#" variant="h6" sx={{fontSize: "8px"}}>
                            Mot de passe oublié ?
                        </Link>
                    </Box>

                    <Button 
                        variant="contained" 
                        
                        fullWidth 
                        sx={{ mt: 2, backgroundColor: '#1B374C', color: '#FFF', "&:hover": { bgcolor: "#14202f"}}}
                    >
                        Se connecter
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;