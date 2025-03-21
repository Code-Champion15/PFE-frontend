// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { Collapse, List, ListItem, ListItemText } from "@mui/material";
// import React from "react";
// import { useState } from "react";

// const CustomTreeView = ({ data, onSelect }) => {
//     const [openItems, setOpenItems] = useState({});
  
//     const handleToggle = (id) => {
//       setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
//     };
//       const renderTree = (nodes) => {
//       return nodes.map((node) => (
//         <React.Fragment key={node.id}>
//           <ListItem
//             button
//             onClick={() => {
//               // Si l'élément possède des enfants, on ouvre/ferme la liste
//               if (node.children) {
//                 handleToggle(node.id);
//               } else {
//                 onSelect(node.label);
//               }
//             }}
//           >
//             <ListItemText primary={node.label} />
//             {node.children && (openItems[node.id] ? <ExpandLess /> : <ExpandMore />)}
//           </ListItem>
//           {node.children && (
//             <Collapse in={openItems[node.id]} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 {node.children.map((child) => (
//                   <ListItem
//                     key={child.id}
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => onSelect(`${node.label}/${child.label}`)}
//                   >
//                     <ListItemText primary={child.label} />

//                   </ListItem>
//                 ))}
//               </List>
//             </Collapse>
//           )}
//         </React.Fragment>
//       ));
//     };
  
//     return <List>{renderTree(data)}</List>;
//   };
// export default CustomTreeView;

import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemText } from "@mui/material";

const CustomTreeView = ({ data, onSelect }) => {
  // openItems garde l'état des nœuds ouverts (clé: id, valeur: booléen)
  const [openItems, setOpenItems] = useState({});

  // Inverse l'état d'ouverture d'un nœud
  const handleToggle = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fonction récursive pour afficher l'arborescence
  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <ListItem
          button
          onClick={(e) => {
            // Empêche la propagation de l'événement pour éviter des déclenchements multiples
            e.stopPropagation();
            // Si le nœud possède des enfants, on le bascule ; sinon, on déclenche onSelect
            if (node.children && node.children.length > 0) {
              handleToggle(node.id);
            } else {
              onSelect && onSelect(node);
            }
          }}
        >
          <ListItemText primary={node.label} />
          {/* Affiche l'icône d'expansion si le nœud possède des enfants */}
          {node.children && node.children.length > 0 && (openItems[node.id] ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {/* Si le nœud a des enfants, on les affiche récursivement dans un Collapse */}
        {node.children && node.children.length > 0 && (
          <Collapse in={openItems[node.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderTree(node.children)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return <List>{renderTree(data)}</List>;
};

export default CustomTreeView;
