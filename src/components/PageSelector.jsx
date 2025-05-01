import React, { useEffect, useState } from 'react';
import { fetchFileList } from '../services/api';
import PreviewPage from './PreviewPage';
import EditablePreview from './EditablePreview';

const PageSelector = () => {
  const [files, setFiles] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
      const loadFiles = async () => {
        try {
          const fileList = await fetchFileList();
          setFiles(fileList);
        } catch (err) {
            console.error('Erreur chargement des pages', err);
        }
      };
      loadFiles();
    }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Prévisualisation de pages</h2>
      <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
        <option value="">-- Choisir une page --</option>
        {files.map((file) => (
          <option key={file} value={file}>{file}</option>
        ))}
      </select>

      <PreviewPage pageName={selectedPage} />
      {selectedPage && <EditablePreview pageName={selectedPage} />}
    </div>
  );
};

export default PageSelector;
