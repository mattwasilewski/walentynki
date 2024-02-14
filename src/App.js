import React, { useState, useEffect } from 'react';
import './App.css';
import kot from './kot.jpg';
import pies from './pies.jpg';
import mati from './mati.png';

function App() {
  const [currentStage, setCurrentStage] = useState('countdown');
  const [countdownTime, setCountdownTime] = useState(10);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    let timer;
    if (currentStage === 'countdown') {
      timer = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [currentStage]);

  useEffect(() => {
    if (countdownTime <= 0) {
      setCurrentStage('chooseImage');
    }
  }, [countdownTime]);

  useEffect(() => {
    if (selectedImages.length === 2) {
      setTimeout(() => setCurrentStage('finalImage'), 4000); // Wait for fade-out to complete
    }
  }, [selectedImages]);

  const handleImageClick = (imageId) => {
    setSelectedImages((prev) => {
      const newSelection = prev.includes(imageId) ? prev.filter(id => id !== imageId) : [...prev, imageId];
      return newSelection;
    });
  };

  return (
    <div className="App">
      {currentStage === 'countdown' && (
        <div className="countdown-container">
          <h1>{countdownTime}</h1>
        </div>
      )}

      {currentStage === 'chooseImage' && (
        <div className={`container ${selectedImages.length === 2 ? 'fade-out' : ''}`}>
          <div className="header">
            <h1>Kto będzie Twoją walentynką?</h1>
          </div>
          <div className="images-row">
            <div className="image-container" onClick={() => handleImageClick('kot')}>
              <img src={kot} alt="Kot" />
              {selectedImages.includes('kot') && <span className="cross">X</span>}
            </div>
            <div className="image-container" onClick={() => handleImageClick('pies')}>
              <img src={pies} alt="Pies" />
              {selectedImages.includes('pies') && <span className="cross">X</span>}
            </div>
          </div>
        </div>
      )}

      {currentStage === 'finalImage' && (
        <div className="final-image-container fade-in">
          <h1>Nie masz wyjścia</h1>
          <img src={mati} alt="mati" />
          <h1>Twój Mateusz</h1>
        </div>
      )}
    </div>
  );
}

export default App;
