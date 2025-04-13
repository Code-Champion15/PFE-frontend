import { Password } from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:5000";

export const generatePageFromPrompt = async (prompt) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/pages/generate`, { prompt },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.content;
  } catch (error) {
    console.error("Erreur lors de la génération de la page par prompt :", error);
    throw error; 
  }
};

export const getPages = async () => {
  try {
    const response = await axios.get(`${API_URL}/pages`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des pages");
  }
};

export const getPageByRoute = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/pages/byroute/${route}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la page");
  }
};


export const getPageById = async (id) => {
  console.log(`FRONTEND: Récupération de la page avec ID: ${id}`);
  try {
    const response = await axios.get(`${API_URL}/pages/${id}`);
    console.log(" FRONTEND: Réponse reçue pour getPageById :", response.data);
    // Si le contenu est une chaîne, on le parse
    const content = typeof response.data.content === "string" ? JSON.parse(response.data.content) : response.data.content;
    return { ...response.data, content };
  } catch (error) {
    console.error("FRONTEND: Erreur dans getPageById :", error);
    throw error;
  }
};

export const updatePage = async (id, pageData) => {
  try {
    const response = await axios.put(`${API_URL}/pages/${id}`, pageData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("[API] Erreur dans getPageById:", error);
    throw error;
  }
};

export const createPage = async (pageData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/pages/create`, pageData, {
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Erreur lors de la création de la page";
    console.error("Erreur:", error);
    throw new Error(errorMessage);
  }
};

export const fetchPages = async () => {
  try {
    const response = await axios.get(`${API_URL}/pages`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des pages:", error);
    return [];
  }
};

export const getPageContent = async (id) => {
  try {
    //const response = await axios.get(`${API_URL}/pages/${id}`);
    const response = await axios.get(`${API_URL}/pages/content/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement du contenu de la page :", error);
    throw error;
  }
};


  // export const updatePageContent = async (pageId, contentData) => {
  //   try {
  //     const payload = { content: JSON.stringify(contentData) };
  //     const response = await axios.put(`${API_URL}/pages/update/${pageId}`, payload);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erreur lors de la mise à jour du contenu de la page :", error);
  //     throw error;
  //   }
  // };

  export const updatePageContent = async (pageId, contentData, operationType) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        //content: JSON.stringify(contentData),
        content: contentData,
        operationType, 
      };
      console.log(` FRONTEND : Mise à jour de la page avec ID: ${pageId}`);
      console.log(" FRONTEND : Payload envoyé :", payload);
      const response = await axios.put(`${API_URL}/pages/update/${pageId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      console.log(" FRONTEND : Réponse :", response.data);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du contenu :", error);
      throw error;
    }
  };


export const getAllPagesWithChildren = async () => {
  try {
      const response = await axios.get(`${API_URL}/pages/withchildren`);
      return response.data; 
  } catch (error) {
      console.error("Erreur lors de la récupération des pages :", error);
      return [];
  }
};

export const fetchPage = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/pages/${route}`);
    return response.data;
  } catch (error) {
    console.log("erreur lors de la recuperation de la page avec fetchPage;", error);
    return null;
  }
};

export const getPageContentByRoute = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/pages/contentbyroute/${route}`);
    console.log("Réponse complète de l'API :", response);

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error("Réponse API invalide ou vide");
    }
    console.log("Réponse API :", response.data); 

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du contenu :", error);
    throw error;
  }
};

export const getModificationHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/pages/history`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("historique récupéré: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    if (userData.role === "super-admin" && userData.superadminKey?.trim()) {
      payload.superadminKey = userData.superadminKey;
    }

    console.log("Payload envoyé:", payload);

    const response = await axios.post(`${API_URL}/auth/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.response?.data || error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error);
    throw error;
  }
};

// Fonction pour enregistrer une visite (trackVisit)
export const trackVisit = async (data) => {
  const response = await axios.post(`${API_URL}/statistics/track-visit`, data);
  return response.data;
};

export const getPageList = async () => {
  const response = await axios.get(`${API_URL}/pages/list`);
  return response.data;
};

// Fonction pour récupérer les statistiques d'une page (getStatsByPage)
export const getStatsByPage = async (pageRoute) => {
  const response = await axios.get(`${API_URL}/statistics/stats-by-page`, {
    params: { pageRoute },
  });
  return response.data;
};

export const getAllStats = async (params = {}) => {
  const response = await axios.get(`${API_URL}/statistics/stats-all`, { params });
  return response.data;
};

export const getHourlyStatsByPage = async (pageRoute) => {
  const response = await axios.get(`${API_URL}/statistics/hourly?pageRoute=${pageRoute}`);
  return response.data;
};

