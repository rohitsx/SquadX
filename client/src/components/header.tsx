import { useState } from "react";
import logo from "../assets/img/btc.png";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-3 rounded-md" />
        <span className="font-bold text-2xl text-blue-400">VideoChat Pro</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center space-x-2 bg-gray-700 rounded-full py-2 px-4 hover:bg-gray-600 transition duration-200"
        >
          <img
            src={logo}
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-blue-400"
          />
          <span className="font-medium">
            {localStorage.getItem("username")}
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
        {isNavOpen && (
          <nav className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 z-10">
            {[
              { icon: User, text: "Profile" },
              { icon: Settings, text: "Settings" },
              { icon: HelpCircle, text: "Help" },
              { icon: LogOut, text: "Logout" },
            ].map(({ icon: Icon, text }) => (
              <a
                key={text}
                href="#"
                className="flex items-center px-4 py-2 hover:bg-gray-700 transition duration-200"
              >
                <Icon className="mr-3 text-blue-400" size={18} />
                <span className="text-sm font-medium">{text}</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
