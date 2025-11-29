import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api.js";
import Navbar from "../components/Navbar.jsx";

const LoginPage = () => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [regional, setRegional] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", {
        accountName,
        password,
        regional
      });

      console.log("Login bem-sucedido:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login realizado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(error.response?.data?.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
      
    <div className="min-h-screen">
      <header className='bg-base-300 border-base-content'>
            <Navbar />
          </header>
      <div className="max-w-2xl mx-auto p-4 mt-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 rounded font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
