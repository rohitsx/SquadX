import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import bgVideo from '../assets/img/bg.mp4';
import logo from '../assets/img/btc.png';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="video-background absolute inset-0 z-0">
        <video autoPlay muted loop playsInline id="bg-video" className="object-cover w-full h-full">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="z-10 w-full max-w-md p-10 space-y-8 bg-black bg-opacity-50 rounded-xl backdrop-blur-md">
        <div className="text-center">
          <a href="https://criminal.lol/" className="inline-flex items-center justify-center gap-3 text-lg font-semibold">
            <img src={logo} alt="Criminal Logo" className="h-8 w-8" />
            <div className="text-white">criminal.lol</div>
          </a>
        </div>

        <div>
          <h1 className="text-3xl font-bold uppercase text-white text-center">Login</h1>
          <p className="mt-3 text-sm text-neutral-300 text-center">Please enter your login details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium block mb-2 text-neutral-300">
              Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm bg-white bg-opacity-10 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium block mb-2 text-neutral-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm bg-white bg-opacity-10 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mt-2 text-right">
              <a href="/forgot-password" className="text-sm text-white hover:text-neutral-300 transition duration-300">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Login
          </button>

          <div className="text-sm text-center">
            <span className="text-neutral-400">New User? </span>
            <a href="/register" className="text-white hover:text-neutral-300 hover:underline transition duration-300">
              Register
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

export default LoginPage;