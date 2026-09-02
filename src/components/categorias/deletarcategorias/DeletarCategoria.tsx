import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function DeletarCategoria() {

    // Objeto responsável redirecionar a categoria para uma outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados da categoria que será deletada no Backend (API)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Consumo da Context para obter os dados do usuário autenticado (estado usuario)
    // e a função handleLogout para efetuar logout caso o token seja inválido
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Acessar o parâmetro da rota (id da categoria)
    const { id } = useParams<{ id: string }>();

    // Função responsável por buscar uma categoria pelo ID no Backend (API)
    async function buscarCategoriaPorId() {

        setIsLoading(true);

        try {

            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Erro ao consultar a categoria: ${error.response?.status}`);
                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
            return;
        } finally {
            setIsLoading(false);
        }

    }

    // useEffect para monitorar o id (parâmetro da rota)
    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId();
        }
    }, [id])


    // useEffect para monitorar o token
    useEffect(() => {
        if (token === '') {
            toast.error("Você precisa estar logado!");
            navigate('/');
        }
    }, [token])

    // Função responsável por deletar uma categoria pelo ID no Backend (API)
    async function deletarCategoria() {

        setIsLoading(true);

        try {

            await deletar(`/categorias/${id}`, {
                headers: { Authorization: token }
            })

            toast.success('Categoria deletada com sucesso!')

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Erro ao deletar a categoria: ${error.response?.status}`);
                if (error.response?.status === 401) {
                    handleLogout();
                }
            }
        } finally {
            setIsLoading(false);
        }

        retornar();
    }

    function retornar() {
        navigate("/categorias");
    }

    return (
    <div className="w-full bg-purple-100">
        <div className="container mx-auto flex min-h-[70vh] w-full max-w-md flex-col px-4 py-10 md:py-12">

            <h1 className="mb-4 text-center text-3xl font-bold text-purple-950 md:text-4xl">
                Deletar Categoria
            </h1>

            <p className="mb-6 text-center text-base font-semibold text-purple-800 md:text-lg">
                Você tem certeza de que deseja apagar a categoria a seguir?
            </p>

            <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-300 bg-white shadow-lg">

                <header className="bg-purple-950 px-6 py-3 text-xl font-semibold text-white md:text-2xl">
                    Categoria
                </header>

                <p className="h-full bg-white p-6 text-center text-2xl font-semibold text-purple-950 md:p-8 md:text-3xl">
                    {categoria.tipo}
                </p>

                <div className="flex gap-2 bg-white p-3">

                    <button
                        className="w-full rounded-xl bg-purple-100 py-2 text-sm font-medium text-purple-700 transition duration-300 hover:bg-purple-200 md:text-base"
                        onClick={retornar}
                    >
                        Não
                    </button>

                    <button
                        className="flex w-full items-center justify-center rounded-xl bg-purple-700 py-2 text-sm font-medium text-purple-100 transition duration-300 hover:bg-red-500 hover:text-white md:text-base"
                        onClick={deletarCategoria}
                    >
                        {
                            isLoading ? (
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                            ) : (
                                <span>Sim</span>
                            )
                        }
                    </button>

                </div>

            </div>
        </div>
    </div>
)
}

export default DeletarCategoria