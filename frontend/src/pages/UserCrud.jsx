import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const universidadesDF = [
  "UnB - Universidade de Brasília",
  "UniCEUB",
  "UCB - Católica de Brasília",
  "IESB",
  "UNIP",
  "Estácio",
  "Faculdade Projeção",
  "Outra"
];



const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmSenha: "",
    nome: "",
    universidade: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("mockUsers");
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  // Salva automaticamente (mock)
  const saveLocal = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("mockUsers", JSON.stringify(newUsers));
  };

  // Envio
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editingUser && form.senha !== form.confirmSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (editingUser) {
      // Atualizar
      const updated = users.map((u) =>
        u.id === editingUser.id ? { ...editingUser, ...form } : u
      );

      saveLocal(updated);

      toast.success("Usuário atualizado!");
      setEditingUser(null);
    } else {
      // Criar
      const newUser = {
        id: crypto.randomUUID(),
        email: form.email,
        nome: form.nome,
        universidade: form.universidade,
      };

      saveLocal([...users, newUser]);
      toast.success("Usuário criado!");
    }

    setForm({
      email: "",
      senha: "",
      confirmSenha: "",
      nome: "",
      universidade: "",
    });
  };

  // Excluir
  const handleDelete = (id) => {
    if (!window.confirm("Deseja remover este usuário?")) return;

    const updated = users.filter((u) => u.id !== id);
    saveLocal(updated);

    toast.success("Usuário removido.");
  };

  // Editar
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      email: user.email,
      senha: "",
      confirmSenha: "",
      nome: user.nome,
      universidade: user.universidade,
    });
  };

  return (
    
    <div className="min-h-screen">
    <header className='bg-base-300 border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                        Kya - Know Your Activites
                    </h1>
              </div>
            </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 mt-6">
        
        <h1 className="text-2xl font-bold mb-4">Cadastro de Usuários</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="shadow p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-3">
            {editingUser ? "Editar Usuário" : "Novo Usuário"}
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="border rounded p-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Nome"
              className="border rounded p-2"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />

            {!editingUser && (
              <>
                <input
                  type="password"
                  placeholder="Senha"
                  className="border rounded p-2"
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  required
                />

                <input
                  type="password"
                  placeholder="Confirmar senha"
                  className="border rounded p-2"
                  value={form.confirmSenha}
                  onChange={(e) =>
                    setForm({ ...form, confirmSenha: e.target.value })
                  }
                  required
                />
              </>
            )}


            <select
              className="border rounded p-2 bg-gray-800 text-white"
              value={form.universidade}
              onChange={(e) => setForm({ ...form, universidade: e.target.value })}
              required
            >
              <option value="">Selecione uma universidade</option>

              {universidadesDF.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>

            {form.universidade === "Outra" && (
              <input
                type="text"
                placeholder="Digite o nome da universidade"
                className="border rounded p-2 mt-2"
                value={form.universidadeOutro || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    universidadeOutro: e.target.value,
                  })
                }
                required
              />
            )}

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {editingUser ? "Salvar Alterações" : "Criar Usuário"}
            </button>

            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setForm({
                    email: "",
                    senha: "",
                    confirmSenha: "",
                    nome: "",
                    universidade: "",
                  });
                }}
                className="underline text-gray-500 mt-2"
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default UsersPage;