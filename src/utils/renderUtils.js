import React from "react";
import { Container, Typography, Button, Box, Card, CardMedia, CardContent, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"; 

const componentsMap = {
  container: Container,
  typography: Typography,
  button: Button,
  box: Box,
  card: Card,
  cardmedia: CardMedia,
  cardcontent: CardContent,
  accordion: Accordion,
  accordionsummary:AccordionSummary,
  accordiondetails: AccordionDetails,
};


export const createElementFromJson = (element, key) => {
  if (!element || !element.type) return null;

  const Component = componentsMap[element.type.toLowerCase()] || "div";// Utiliser un div par défaut si non trouvé

  let children = element.children;
  if (typeof children === "string") {
    children = children; // Assurer que le texte est affiché
  } else if (Array.isArray(children)) {
    children = children.map((child, index) => createElementFromJson(child, `${key}-${index}`));
  }

  return (
    <Component key={key} {...element.props}>
      {children}
     
    </Component>
  );
};
