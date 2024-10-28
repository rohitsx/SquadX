import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "@/assets/img/bg.mp4";
import logo from "@/assets/img/btc.png";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Calendar,
  X,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

interface FormData {
  dob: string;
  gender: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

interface Step {
  title: string;
  description: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notification, setNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState<FormData>({
    dob: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    if (step === 3 && !validateForm()) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = (): void => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/signup",
          formData,
        );

        if (response.data === "Signup successful, please login") {
          showNotification(
            "success",
            "Registration successful! Redirecting to login...",
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (response.data === "User already exists, please login") {
          showNotification(
            "error",
            "User already exists. Please login instead.",
          );
        }
      } catch (err) {
        showNotification("error", "An error occurred during registration.");
      }
    }
  };

  const steps: Step[] = [
    { title: "Birthday", description: "When were you born?" },
    { title: "Identity", description: "Tell us about yourself" },
    { title: "Account", description: "Create your credentials" },
  ];

  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div className="fixed top-4 right-4 z-50 w-96 transition-all duration-500 ease-in-out">
        <Alert
          className={`${notification.type === "success" ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <AlertTitle
                className={
                  notification.type === "success"
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {notification.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription className="text-neutral-300">
                {notification.message}
              </AlertDescription>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </Alert>
      </div>
    );
  };

  const renderProgressBar = () => (
    <div className="mb-8 relative">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-neutral-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between pt-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center transition-all duration-500
              ${i + 1 <= step ? "opacity-100" : "opacity-50"}`}
          >
            <div
              className={`h-3 w-3 rounded-full transition-all duration-500 mb-3
                ${
                  i + 1 < step
                    ? "bg-emerald-500 scale-75"
                    : i + 1 === step
                      ? "bg-emerald-500 scale-100 ring-4 ring-emerald-500/20"
                      : "bg-neutral-800"
                }`}
            />
            <div
              className={`text-xs font-medium transition-all duration-300 transform
              ${i + 1 === step ? "text-emerald-500 translate-y-0 opacity-100" : "text-neutral-400 -translate-y-1 opacity-0"}`}
            >
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    const commonInputClasses = `
      w-full pl-12 pr-4 py-3 bg-black/50 rounded-xl border border-neutral-800 
      focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 
      transition-all placeholder:text-neutral-600 text-white
    `;

    const errorClasses = "text-red-400 text-xs mt-1";
    const fadeClass = "transition-all duration-500";

    switch (step) {
      case 1:
        return (
          <div className={`space-y-6 ${fadeClass}`}>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={commonInputClasses}
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={`space-y-6 ${fadeClass}`}>
            <div className="grid grid-cols-3 gap-4">
              {["Male", "Female", "Other"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`p-4 rounded-xl border transform transition-all duration-300 hover:scale-105
                    ${
                      formData.gender === gender
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-neutral-800 hover:border-emerald-500/50 hover:bg-black/50"
                    }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className={`grid gap-3 ${fadeClass}`}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${commonInputClasses} ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email address"
                required
              />
              {errors.email && (
                <div className={errorClasses}>{errors.email}</div>
              )}
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`${commonInputClasses} ${errors.username ? "border-red-500" : ""}`}
                placeholder="Username"
                required
              />
              {errors.username && (
                <div className={errorClasses}>{errors.username}</div>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${commonInputClasses} pr-12 ${errors.password ? "border-red-500" : ""}`}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <div className={errorClasses}>{errors.password}</div>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${commonInputClasses} ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder="Confirm password"
                required
              />
              {errors.confirmPassword && (
                <div className={errorClasses}>{errors.confirmPassword}</div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {renderNotification()}

      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          src={bgVideo}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <div className="text-white">criminal.lol</div>
          </a>
        </div>

        {renderProgressBar()}

        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-neutral-800/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-white">
                {steps[step - 1].title}
              </h2>
              <p className="text-sm text-neutral-400">
                {steps[step - 1].description}
              </p>
            </div>

            <div className="py-4">{renderStep()}</div>

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 text-sm text-neutral-400 hover:text-white transition-all duration-300 group"
                >
                  <ArrowLeft
                    size={16}
                    className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                  />
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center ml-auto px-6 py-2 bg-emerald-500 rounded-xl hover:bg-emerald-600 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 group"
                >
                  Next
                  <ArrowRight
                    size={16}
                    className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center ml-auto px-6 py-2 bg-emerald-500 rounded-xl hover:bg-emerald-600 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-neutral-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
