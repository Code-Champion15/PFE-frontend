import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login'); // Redirige vers l’interface login/inscription
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          NomDeVotreApp
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Le slogan qui met en valeur votre plateforme
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleStart}
          sx={{ px: 4, py: 1.5, fontSize: '1.2rem', borderRadius: '12px' }}
        >
          Commencer
        </Button>
      </Container>
    </Box>
  );
};

export default WelcomeScreen;
