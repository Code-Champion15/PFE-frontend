import React, { useState } from 'react';
import { Button, Box, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadProjectZip } from '../services/api';

const ProjectUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith('.zip')) {
      setFile(selected);
      setMessage(null);
      setError(null);
    } else {
      setFile(null);
      setError('Veuillez sélectionner un fichier ZIP valide.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await uploadProjectZip(file);
      setMessage(res.message || 'Upload réussi');
    } catch (err) {
      setError(err?.response?.data?.error || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 8, border: '1px solid #ccc', borderRadius: 2, maxWidth: 500, mx: 'auto', mt:10}}>
      <Typography variant="h6" gutterBottom>
        Upload d’un projet React (ZIP)
      </Typography>

      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-zip"
      />

      <label htmlFor="upload-zip">
        <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
          Choisir un fichier ZIP
        </Button>
      </label>

      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Fichier sélectionné : {file.name}
        </Typography>
      )}

      {uploading && <LinearProgress sx={{ my: 2 }} />}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
        sx={{ mt: 2 }}
      >
        Uploader le projet
      </Button>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default ProjectUpload;
