import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: branding */}
      <div className="hidden md:flex md:w-1/2 bg-surface flex-col justify-between p-12 border-r border-border">
        <div>
          <h1 className="font-display text-2xl text-text">Ledger</h1>
        </div>
        <div>
          <p className="font-display text-4xl leading-tight text-text mb-4">
            Every rupee,<br />accounted for.
          </p>
          <p className="text-text-muted max-w-sm">
            Track income and expenses in one place, with a clear picture of where your money goes.
          </p>
        </div>
        <p className="text-text-muted text-sm">A personal finance ledger.</p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl text-text mb-1">Welcome back</h2>
          <p className="text-text-muted mb-8">Log in to your ledger.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-negative text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-bg font-medium rounded-lg py-2.5 transition"
            >
              Log in
            </button>
          </form>

          <p className="text-text-muted text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:text-accent-hover">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;