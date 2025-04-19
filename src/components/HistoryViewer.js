import React, { useEffect, useState } from "react";
import { getModificationHistory, restorePage } from "../services/api";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TextField, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RestoreIcon from "@mui/icons-material/Restore";

const HistoryViewer = () => {
  const [history, setHistory] = useState([]);
  const [pageFilter, setPageFilter] = useState("");
  const [operationFilter, setOperationFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getModificationHistory();
        setHistory(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique :", error);
      }
    };
    fetchHistory();
  }, []);

  // Filtrage des résultats
  const filteredHistory = history.filter(mod => {
    return (
      mod.pageName.toLowerCase().includes(pageFilter.toLowerCase()) &&
      (operationFilter === "" || mod.operationType === operationFilter) &&
      mod.userName.toLowerCase().includes(userFilter.toLowerCase())
    );
  });

  const handleDelete = (modificationId) => {
    // Implémentez ici la suppression si nécessaire.
    alert(`Supprimer la modification ${modificationId} (fonctionnalité à implémenter)`);
  };

  const handleViewDetails = (modification) => {
    alert(`Détails:
  Opération: ${modification.operationType}
  Utilisateur: ${modification.userName}
  Page: ${modification.pageName}
  Date: ${new Date(modification.createdAt).toLocaleString()}
  Ancien Contenu: ${modification.oldContent}
  Nouveau Contenu: ${modification.newContent}`);
  };

  const handleRestorePage = async (pageId) => {
    try {
      await restorePage(pageId);
      alert("Page restaurée avec succès");
      // Recharge l'historique
      const data = await getModificationHistory();
      setHistory(data);
    } catch (error) {
      console.error("Erreur lors de la restauration :", error);
      alert("Échec de la restauration.");
    }
  };

  return (
    <Paper sx={{ ml: 5, p: 2 }}>
      {/*<h2 style={{color: "#F39325"}}>Historique des Créations & Modifications</h2>*/}
      <FormControl sx={{ mr: 2, minWidth: 150 }}>
        <TextField
          label="Nom de la page"
          value={pageFilter}
          onChange={(e) => setPageFilter(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ mr: 2, minWidth: 150 }}>
        <InputLabel id="operation-filter-label">Opération</InputLabel>
        <Select
          labelId="operation-filter-label"
          value={operationFilter}
          label="Opération"
          onChange={(e) => setOperationFilter(e.target.value)}
        >
          <MenuItem value="">Tous</MenuItem>
          <MenuItem value="creation">Création</MenuItem>
          <MenuItem value="modification">Modification</MenuItem>
          <MenuItem value="supression">Supression</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mr: 2, minWidth: 150 }}>
        <TextField
          label="Utilisateur"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
      </FormControl>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opération</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Page</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Aucune modification trouvée.</TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((mod) => (
                <TableRow key={mod.id}>
                  <TableCell>{mod.operationType}</TableCell>
                  <TableCell>{mod.userName}</TableCell>
                  <TableCell>{mod.pageName}</TableCell>
                  <TableCell>{new Date(mod.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewDetails(mod)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(mod.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                    {mod.operationType === "supression" && (
                      <IconButton onClick={() => handleRestorePage(mod.pageId)} color="success">
                        <RestoreIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HistoryViewer;
