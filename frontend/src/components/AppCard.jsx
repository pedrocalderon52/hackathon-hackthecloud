import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util.js";

import api from "../api.js";
import toast from "react-hot-toast";

const AppCard = ({app, setApps}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if(!window.confirm("Tem certeza que você deseja excluir esta app?")) return;

        try {
            await api.delete(`/app/${id}`);
            setApps((prev) => prev.filter((app) => app._id !== id));
            toast.success("App deletado com sucesso!");
        } catch (error) {
            toast.error("Erro ao deletar o app");
            console.log(error)         
        }
    };

    return <Link to = {`/app/${app._id}`}
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
        <div className="card-body">
            <h3 className="card-title text-base-content">{app.name}</h3>
            <p className="text-base-contet/70 line-clamp-3">{app.token}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date(app.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,app._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>

    </Link>;
};

export default AppCard