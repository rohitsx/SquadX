import React, { useState } from 'react';
import bgVideo from '@/assets/img/bg.mp4';
import logo from '@/assets/img/btc.png';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Password recovery submitted for:', email);
    // Implement password recovery logic here
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

        <h1 className="text-2xl font-bold uppercase text-white text-center">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-1 text-neutral-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-white bg-opacity-10 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Reset Password
          </button>

          <div className="text-sm text-center">
            <a href="/login" className="text-white hover:text-neutral-300 hover:underline transition duration-300">
              Back to Login
            </a>
          </div>
        </form>

        <div className="text-xs text-center text-neutral-500">
          © 2024 criminal.lol
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
