 import { Card, Typography, Grid2, Container, CardContent, Box, TextField, Button } from "@mui/material";
 import { useState, useEffect } from "react";
 import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
 import { useNavigate, useParams } from "react-router-dom";
 import { getPageContent, updatePageContent, generatePageFromPrompt, } from "../services/api"; 
 import { createElementFromJson } from "../utils/renderUtils";

const SultanChatBot = () => {
  //const [code, setCode] = useState(""); 
  const { pageId } = useParams(); 
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const navigate = useNavigate();

  const handleGeneratedContent = async () => {
    try{
      const response = await generatePageFromPrompt(prompt);
      setGeneratedContent(response);
    } catch(error){
      console.error("erreur lors de la generation du contenu", error);
    }
  };

  const handleUpdateContent = async () => {
    try{
      await updatePageContent(pageId, generatedContent);
      navigate(`/admin/SultanPreview/${pageId}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du contenu", error);
    }
  };

  // useEffect(() => {
  //   const loadPageContent = async () => {
  //     try {
  //       const content = await getPageContent(pageId);
  //       if (content && content.content) {
  //         setCode(content.content); 
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors du chargement du contenu de la page :", error);
  //     }
  //   };
  //   loadPageContent();
  // }, [pageId]);

  // // Fonction pour mettre à jour le contenu de la page et naviguer vers SultanPreview
  // const handleSuivant = async () => {
  //   try {
  //     //await updatePageContent(pageId, { content: code });
  //     await updatePageContent(pageId, code);
  //     navigate(`/admin/SultanPreview/${pageId}`); 
  //   } catch (error) {
  //     console.error("Erreur lors de la mise à jour du contenu de la page :", error);
  //   }
  // };

   const handlePrecedent = () => {
     navigate(-1); 
   };

  return (
    <Container sx={{ p: 10, bgcolor: "#f9f9f9", height: '600px'}}>
      <Typography variant="h4" align="center" sx={{ color: "#747474", mb: 3}}>
        SULTAN Chatbot
      </Typography>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Décrire le contenu de la page..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              multiline
              minRows={4}
            />
          </CardContent>
        </Card>
        {/* <Button variant="outlined"
          sx={{ backgroundColor: '#F5F5F5', color: '#000', borderColor: '#1B374C', height: '40px', borderRadius: 5 }} onClick={handleGeneratedContent}>Générer</Button> */}
      </Container>

       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, px:10}}>
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
          onClick={handleGeneratedContent}
        >
          Générer <ArrowForwardIcon />
        </Button> 

      </Box> 
      {generatedContent && (
        <div>
          <h3>Prévisualisation :</h3>
          <div>{createElementFromJson(generatedContent, 'preview')}</div>
        </div>
      )}

      <Button onClick={handleUpdateContent}>Valider</Button>
    </Container>
  );
};
export default SultanChatBot;