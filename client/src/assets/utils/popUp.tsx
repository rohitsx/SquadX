import React, { useEffect } from 'react';

interface PopUpProps {
  message: string;
  navigation?: string;
  seconds?: number;
}

const PopUp: React.FC<PopUpProps> = ({ message, navigation, seconds = 3 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {
        window.location.href = navigation;
      } else {
        const popup = document.getElementById('popup');
        if (popup) {
          popup.style.display = 'none';
        }
      }
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }, [navigation, seconds]);

  return (
    <div id="popup" className="fixed top-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default PopUp;
