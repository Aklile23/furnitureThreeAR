import React, { useState } from 'react';
import ARScene from './components/ARScene';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

const App = () => {
  const [currentModel, setCurrentModel] = useState(null);

  const handleSelectModel = (modelPath) => {
    setCurrentModel(modelPath);
  };

  return (
    <div className="App">
      <ARScene />
      <HamburgerMenu onSelectModel={handleSelectModel} />
    </div>
  );
};

export default App;
