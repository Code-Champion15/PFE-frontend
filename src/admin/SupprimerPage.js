import React, { useState, useEffect } from "react";
import { Button, Typography, Alert, Box } from "@mui/material";
import CustomTreeView from "../components/CustomTreeView"; // Composant d'arbre personnalisé pour l'affichage des pages
import { fetchPages, deletePage } from "../services/api";

const SupprimerPage = () => {
  const [formattedPages, setFormattedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null); // Page sélectionnée
  const [message, setMessage] = useState(null); // Message d'alerte après suppression

  // Fonction pour transformer la liste plate des pages en arbre hiérarchique
  const buildTree = (pagesList) => {
    const map = {};
    const tree = [];

    // Crée un dictionnaire où chaque page est associée à son ID
    pagesList.forEach((page) => {
      map[page.id] = { ...page, label: page.name, children: [] };
    });

    // Crée l'arbre en ajoutant des enfants aux pages parentes
    pagesList.forEach((page) => {
      if (page.parentId) {
        map[page.parentId].children.push(map[page.id]);
      } else {
        tree.push(map[page.id]);
      }
    });

    return tree;
  };

  // Charger les pages depuis l'API au démarrage
  useEffect(() => {
    const loadPages = async () => {
      try {
        const pagesList = await fetchPages(); // Appel API pour récupérer la liste des pages
        const treeData = buildTree(pagesList); // Transformer les pages en arbre
        setFormattedPages(treeData); // Mettre à jour l'état avec les pages formatées
      } catch (error) {
        console.error("[SupprimerPage] Erreur chargement pages:", error);
      }
    };
    loadPages(); // Charger les pages
  }, []);

  // Fonction pour gérer la sélection d'une page à supprimer
  const handleSelectNode = (node) => {
    setSelectedPage(node); // Mettre à jour la page sélectionnée
  };

  // Fonction pour supprimer la page sélectionnée
  const handleDeletePage = async () => {
    if (!selectedPage) {
      setMessage({ type: "error", text: "Aucune page sélectionnée !" });
      return;
    }

    try {
      const response = await deletePage(selectedPage.id); 
      setMessage({ type: "success", text: response.message }); 
      setSelectedPage(null); 
    } catch (error) {
      setMessage({ type: "error", text: error.message }); // Afficher un message d'erreur
    }
  };

  return (
    <Box sx={{p:10}}>
      <Typography variant="h5" sx={{ color: "#F39325", fontFamily: "Poppins" }} gutterBottom>
        Supprimer une page
      </Typography>

      {message && (
        <Alert severity={message.type} style={{ marginBottom: "20px" }}>
          {message.text}
        </Alert>
      )}

      <CustomTreeView
        data={formattedPages} // Passer les données formatées pour l'affichage
        onSelect={handleSelectNode} // Passer la fonction qui gère la sélection
      />

      <Box sx={{ mt: 20 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeletePage}
          disabled={!selectedPage} // Désactiver le bouton si aucune page n'est sélectionnée
        >
          Supprimer la page
        </Button>
      </Box>
    </Box>
  );
};

export default SupprimerPage;
