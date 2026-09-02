import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";

function DeletarProduto() {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: "",
        preco: 0,
        foto: "",
        categoria: null
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (token === "") {
            toast.error("Você precisa estar logado!");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined && token !== "") {
            buscarProdutoPorId();
        }
    }, [id, token]);

    async function buscarProdutoPorId() {
        setIsLoading(true);

        try {
            await buscar(
                `/produtos/${id}`,
                setProduto,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao consultar o produto: ${error.response?.status}`
                );

                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function confirmarDeletar() {
        setIsLoading(true);

        try {
            await deletar(
                `/produtos/${id}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            toast.success("Produto deletado com sucesso!");
            navigate("/produtos");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao deletar o produto: ${error.response?.status}`
                );

                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    function retornar() {
        navigate("/produtos");
    }

    return (
        <div className="w-full min-h-screen bg-purple-100">
            <div className="w-full bg-purple-100">

                <div className="container mx-auto flex w-full max-w-md flex-col px-4 py-10">

                    <h1 className="mb-4 text-center text-3xl font-bold text-purple-950 md:text-4xl">
                        Deletar Produto
                    </h1>

                    <p className="mb-6 text-center text-base font-semibold text-purple-800 md:text-lg">
                        Você tem certeza de que deseja apagar o produto a seguir?
                    </p>

                    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-300 bg-white shadow-lg">

                        <header className="bg-purple-950 px-6 py-3 text-xl font-semibold text-white md:text-2xl">
                            Produto
                        </header>

                        <p className="h-full bg-white p-6 text-center text-2xl font-semibold text-purple-950 md:p-8 md:text-3xl">
                            {produto.nome}
                        </p>

                        <div className="flex gap-2 bg-white p-3">

                            <button
                                onClick={retornar}
                                className="w-full rounded-xl bg-purple-100 py-2 text-sm font-medium text-purple-700 transition duration-300 hover:bg-purple-200 md:text-base"
                                disabled={isLoading}
                            >
                                Não
                            </button>

                            <button
                                onClick={confirmarDeletar}
                                className="flex w-full items-center justify-center rounded-xl bg-purple-700 py-2 text-sm font-medium text-purple-100 transition duration-300 hover:bg-red-500 hover:text-white md:text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={22} />
                                ) : (
                                    <span>Sim</span>
                                )}
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default DeletarProduto