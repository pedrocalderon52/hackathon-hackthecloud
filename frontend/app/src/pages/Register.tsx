import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

const Register = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        universidade: "",
        universidadeOutro: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, universidade: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmSenha) {
            toast.error("As senhas não coincidem!");
            return;
        }

        setLoading(true);

        try {
            // TODO: Implement actual registration logic here
            const finalUniversidade = formData.universidade === "Outra" ? formData.universidadeOutro : formData.universidade;

            console.log("Registration attempt:", { ...formData, universidade: finalUniversidade });

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Falha no cadastro. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Cadastro</CardTitle>
                    <CardDescription className="text-center">
                        Crie sua conta para começar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input
                                id="nome"
                                type="text"
                                placeholder="Seu nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="universidade">Universidade</Label>
                            <Select value={formData.universidade} onValueChange={handleSelectChange} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione sua universidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {universidadesDF.map((uni) => (
                                        <SelectItem key={uni} value={uni}>
                                            {uni}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.universidade === "Outra" && (
                            <div className="space-y-2">
                                <Label htmlFor="universidadeOutro">Nome da Universidade</Label>
                                <Input
                                    id="universidadeOutro"
                                    type="text"
                                    placeholder="Digite o nome da universidade"
                                    value={formData.universidadeOutro}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="senha">Senha</Label>
                            <Input
                                id="senha"
                                type="password"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmSenha">Confirmar Senha</Label>
                            <Input
                                id="confirmSenha"
                                type="password"
                                value={formData.confirmSenha}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="text-primary hover:underline">
                            Faça login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
