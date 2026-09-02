import axios from "axios";
import {
	useState,
	useContext,
	useEffect,
	type ChangeEvent,
	type SyntheticEvent
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import {
	buscar,
	cadastrar,
	atualizar
} from "../../../services/Service";

interface FormProdutoProps {
	fecharModal?: () => void;
}

function FormProduto({ fecharModal }: FormProdutoProps) {

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

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (token === "") {
			toast.error("Você precisa estar logado!");
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		if (token !== "") {
			buscarCategorias();
		}
	}, [token]);

	useEffect(() => {
		if (id !== undefined && token !== "") {
			buscarProdutoPorId();
		}
	}, [id, token]);

	async function buscarCategorias() {

		try {

			await buscar("/categorias", setCategorias, {
				headers: {
					Authorization: token
				}
			});

		} catch (error) {

			if (axios.isAxiosError(error)) {

				toast.error(
					`Erro ao consultar as categorias: ${error.response?.status}`
				);

				if (error.response?.status === 401) {
					handleLogout();
				}
			}
		}
	}

	async function buscarProdutoPorId() {

		setIsLoading(true);

		try {

			await buscar(`/produtos/${id}`, setProduto, {
				headers: {
					Authorization: token
				}
			});

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

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

		setProduto({
			...produto,
			[e.target.name]: e.target.value
		});
	}

	function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {

		const categoriaSelecionada = categorias.find(
			(categoria) => categoria.id === Number(e.target.value)
		);

		setProduto({
			...produto,
			categoria: categoriaSelecionada ?? null
		});
	}

	async function gerarNovoProduto(e: SyntheticEvent<HTMLFormElement>) {

		e.preventDefault();

		setIsLoading(true);

		try {

			if (id !== undefined) {

				await atualizar(
					"/produtos",
					produto,
					setProduto,
					{
						headers: {
							Authorization: token
						}
					}
				);

				toast.success("Produto atualizado com sucesso!");

			} else {

				await cadastrar(
					"/produtos",
					produto,
					setProduto,
					{
						headers: {
							Authorization: token
						}
					}
				);

				toast.success("Produto cadastrado com sucesso!");
			}

			if (fecharModal) {
				fecharModal();
			} else {
				navigate("/produtos");
			}

		} catch (error) {

			if (axios.isAxiosError(error)) {

				toast.error(
					`Erro ao ${id !== undefined ? "atualizar" : "cadastrar"} o produto: ${error.response?.status}`
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

		if (fecharModal) {
			fecharModal();
		} else {
			navigate("/produtos");
		}
	}

	return (
		<div className="w-full bg-purple-100">

			<div className="container mx-auto flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">

				<h1 className="mb-6 text-center text-3xl font-bold text-purple-950 md:text-4xl">
					{id === undefined ? "Cadastrar Produto" : "Editar Produto"}
				</h1>

				<form
					className="flex w-full max-w-lg flex-col gap-5 rounded-3xl border border-purple-300 bg-white p-6 shadow-lg sm:p-8"
					onSubmit={gerarNovoProduto}
				>

					<div className="flex flex-col gap-2">

						<label
							htmlFor="nome"
							className="text-sm font-semibold text-purple-900 md:text-base"
						>
							Nome do Produto
						</label>

						<input
							type="text"
							placeholder="Insira aqui o nome do Produto"
							name="nome"
							id="nome"
							required
							value={produto.nome}
							onChange={atualizarEstado}
							className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-base text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
						/>

					</div>

					<div className="flex flex-col gap-2">

						<label
							htmlFor="preco"
							className="text-sm font-semibold text-purple-900 md:text-base"
						>
							Preço (R$)
						</label>

						<NumericFormat
							id="preco"
							name="preco"
							thousandSeparator="."
							decimalSeparator=","
							decimalScale={2}
							fixedDecimalScale
							allowNegative={false}
							prefix="R$ "
							value={produto.preco || ""}
							onValueChange={(values) => {
								setProduto({
									...produto,
									preco: values.floatValue ?? 0
								});
							}}
							className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-base text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
							placeholder="R$ 0,00"
						/>

					</div>

					<div className="flex flex-col gap-2">

						<label
							htmlFor="foto"
							className="text-sm font-semibold text-purple-900 md:text-base"
						>
							Foto do Produto
						</label>

						<input
							type="text"
							placeholder="Adicione aqui a URL da foto do Produto"
							name="foto"
							id="foto"
							required
							value={produto.foto}
							onChange={atualizarEstado}
							className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-base text-purple-950 outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
						/>

					</div>

					<div className="flex flex-col gap-2">

						<label
							htmlFor="categoria"
							className="text-sm font-semibold text-purple-900 md:text-base"
						>
							Categoria do Produto
						</label>

						<select
							name="categoria"
							id="categoria"
							required
							value={produto.categoria?.id ?? ""}
							onChange={atualizarCategoria}
							className="w-full rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-3 text-base text-purple-950 outline-none transition duration-300 focus:border-purple-400"
						>

							<option value="" disabled>
								Selecione uma Categoria
							</option>

							{categorias.map((categoria) => (
								<option
									key={categoria.id}
									value={categoria.id}
								>
									{categoria.tipo}
								</option>
							))}

						</select>

					</div>

					<div className="flex gap-3">

						<button
							className="flex w-full items-center justify-center rounded-xl bg-purple-700 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 active:scale-95 md:text-base"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? (
								<ClipLoader
									color="#ffffff"
									size={24}
								/>
							) : (
								<span>
									{id === undefined
										? "Cadastrar"
										: "Atualizar"}
								</span>
							)}
						</button>

						<button
							type="button"
							className="flex w-full items-center justify-center rounded-xl bg-purple-100 py-3 text-sm font-medium text-purple-700 transition duration-300 hover:bg-purple-200 active:scale-95 md:text-base"
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

export default FormProduto;