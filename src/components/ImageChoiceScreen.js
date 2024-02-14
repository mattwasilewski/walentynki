import React, { useState } from 'react';
import kot from "../kot.jpg";
import pies from "../pies.jpg";

const ImageChoiceScreen = ({ onImageSelected, onBothImagesSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bothSelected, setBothSelected] = useState(false);

  const handleImageClick = imageId => {
    setSelectedImage(imageId);
    if (typeof onImageSelected === 'function') {
      onImageSelected(imageId);
    }

    if ((imageId === 'kot' && selectedImage === 'pies') || (imageId === 'pies' && selectedImage === 'kot')) {
      setBothSelected(true);
      onBothImagesSelected(); // Wywołanie funkcji po wybraniu obu obrazków
    }
  };

  return (
    <div className={`container ${bothSelected ? 'fade-out' : ''}`}>
      <div className="header">
        <h1>Kto będzie Twoją walentynką?</h1>
      </div>
      <div className="images-row">
        <div className="image-container" onClick={() => handleImageClick('kot')}>
          <img src={kot} alt="Kot" />
          {selectedImage === 'kot' && <span className="cross">X</span>}
        </div>
        <div className="image-container" onClick={() => handleImageClick('pies')}>
          <img src={pies} alt="Pies" />
          {selectedImage === 'pies' && <span className="cross">X</span>}
        </div>
      </div>
    </div>
  );
};

export default ImageChoiceScreen;
