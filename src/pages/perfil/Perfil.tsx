import { UserIcon, PencilIcon } from "@phosphor-icons/react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function Perfil() {

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            toast.info("Você precisa estar logado!");
            navigate("/");
        }
    }, [token]);

    return (
        <div className="w-full bg-purple-100 py-8">

            <div className="container mx-auto max-w-5xl overflow-hidden rounded-2xl px-4">

                <img
                    className="mt-4 h-40 w-full rounded-t-2xl border-b-8 border-white object-cover sm:h-56 md:h-72"
                    src="https://i.imgur.com/6C49BZQ.jpg"
                    alt="Capa do Perfil"
                />

                <div className="relative z-10 mx-auto -mt-12 flex h-28 w-28 items-center justify-center rounded-full border-2 border-purple-400 bg-purple-200 sm:-mt-35 sm:h-40 sm:w-40 md:-mt-50 md:h-56 md:w-56">
                    {usuario.foto ? (
                        <img
                            src={usuario.foto}
                            alt={`Foto de perfil de ${usuario.nome}`}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <UserIcon
                            size={64}
                            weight="bold"
                            className="text-purple-700"
                        />
                    )}
                </div>

                <div className="relative -mt-6 mb-4 flex min-h-64 flex-col items-center justify-center gap-2 rounded-b-2xl bg-purple-950 px-4 py-8 text-center text-white sm:-mt-8 md:-mt-10">

                    <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                        {usuario.nome}
                    </h1>

                    <p className="text-base text-purple-300 sm:text-lg">
                        {usuario.usuario}
                    </p>

                    <Link
                        to="/atualizarusuario"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 sm:w-auto sm:text-base"
                    >
                        <PencilIcon size={20} weight="bold" />
                        Editar Perfil
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Perfil;