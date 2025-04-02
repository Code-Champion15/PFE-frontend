// src/pages/AuthPage.js
import React, { useState } from "react";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/api";

const AuthPage = ({ onLogin = () => { } }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const response = await registerUser(formData);
        alert("Inscription réussie. Veuillez vous connecter.");
        setIsRegister(false);
        setFormData({ username: "", email: "", password: "" });
      } else {
        const response = await loginUser(formData);
        localStorage.setItem("token", response.token);
        console.log("Token sauvegardé : ", response.token);
        if (typeof onLogin === "function") {
          onLogin();
        }
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Une erreur est survenue.";
      alert("Erreur : " + errorMessage);
    }
  };

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <Box sx={{
      backgroundImage: "url('/assets/images/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: 580,
      width: 1136

    }}>
      <Card sx={{ width: 350, padding: 3, boxShadow: 3, borderRadius: 2, mx: "auto", mt: 10 }}>
        <CardContent>

          <Typography variant="h5" sx={{textAlign: "center", fontWeight: "bold", color: "#F39325"}}>{isRegister ? "Inscription" : "Connexion"}</Typography>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <TextField
                label="Nom d'utilisateur"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                fullWidth
                sx={{ my: 1 }}
                required
              />
            )}
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              sx={{ my: 1 }}
              required
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
              sx={{ my: 1 }}
              required
            />
            <Button type="submit" variant="contained" fullWidth
              sx={{
                backgroundColor: "#1B374C",
                color: "#FFF",
                height: "40px",
                borderRadius: 5,
              }}>
              {isRegister ? "S'inscrire" : "Se connecter"}
            </Button>
          </form>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Button onClick={toggleAuthMode} variant="outlined" sx={{
              backgroundColor: "#F5F5F5",
              color: "#000",
              borderColor: "#1B374C",
              height: "40px",
              borderRadius: 5,
              "&:active": {
                backgroundColor: "#1B374C",
                color: "#FFF",
                borderColor: "#1B374C",
              },
              mt: 2,

            }}>
              {isRegister ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? Créer un compte"}
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box >

  );
};

export default AuthPage;
