import axios from "axios";
import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function FormCategoria() {

  // Objeto responsável redirecionar a categoria para uma outra rota
  const navigate = useNavigate();

  // Estado responsável por controlar o loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado responsável por armazenar os dados da categoria que será persistido no Backend (API)
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
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error(`Erro ao consultar a categoria: ${error.response.status}`);
        handleLogout();
      }
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

  // Função responsável por atualizar o estado categoria
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    })
  }

  // Função responsável por enviar uma requisição do tipo POST ou PUT
  // com os dados da categoria (estado categoria)
  async function gerarNovaCategoria(e: SyntheticEvent<HTMLFormElement>) {

    // Impede o envio automático do formulário
    e.preventDefault();

    setIsLoading(true);

    if (id !== undefined) {

      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token }
        });
        toast.success("Categoria atualizada com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Erro ao atualizar a categoria: ${error.response?.status}`);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
        return;
      } finally {
        setIsLoading(false);
      }

    } else {

      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token }
        });
        toast.success("Categoria cadastrada com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Erro ao cadastrar a categoria: ${error.response?.status}`);
          if (error.response?.status === 401) {
            handleLogout();
          }
        }
        return;
      } finally {
        setIsLoading(false);
      }

    }

    retornar();

  }

  function retornar() {
    navigate("/categorias");
  }

 return (
    <div className="w-full bg-purple-100">
        <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-10">

            <h1 className="mb-8 text-center text-3xl font-bold text-purple-950 md:text-4xl">
                {id === undefined ? 'Cadastrar' : 'Editar'} Categoria
            </h1>

            <form
                className="w-full max-w-md rounded-3xl border border-purple-300 bg-white p-6 shadow-lg sm:p-8"
                onSubmit={gerarNovaCategoria}
            >

                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="tipo"
                        className="text-sm font-semibold text-purple-900 md:text-base"
                    >
                        Categoria
                    </label>

                    <input
                        type="text"
                        placeholder="Categoria"
                        id="tipo"
                        name="tipo"
                        className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-base text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400 md:text-lg"
                        required
                        value={categoria.tipo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />

                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                    <button
                        className="flex w-full justify-center rounded-xl bg-purple-700 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 active:scale-95 md:text-base"
                        type="submit"
                    >
                        {
                            isLoading ? (
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                            ) : (
                                <span>
                                    {id === undefined ? 'Cadastrar Categoria' : 'Atualizar Categoria'}
                                </span>
                            )
                        }
                    </button>

                    <button
                        type="button"
                        className="flex w-full justify-center rounded-xl bg-purple-100 py-3 text-sm font-medium text-purple-700 transition duration-300 hover:bg-purple-200 active:scale-95 md:text-base"
                        onClick={retornar}
                    >
                        Cancelar
                    </button>

                </div>

            </form>
        </div>
    </div>
);
}

export default FormCategoria;