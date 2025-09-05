import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const validate = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    try {
      const authuser = await axios.post("https://carbackend-1g9v.onrender.com/admin/login", {
        email,
        password,
      });

     
      if(authuser.status ==200){
      setModalTitle("Authentication");
      setModalMessage(authuser.data.message);
      setModalOpen(true);
       localStorage.setItem("token", authuser.data.token);
      

      }else if (authuser.status == 400) {
         setModalTitle("Authentication");
      setModalMessage(authuser.data.message);
      setModalOpen(true);
      }
      else if (authuser.status == 401) {
         setModalTitle("Authentication");
      setModalMessage(authuser.data.message);
      setModalOpen(true);
      }
     


    } catch (err) {
      const message = err.response?.data?.message ;
      setModalTitle("Error");
      setModalMessage(message);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Modal */}
      {modalOpen && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          onClose={() => setModalOpen(false)}
        />
      )}

      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/download.png"
            alt="Your brand"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-2 pr-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
<div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-500">
              Forgot your password?
            </a>
          </div>
          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 text-white bg-sky-600 hover:bg-sky-700 rounded-md disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Forgot Password?{" "}
          <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
            Reset Password
          </a>
        </p>
      </div>
    </div>
  );
}





