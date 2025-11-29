import { use, useEffect } from "react";

export default function TestBackend(){
    useEffect(() => {
        fetch("http://localhost:3500/ping")
        .then(res => res.json())
        .then(data => console.log("backend respondeu", JSON.stringify(data, null, 2)))
        .catch(err => console.error("Erro ao conectar:", err));
    }, []);

    return<h1>Testando conexão com o backend, da uma olhada no console</h1>
}