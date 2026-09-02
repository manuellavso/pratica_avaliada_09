import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { ClipLoader } from "react-spinners";

function Login() {

	// Navegação entre páginas
	const navigate = useNavigate();

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	// Consumir os estados e funções da context (AuthContext), usando o hook useContext (Consumer)
	const { usuario, handleLogin, isLoading } = useContext(AuthContext);

	// Se o token for diferente de uma string vazia, significa que o backend retornou um token válido - caso contrário, login não foi realizado.
	useEffect(() => {
		if (usuario.token !== '') {
			navigate("/home");
		}
	}, [usuario])

	// Atualiza o estado usuarioLogin conforme o usuário digita nos campos do forms.
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		})
	}

	// Função que gerencia todo o processo de autenticação do usuário.
	function login(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	return (
		<>
			<div className="grid min-h-screen grid-cols-1 bg-purple-950 lg:grid-cols-2">

				{/* Formulário */}
				<div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">

					<form
						className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-purple-800 bg-purple-900 px-6 py-10 shadow-2xl sm:px-10"
						onSubmit={login}
					>

						{/* Título */}
						<div className="mb-3 text-center">

							<h2 className="font-[Fredoka] text-4xl font-bold text-purple-300 sm:text-5xl">
								Entrar
							</h2>

							<p className="mt-2 text-sm font-normal text-purple-300">
								Entre na sua conta e continue comprando!
							</p>

						</div>

						{/* Usuário */}
						<div className="flex w-full flex-col gap-2">

							<label
								htmlFor="usuario"
								className="font-[Fredoka] text-sm font-semibold text-purple-100"
							>
								Usuário
							</label>

							<input
								type="email"
								id="usuario"
								name="usuario"
								placeholder="Digite seu usuário"
								required
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								value={usuarioLogin.usuario}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>

						</div>

						{/* Senha */}
						<div className="flex w-full flex-col gap-2">

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
								placeholder="Digite sua senha"
								required
								className="w-full rounded-xl border-2 border-purple-700 bg-purple-950 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-purple-400 focus:border-purple-400"
								value={usuarioLogin.senha}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>

						</div>

						{/* Botão */}
						<button
							type="submit"
							className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl bg-purple-600 py-3 font-[Fredoka] text-base font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-500 hover:shadow-xl active:scale-95 sm:w-2/3"
						>
							{
								isLoading ? (
									<ClipLoader
										color="#ffffff"
										size={24}
									/>
								) : (
									<span>Entrar</span>
								)
							}
						</button>

						{/* Divisor */}
						<div className="flex w-full items-center gap-3 py-2">

							<hr className="flex-1 border-purple-700" />

							<span className="text-xs text-purple-400">
								OU
							</span>

							<hr className="flex-1 border-purple-700" />

						</div>

						{/* Cadastro */}
						<p className="text-center font-[Fredoka] text-sm font-semibold text-purple-200 sm:text-base">
							Ainda não tem uma conta?{" "}

							<Link
								to="/cadastro"
								className="text-purple-300 transition duration-300 hover:text-white hover:underline"
							>
								Cadastre-se
							</Link>
						</p>

					</form>

				</div>

				{/* Imagem */}
				<div
					className="hidden min-h-screen bg-cover bg-center bg-no-repeat lg:block"
					style={{
						backgroundImage: "url('https://i.imgur.com/2jDMgHn.jpg')"
					}}
				></div>

			</div>
		</>
	)
}

export default Login