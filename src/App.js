// src/App.js
import React, { useState } from 'react';
import ARScene from './components/ARScene';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

const App = () => {
  const [currentModel, setCurrentModel] = useState(null);
  const [isARSessionStarted, setARSessionStarted] = useState(false);

  const handleSelectModel = (modelPath) => {
    setCurrentModel(modelPath);
  };

  const handleARSessionStart = () => {
    setARSessionStarted(true);
  };

  return (
    <div className="App">
      <ARScene currentModel={currentModel} setCurrentModel={setCurrentModel} onARSessionStart={handleARSessionStart} />
      {isARSessionStarted && <HamburgerMenu onSelectModel={handleSelectModel} />}
    </div>
  );
};

export default App;
