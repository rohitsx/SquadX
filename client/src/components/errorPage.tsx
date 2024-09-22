import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgVideo from '../assets/img/bg.mp4';
import logo from '../assets/img/btc.png';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="video-background absolute inset-0 z-0">
        <video autoPlay muted loop playsInline id="bg-video" className="object-cover w-full h-full">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="z-10 w-full max-w-md p-8 space-y-6 bg-black bg-opacity-50 rounded-xl backdrop-blur-md">
        <div className="text-center">
          <a href="https://criminal.lol/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <img src={logo} alt="Criminal Logo" className="h-8 w-8" />
            <div className="text-white">criminal.lol</div>
          </a>
        </div>

        <h1 className="text-4xl font-bold uppercase text-white text-center">Error 404</h1>
        <p className="text-xl text-neutral-300 text-center">Oops! Page not found.</p>

        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Home
          </button>
        </div>

        <div className="text-xs text-center text-neutral-500">
          © 2024 criminal.lol
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
