import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true); // Set loading state to true during login attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to the home page or any other desired location
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }

    setIsLoading(false); // Reset loading state after login attempt
  };

  return (
    <section className="bg-slate-900 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md w-full">
          <div className='flex items-center justify-center'>
            <img className='animate-bounce inline w-16 h-16' src="/src/assets/logo.png" alt="Logo" />
          </div>
          <h1 className="mb-8 text-3xl text-center text-black">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              className="block border-b border-gray-200 w-full p-3 rounded mb-4 outline-none"
              placeholder="Email"
              required
            />

            <input
              type="password"
              id="password"
              className="outline-none block border-b border-gray-200 w-full p-3 rounded mb-4 text-black"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className={`w-full text-center py-3 rounded bg-blue-500 text-white focus:outline-none my-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
          {error && <span className='text-red-500 text-xs mb-4'>{error}</span>}
        </div>

        <div className="text-gray-600 mt-6">
          Don't have an account?
          <span className="no-underline border-b border-blue text-blue-400 m-1 hover:border-none hover:text-blue-600 hover:border-blue-500">
            <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;
