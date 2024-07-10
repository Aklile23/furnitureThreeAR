import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onSelectModel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button className="menu-button" onClick={() => onSelectModel('model1.glb')}>Model 1</button>
        <button className="menu-button" onClick={() => onSelectModel('model2.glb')}>Model 2</button>
        <button className="menu-button" onClick={() => onSelectModel('model3.glb')}>Model 3</button>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
    </div>
  );
};

export default HamburgerMenu;
