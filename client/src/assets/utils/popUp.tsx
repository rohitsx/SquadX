import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PopUpProps {
  message: string | null;
  setMessage: (value: string | null) => void;
  navigation?: string;
  seconds?: number;
}

const PopUp: React.FC<PopUpProps> = ({ message, setMessage,navigation, seconds = 3 }) => {
  // const [notification, setNotification] = useState<string | null>(message);
  const nav = useNavigate();

  useEffect(() => {
    // if (notification === 'An error occurred. Please try again.' || 'server error') return
    
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        navigation && nav(navigation);
      }, seconds * 1000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      id="popup"
      className="fixed top-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg shadow-lg z-50"
    >
      {message}
    </div>
  );
};

export default PopUp;
