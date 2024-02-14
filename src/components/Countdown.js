import React, { useState, useEffect } from 'react';
import ImageChoiceScreen from './ImageChoiceScreen';

const Countdown = ({ onImageSelected }) => {
  // Ustawienie czasu końca odliczania na 10 sekund od teraz
  const endTime = new Date().getTime() + 10000; // 10 sekund = 10000 milisekund

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
      return {
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      return {};
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    // Ustawienie interwału do aktualizacji czasu co sekundę
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (Object.keys(updatedTimeLeft).length === 0) {
        clearInterval(timer);
        setIsCountdownOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map(interval => (
    <span key={interval}>
      {timeLeft[interval]} {interval}{" "}
    </span>
  ));

  if (isCountdownOver) {
    return <ImageChoiceScreen onImageSelected={onImageSelected} />;
  }
  
  return (
    <div className="countdown-container"> {/* Użyj nowej klasy */}
      {timerComponents.length ? timerComponents : <span>Czas na Walentynki!</span>}
    </div>
  );
};

export default Countdown;
