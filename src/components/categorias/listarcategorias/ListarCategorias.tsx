import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategorias from "../cardcategorias/CardCategorias";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

function ListarCategorias() {

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const { usuario, handleLogout } = useContext(AuthContext);

	const token = usuario.token;

	// UseEffect responsável para monitorar o token
	useEffect(() => {
		if (token === '') {
			toast.error('Você precisa estar logado!');
			navigate('/');
		}
	}, [token]);

	// useEffect responsável por executar a função buscarCategorias
	useEffect(() => {
		buscarCategorias();
	}, []);

	// Função responsavel por buscar todas as categorias do backend (api)
	async function buscarCategorias() {
		try {
			setIsLoading(true);

			await buscar('/categorias', setCategorias, {
				headers: { Authorization: token }
			})
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error(`Erro ao consultar as categorias: ${error.response.status}`);
				handleLogout();
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (

		<div className="w-full bg-purple-100">

			<div className="container mx-auto w-full px-4 py-10 sm:px-6 md:px-8 lg:px-12">

				{isLoading && (
					<div className="flex justify-center py-10">
						<SyncLoader
							color="#312e81"
							size={12}
						/>
					</div>
				)}

				{(!isLoading && categorias.length === 0) && (
					<div className="flex justify-center py-16">
						<span className="text-center text-2xl font-semibold text-purple-950 md:text-3xl">
							Nenhuma Categoria foi encontrada!
						</span>
					</div>
				)}

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

					{
						categorias.map((categoria) => (
							<CardCategorias
								key={categoria.id}
								categoria={categoria}
							/>
						))
					}

				</div>

			</div>

		</div>
	)
}

export default ListarCategorias