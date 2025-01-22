import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, User } from 'lucide-react';
import axios from 'axios';
import env from '@/utils/enviroment';
import SquadXLogo from '@/assets/logo';

interface Notification {
  type: "success" | "error";
  message: string;
}

export default function Username() {
  const { access_token, credential } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = useCallback(
    (type: "success" | "error", message: string) => {
      setNotification({ type, message });
    },
    []
  );

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(env.apiUrl + "/auth", {
        credential: credential === "undefined" ? null : credential,
        access_token: access_token === "undefined" ? null : access_token,
        username,
      });
      const { token } = response.data;
      if (!token || !username) throw new Error();
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      showNotification("success", "Username set successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      showNotification("error", "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  }, [username, credential, access_token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-4">
        <div className="rounded-xl bg-gray-800/50 p-8 shadow-2xl backdrop-blur-sm border border-gray-700/50">
          <div className="mb-8 flex justify-center">
            <div className="animate-fade-in">
              <SquadXLogo size="md" />
            </div>
          </div>
          
          <h1 className="mb-2 text-center text-2xl font-bold text-white">
            Welcome to SquadX
          </h1>
          <p className="mb-8 text-center text-gray-400">
            Choose a unique username to get started
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-600/50 bg-gray-700/50 p-4 pl-12 pr-12 text-base text-white 
                         placeholder-gray-400 transition-colors duration-200
                         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-gradient-to-r from-blue-600 to-purple-700 p-2.5 
                         text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:hover:scale-100"
              >
                <ArrowRight className={`h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Your username will be visible to other users
          </p>
        </div>

        {notification && (
          <div
            className={`fixed bottom-6 right-6 flex items-center gap-3 rounded-lg p-4 text-white shadow-lg
              ${notification.type === "error" ? "bg-red-600" : "bg-green-600"}
              animate-slide-in-right`}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              {notification.message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
