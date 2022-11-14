import React, { useState } from "react";
import { LoginWithEmailPassword } from "../services/supabaseService";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type EventSubmit = React.FormEvent<HTMLFormElement>;

function Login() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: InputEvent) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: EventSubmit) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await LoginWithEmailPassword(credentials);
      console.log(data);
      alert("Check your email for the login link!");
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto text-center w-72">
        <div className="col-6 form-widget" aria-live="polite">
          <h1 className="header text-3xl py-3 text-gray-600">Login in</h1>
          <p className="text-xs text-gray-500 pb-3">
            Sign in via magic link with your email below
          </p>
          {loading ? (
            "Sending magic link..."
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="your@email.com"
                value={credentials.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="your password"
                value={credentials.password}
                onChange={handleChange}
              />
              <button className="my-3 w-36 text-xs h-8 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700">
                Send magic link
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
