import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, type SyntheticEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";


function Cadastro() {

	// Const que utiliza o hook useNavigate, com ela conseguimos redirecionar o usuário para outras páginas da aplicação.
	const navigate = useNavigate();

	// Utiliza o hook useState. Esse estado controla a exibição do loader. 
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado confirmar senha,que guarda o texto digitado no campo Confirmar Senha do form.
	const [confirmarSenha, setConfirmarSenha] = useState<string>("");

	// Estado usuario, que guarda todas as informações digitadas no form e será enviado ao backend.
	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
		dataNascimento: ''
	})

	// Tratar do efeito colateral do sucesso do cadastro(redirecionar para a página de login)
	useEffect(() => {
		if (usuario.id !== 0) {
			retornar();
		}
	}, [usuario])

	// Atualiza o estado do usuário conforme o usuário digita nos campos do forms.
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	// Função que atualiza o estado confirmarSenha sempre que o usuário digitar no campo de confirmação.
	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value)
	}


	// Gerencia todo o processo de cadastro de novo usuário
	async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

		// Impede o envio automático do formulário
		e.preventDefault();

		// Verificação de idade
		if(!usuario.dataNascimento) {
			toast.error("Informe sua data de nascimento!")
			return
		}

		const nascimento = dayjs(usuario.dataNascimento)
		const idade = dayjs().diff(nascimento, "year")

		if(idade < 18) {
			toast.error("Para acessar esse site, você deve ter mais de 18 anos!")
			return;
		}
	

		// Validação da senha digitada
		if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
			toast.error("Senhas não conferem e/ou possuem menos que 8 caracteres.")
			setUsuario({ ...usuario, senha: '' });
			setConfirmarSenha('');
			return;
		}

		setIsLoading(true);

		// Envio da requisição
		try {
			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
			toast.success("Usuário cadastrado com sucesso!")

		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(`Erro ao cadastrar o usuário: ${error.response.status}`);
			} else {
				toast.error("Erro ao cadastrar o usuário! Verifique a conexão com a API.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	// Função que redireciona para a página de Login.
	function retornar() {
		navigate('/')
	}

	return (
		<>
			<div className="grid min-h-screen grid-cols-1 bg-purple-950 lg:grid-cols-2">

				<div
					className="hidden min-h-screen bg-cover bg-center bg-no-repeat lg:block"
					style={{
						backgroundImage: "url('https://ik.imagekit.io/vzr6ryejm/games/fundo_03.jpg?updatedAt=1714988179386')"
					}}
				></div>

				<form
					className="flex w-full max-w-md flex-col items-center justify-center gap-4 justify-self-center px-6 py-10 sm:px-5"
					onSubmit={cadastrarNovoUsuario}
				>

					<div className="w-full rounded-3xl border border-purple-800 bg-purple-900 px-6 py-8 shadow-2xl sm:px-8">

						<h2 className="font-[Fredoka] mb-6 text-center text-4xl font-bold text-purple-300 sm:text-5xl">
							Cadastrar
						</h2>

						<div className="mb-4 flex w-full flex-col gap-2">
							<label
								htmlFor="nome"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Nome
							</label>

							<input
								type="text"
								id="nome"
								name="nome"
								placeholder="Nome"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								required
								value={usuario.nome}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div className="mb-4 flex w-full flex-col gap-2">
							<label
								htmlFor="usuario"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Usuario
							</label>

							<input
								type="email"
								id="usuario"
								name="usuario"
								placeholder="Usuario"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								required
								value={usuario.usuario}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div className="mb-4 flex w-full flex-col gap-2">
							<label
								htmlFor="foto"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Foto (URL){" "}
								<span className="font-normal text-purple-400">
									opcional
								</span>
							</label>

							<input
								id="foto"
								name="foto"
								type="text"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								placeholder="https://..."
								value={usuario.foto}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div className="mb-4 flex w-full flex-col gap-2">
							<label
								htmlFor="dataNascimento"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Data de Nascimento
							</label>

							<input
								type="date"
								id="dataNascimento"
								name="dataNascimento"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 focus:border-purple-400"
								required
								value={usuario.dataNascimento}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div className="mb-4 flex w-full flex-col gap-2">
							<label
								htmlFor="senha"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Senha
							</label>

							<input
								type="password"
								id="senha"
								name="senha"
								placeholder="Senha"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								required
								value={usuario.senha}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div className="mb-6 flex w-full flex-col gap-2">
							<label
								htmlFor="confirmarSenha"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Confirmar Senha
							</label>

							<input
								type="password"
								id="confirmarSenha"
								name="confirmarSenha"
								placeholder="Confirmar Senha"
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								value={confirmarSenha}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
							/>
						</div>

						<div className="font-[Fredoka] flex w-full flex-col justify-around gap-3 sm:flex-row sm:gap-4">

							<button
								type="button"
								className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition duration-300 hover:bg-red-500 active:scale-95 sm:w-1/2"
								onClick={retornar}
							>
								Cancelar
							</button>

							<button
								type="submit"
								className="flex w-full justify-center rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-500 hover:shadow-xl active:scale-95 sm:w-1/2"
							>
								{
									isLoading ? (
										<ClipLoader
											color="#ffffff"
											size={24}
										/>
									) : (
										<span>Cadastrar</span>
									)
								}
							</button>

						</div>

					</div>

				</form>
			</div>
		</>
	)
}

export default Cadastro