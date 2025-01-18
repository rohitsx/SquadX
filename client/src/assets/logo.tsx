import { Users } from "lucide-react";

interface SquadXLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const SquadXLogo = ({ size = "md", animated = true }: SquadXLogoProps) => {
  const sizeConfig = {
    sm: { container: "w-16 h-16", text: "text-xl", icon: 24 },
    md: { container: "w-24 h-24", text: "text-2xl", icon: 32 },
    lg: { container: "w-32 h-32", text: "text-3xl", icon: 40 },
  };

  return (
    <div className={`relative ${sizeConfig[size].container}`}>
      {/* Main circular background */}
      <div
        className={`
          absolute 
          inset-0 
          bg-gradient-to-br 
          from-blue-500 
          to-purple-600 
          rounded-full 
          shadow-lg
          ${animated ? "hover:scale-105 transition-transform duration-300" : ""}
        `}
      />

      {/* Inner content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Icon */}
        <Users
          className={`text-white mb-1 ${animated ? "animate-pulse" : ""}`}
          size={sizeConfig[size].icon}
        />

        {/* Text */}
        <div
          className={`
          font-bold 
          ${sizeConfig[size].text}
          text-white 
          tracking-wider
          ${animated ? "hover:tracking-widest transition-all duration-300" : ""}
        `}
        >
          SQUADX
        </div>
      </div>

      {/* Decorative orbital ring */}
      <div
        className={`
        absolute 
        inset-0 
        rounded-full 
        border-4 
        border-white/20
        ${animated ? "animate-spin-slow" : ""}
      `}
        style={{
          animationDuration: "8s",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
};

export default SquadXLogo;
