import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-surface flex-col justify-between p-12 border-r border-border">
        <div>
          <h1 className="font-display text-2xl text-text">Ledger</h1>
        </div>
        <div>
          <p className="font-display text-4xl leading-tight text-text mb-4">
            Start keeping<br />the books.
          </p>
          <p className="text-text-muted max-w-sm">
            A few details and you're set up — no spreadsheets, no guesswork.
          </p>
        </div>
        <p className="text-text-muted text-sm">A personal finance ledger.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl text-text mb-1">Create your account</h2>
          <p className="text-text-muted mb-8">It takes less than a minute.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent outline-none transition"
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="text-negative text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-bg font-medium rounded-lg py-2.5 transition"
            >
              Register
            </button>
          </form>

          <p className="text-text-muted text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:text-accent-hover">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;