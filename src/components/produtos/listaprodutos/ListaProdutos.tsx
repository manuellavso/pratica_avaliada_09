import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListaProdutos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {

        if (token === '') {
            toast.error('Você precisa estar logado!');
            navigate('/');
        }

    }, [token]);

    useEffect(() => {

        if (token !== '') {
            buscarProdutos();
        }

    }, [token]);

    async function buscarProdutos() {

        try {

            setIsLoading(true);

            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: token
                }
            });

        } catch (error) {

            if (axios.isAxiosError(error) && error.response?.status === 401) {

                toast.error(
                    `Erro ao consultar os produtos: ${error.response.status}`
                );

                handleLogout();
            }

        } finally {

            setIsLoading(false);

        }
    }

    return (
        <>
            <div className="w-full min-h-screen bg-purple-100">
                <div className="flex justify-center bg-purple-100 py-8">

                    <div className="container flex flex-col m-2 md:my-0">

                        <div className="flex items-center justify-between mb-6 px-2 md:px-4">

                            <h1 className="text-3xl font-bold text-purple-950 md:text-4xl">
                                Produtos
                            </h1>

                        </div>

                        {isLoading && (
                            <div className="flex justify-center py-10">
                                <SyncLoader
                                    color="#6b21a8"
                                    size={12}
                                />
                            </div>
                        )}

                        {!isLoading && produtos.length === 0 && (
                            <div className="flex justify-center py-16">

                                <span className="text-center text-2xl font-semibold text-purple-950 md:text-3xl">
                                    Nenhum produto foi encontrado!
                                </span>

                            </div>
                        )}

                        {!isLoading && produtos.length > 0 && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-4 p-2 md:p-4">

                                {produtos.map((produto) => (
                                    <CardProdutos
                                        key={produto.id}
                                        produto={produto}
                                    />
                                ))}

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default ListaProdutos