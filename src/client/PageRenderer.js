import { useEffect, useState } from "react";
import { getPageContentByRoute } from "../services/api";
import { createElementFromJson } from "../utils/renderUtils";

const PageRenderer = ({ route }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);

      try {
        console.log("Appel API en cours pour la route:", route);
        const response = await getPageContentByRoute(route);
        console.log("Réponse API :", response);
        setContent(response);

        if (response.length === 0) {
          throw new Error("Aucun contenu disponible.");
        }
        if (!Array.isArray(response)) {
          throw new Error("Format de réponse invalide.");
        }

        setContent(response);

      } catch (error) {
        console.error("Impossible de charger la page :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [route]);

  if (loading) return <p>Chargement..</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!content || content.length === 0) return <p>pas de contenu disponible </p>;

  return (
    <div>
      {content.map((element, index) => createElementFromJson(element, `root-${index}`))}
    </div>
  );
};

export default PageRenderer;

