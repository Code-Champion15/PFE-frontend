 import { Card, Typography, Grid2, Container, CardContent, Box, TextField, Button } from "@mui/material";
 import { useState, useEffect } from "react";
 import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
 import { useNavigate, useParams } from "react-router-dom";
 import { getPageContent, updatePageContent } from "../services/api"; 


const SultanChatBot = () => {
  const [code, setCode] = useState(""); 
  const { pageId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadPageContent = async () => {
      try {
        const content = await getPageContent(pageId);
        if (content && content.content) {
          setCode(content.content); 
        }
      } catch (error) {
        console.error("Erreur lors du chargement du contenu de la page :", error);
      }
    };
    loadPageContent();
  }, [pageId]);

  // Fonction pour mettre à jour le contenu de la page et naviguer vers SultanPreview
  const handleSuivant = async () => {
    try {
      //await updatePageContent(pageId, { content: code });
      await updatePageContent(pageId, code);
      navigate("/admin/SultanPreview"); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour du contenu de la page :", error);
    }
  };

  const handlePrecedent = () => {
    navigate(-1); 
  };

  return (
    <Grid2 item sx={{ p: 10, bgcolor: "#f9f9f9", height: '600px' }}>
      <Typography variant="h4" align="center" sx={{ color: "#747474" }}>
        SULTAN Chatbot
      </Typography>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Décrire le contenu de la page..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              multiline
              minRows={4}
            />
          </CardContent>
        </Card>
      </Container>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="outlined"
          sx={{ backgroundColor: '#F5F5F5', color: '#000', borderColor: '#1B374C', height: '40px', borderRadius: 5 }}
          onClick={handlePrecedent}
        >
          <ArrowBackIcon /> Précédent
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1B374C', color: '#FFF', height: '40px', borderRadius: 5 }}
          onClick={handleSuivant}
        >
          Suivant <ArrowForwardIcon />
        </Button>
      </Box>
    </Grid2>
  );
};
export default SultanChatBot;