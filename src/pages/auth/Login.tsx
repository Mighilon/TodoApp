import { useState, useEffect } from "react";
import {
  AuthCard,
  InputField,
  PrimaryButton,
} from "./../../components/AuthCard.tsx";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import { useAuth } from "../../components/AuthContext";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("handleLogin");

    setLoading(true);
    setError("");
    console.log("handleLogin-2");

    try {
      console.log("wait for api");
      const user = await authApi.login({ username, password });
      console.log("received");
      setUser(user);
      navigate("/board");
    } catch (err: any) {
      // setError(err.message || "Login failed. Check your credentials.");
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back."
      subtitle="Sign in to pick up where you left off."
    >
      <InputField
        label="Username"
        placeholder="Username"
        value={username}
        onChange={setUsername}
        delay={100}
        visible={visible}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        delay={200}
        visible={visible}
      />

      {error && (
        <p className="mb-4 text-xs text-red-400 text-center">{error}</p>
      )}

      <div
        className="flex justify-end mb-6 -mt-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.6s ease 300ms`,
        }}
      >
        <button
          className="text-xs text-[#3aa5cc] hover:text-[#2a8fb5] hover:underline transition-colors duration-150"
          onClick={() => navigate("/recover")}
        >
          Forgot password?
        </button>
      </div>

      <PrimaryButton
        label={loading ? "Logging in…" : "Login"}
        delay={350}
        visible={visible}
        onClick={handleLogin}
      />

      <div
        className="mt-5 text-center text-xs text-[#4a7a8a]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 450ms",
        }}
      >
        Don't have an account?{" "}
        <button
          className="text-[#3aa5cc] font-semibold hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </AuthCard>
  );
}
