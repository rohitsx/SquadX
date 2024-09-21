import AnimatedBackground from "../assets/background/background";

const LoginPage: React.FC = () => {
  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg w-80">
          <h1 className="text-white text-3xl mb-4 text-center">LOGIN</h1>
          <p className="text-gray-300 text-sm mb-4 text-center">Please enter your login details</p>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 text-sm mb-2">Username or Email</label>
              <input type="text" id="username" className="w-full bg-gray-800 text-white rounded p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 text-sm mb-2">Password</label>
              <input type="password" id="password" className="w-full bg-gray-800 text-white rounded p-2" />
            </div>
            <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white rounded p-2 mb-4">
              Login
            </button>
          </form>
          <div className="text-center">
            <a href="#" className="text-gray-300 text-sm hover:text-white">Forgot password?</a>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-300 text-sm">New User? </span>
            <a href="#" className="text-white text-sm hover:underline">Register</a>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default LoginPage;