
// const API_URL = "http://localhost:5000";

// export const getPages = async () => {
//     const response = await fetch(`${API_URL}/pages`);
//     if (!response.ok) throw new Error("Erreur lors de la récupération des pages");
//     return response.json();
// };

// export const getPageByRoute = async (route) => {
//     const response = await fetch(`${API_URL}/pages/byroute/${route}`);
//     if (!response.ok) throw new Error("Erreur lors de la récupération de la page");
//     return response.json();
// };

// export const  getPageById = async (id) => {
//     const response = await fetch(`${API_URL}/pages/${id}`);
//     if (!response.ok) throw new Error("Erreur lors de la récupération de la page");
//     return response.json();
// }

// export const updatePage = async (id, pageData) => {
//     const response = await fetch(`${API_URL}/pages/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(pageData),
//     });
//     if (!response.ok) throw new Error("Erreur lors de la modification de la page");
//     return response.json();
// };

// // export const createPage = async (pageData) => {
// //     const response = await fetch(`${API_URL}/pages`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(pageData),
// //     });
// //     if (!response.ok) throw new Error("Erreur lors de la création de la page");
// //     return response.json();
// //   };

//   export const createPage = async (pageData) => {
//     try {
//       const response = await fetch(`${API_URL}/pages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(pageData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json(); 
//         throw new Error(errorData.message || "Erreur lors de la création de la page");
//       }
  
//       return response.json();
//     } catch (error) {
//       console.error("Erreur:", error);
//       throw error;
//     }
//   };


// export const fetchPages = async () => {
//   try {
//     const response = await fetch(`${API_URL}/pages`);
//     if (!response.ok) {
//       throw new Error(`Erreur HTTP: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Erreur lors de la récupération des pages:", error);
//     return [];
//   }
// };

// export const getPageContent = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/pages/${id}`);

//     if (!response.ok) {
//       throw new Error(`Erreur HTTP : ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Erreur lors du chargement du contenu de la page :", error);
//     throw error;
//   }
// };

  

// // D'autres fonctions (createPage, deletePage) peuvent être ajoutées de la même manière.

import axios from "axios";

const API_URL = "http://localhost:5000";

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
  try {
    const response = await axios.get(`${API_URL}/pages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la page");
  }
};

export const updatePage = async (id, pageData) => {
  try {
    const response = await axios.put(`${API_URL}/pages/${id}`, pageData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la modification de la page");
  }
};

export const createPage = async (pageData) => {
  try {
    const response = await axios.post(`${API_URL}/pages`, pageData, {
      headers: { "Content-Type": "application/json" },
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
    const response = await axios.get(`${API_URL}/pages/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement du contenu de la page :", error);
    throw error;
  }
};


export const updatePageContent = async (pageId, contentData) => {
  try {
    const response = await axios.put(`${API_URL}/pages/${pageId}`, contentData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contenu de la page :", error);
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