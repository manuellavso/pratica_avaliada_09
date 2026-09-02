import {
    type ChangeEvent,
    type SyntheticEvent,
    useContext,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar } from "../../services/Service";
import axios from "axios";
import type Usuario from "../../models/Usuario";
import { toast } from "react-toastify";

function AtualizarPerfil() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [user, setUser] = useState<Usuario>({} as Usuario);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const id: string = usuario.id.toString();

    async function buscarUsuarioPorId() {
        try {
            await buscar(
                `/usuarios/${id}`,
                setUser,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setUser((user) => ({
                ...user,
                senha: ""
            }));

            setConfirmarSenha("");

        } catch (error: any) {

            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                toast.error("Usuário não encontrado!");
                retornar();
            }
        }
    }

    useEffect(() => {

        if (token === "") {
            toast.info("Você precisa estar logado!");
            navigate("/");
        }

    }, [token]);

    useEffect(() => {

        setUser({} as Usuario);
        setConfirmarSenha("");
        setIsLoading(false);

    }, []);

    useEffect(() => {

        if (id !== undefined && token !== "") {
            buscarUsuarioPorId();
        }

    }, [id, token]);

    function retornar() {
        navigate("/perfil");
    }

    function sucesso() {
        handleLogout();
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        if (
            confirmarSenha !== user.senha ||
            user.senha.length < 8
        ) {
            toast.error("Senhas não conferem e/ou não possuem pelo menos 8 caracteres");

            setUser({
                ...user,
                senha: ""
            });

            setConfirmarSenha("");

            return;
        }

        setIsLoading(true);

        try {

            await atualizar(
                `/usuarios/atualizar`,
                user,
                setUser,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            toast.success("Usuário atualizado com sucesso! Efetue o Login Novamente!");

            sucesso();

        } catch (error) {

            if (axios.isAxiosError(error)) {

                toast.error(`Erro ao atualizar o usuário (${error.response?.status})`);

                return;
            }

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full bg-purple-100 py-8">

            <div className="container mx-auto max-w-5xl px-4">

                <div className="overflow-hidden rounded-3xl border border-purple-300 bg-white shadow-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="flex flex-col items-center justify-center bg-purple-950 p-8">

                            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-8 border-purple-700 bg-purple-100 shadow-lg sm:h-48 sm:w-48">

                                {user.foto ? (
                                    <img
                                        src={user.foto}
                                        alt={user.nome}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-6xl">
                                        👤
                                    </span>
                                )}

                            </div>

                            <h2 className="mt-6 text-center text-2xl font-bold text-white">
                                {user.nome}
                            </h2>

                            <p className="mt-2 text-center text-sm text-purple-300 sm:text-base">
                                {user.usuario}
                            </p>

                        </div>

                        <div className="p-6 sm:p-8 md:p-10">

                            <h1 className="mb-7 text-center text-3xl font-bold text-purple-950 md:text-4xl">
                                Editar Perfil
                            </h1>

                            <form
                                onSubmit={atualizarUsuario}
                                className="flex flex-col gap-5"
                            >

                                <div className="flex flex-col gap-2">

                                    <label
                                        htmlFor="nome"
                                        className="text-sm font-semibold text-purple-900 md:text-base"
                                    >
                                        Nome
                                    </label>

                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
                                        value={user.nome || ""}
                                        onChange={atualizarEstado}
                                        required
                                    />

                                </div>

                                <div className="flex flex-col gap-2">

                                    <label
                                        htmlFor="usuario"
                                        className="text-sm font-semibold text-purple-900 md:text-base"
                                    >
                                        Usuário
                                    </label>

                                    <input
                                        type="email"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="Usuário"
                                        className="w-full cursor-not-allowed rounded-xl border-2 border-purple-200 bg-purple-100 px-4 py-3 text-purple-500 outline-none"
                                        disabled
                                        value={user.usuario || ""}
                                    />

                                </div>

                                <div className="flex flex-col gap-2">

                                    <label
                                        htmlFor="foto"
                                        className="text-sm font-semibold text-purple-900 md:text-base"
                                    >
                                        Foto
                                    </label>

                                    <input
                                        type="url"
                                        id="foto"
                                        name="foto"
                                        placeholder="URL da foto"
                                        className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
                                        value={user.foto || ""}
                                        onChange={atualizarEstado}
                                        required
                                    />

                                </div>

                                <div className="flex flex-col gap-2">

                                    <label
                                        htmlFor="senha"
                                        className="text-sm font-semibold text-purple-900 md:text-base"
                                    >
                                        Nova Senha
                                    </label>

                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Nova senha"
                                        className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
                                        value={user.senha || ""}
                                        onChange={atualizarEstado}
                                        required
                                        minLength={8}
                                    />

                                </div>

                                <div className="flex flex-col gap-2">

                                    <label
                                        htmlFor="confirmarSenha"
                                        className="text-sm font-semibold text-purple-900 md:text-base"
                                    >
                                        Confirmar Senha
                                    </label>

                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        placeholder="Confirme sua nova senha"
                                        className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
                                        value={confirmarSenha}
                                        onChange={handleConfirmarSenha}
                                        required
                                        minLength={8}
                                    />

                                </div>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center rounded-xl bg-purple-100 py-3 text-sm font-medium text-purple-700 transition duration-300 hover:bg-purple-200 active:scale-95 md:text-base"
                                        onClick={retornar}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-xl bg-purple-700 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 active:scale-95 md:text-base"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <ClipLoader
                                                color="#ffffff"
                                                size={24}
                                            />
                                        ) : (
                                            <span>Atualizar</span>
                                        )}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AtualizarPerfil;