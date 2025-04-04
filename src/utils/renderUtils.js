import React from "react";
import { Container, Typography, Button, Box, Card, CardMedia, CardContent, Accordion, AccordionSummary, AccordionDetails, Paper } from "@mui/material"; 
import EditableWrapper from "../components/EditableWrapper";


//pour la creation des pages
export const createElementFromJson = (element, key) => {
  if (!element || !element.type) return null;

  const componentsMap = {
    container: Container,
    typography: Typography,
    button: Button,
    box: Box,
    card: Card,
    image: "img",
    paper: Paper,
    cardmedia: CardMedia,
    cardcontent: CardContent,
    accordion: Accordion,
    accordionsummary:AccordionSummary,
    accordiondetails: AccordionDetails,
  };

  const Component = componentsMap[element.type.toLowerCase()] || "div";

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

//pour le mode edit : les elements enveloppés
export const createEditableElementFromJson = (element, path = "0", onSelect) => {
  if (!element || !element.type) return null;

  const componentsMap = {
    container: Container,
    paper: Paper,
    typography: Typography,
    button: Button,
    box: Box,
    card: Card,
    image: "img",
    cardmedia: CardMedia,
    cardcontent: CardContent,
    accordion: Accordion,
    accordionsummary: AccordionSummary,
    accordiondetails: AccordionDetails,
  };

  const Component = componentsMap[element.type.toLowerCase()] || "div";
  
  // Récupération des enfants avec parcours récursif
  let children = null;
  if (typeof element.children === "string") {
    children = element.children;
  } else if (Array.isArray(element.children)) {
    children = element.children.map((child, index) =>
      createEditableElementFromJson(child, `${path}-${index}`, onSelect)
    );
  }
  // Envelopper l'élément pour qu'il soit cliquable
  return (
    <EditableWrapper onClick={(e) => { 
      e.stopPropagation(); 
      onSelect && onSelect(path);
    }}
    >
      <Component {...element.props}>
        {children}
      </Component>
    </EditableWrapper>
  );
};
