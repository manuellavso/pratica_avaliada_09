import { ListIcon, ShoppingCartIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import SearchForm from "./SearchForm"
import { toast } from "react-toastify"
import { useContext, useState, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { CartContext } from "../../contexts/CartContext"

function Navbar() {

	const [menuAberto, setMenuAberto] = useState(false)
	const navigate = useNavigate()

	const { usuario, handleLogout } = useContext(AuthContext)
	const { quantidadeItems } = useContext(CartContext)

	const token = usuario.token

	function logout() {
		handleLogout()
		toast.error("Usuário desconectado com sucesso!")
		navigate("/")
	}

	let component: ReactNode

	if (token !== '') {
		component = (
			<>
				<div className="w-full bg-purple-950 text-white shadow-lg">
					<div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6">

						<Link
							to="/"
							className="shrink-0 transition duration-300 hover:opacity-90 active:scale-95"
						>
							<img
								src="https://ik.imagekit.io/iibl43pgxp/gamesatv8.png"
								alt="Logo"
								className="w-40 md:w-52"
							/>
						</Link>

						<div className="relative hidden w-2/5 items-center justify-center text-black md:flex">
							<SearchForm />
						</div>

						<div className="hidden items-center gap-2 lg:flex">

							<Link
								to="/produtos"
								className="rounded-xl px-3 py-2 font-[Fredoka] transition duration-300 hover:bg-purple-800 hover:text-purple-200"
							>
								Produtos
							</Link>

							<Link
								to="/categorias"
								className="rounded-xl px-3 py-2 font-[Fredoka] transition duration-300 hover:bg-purple-800 hover:text-purple-200"
							>
								Categorias
							</Link>

							<Link
								to="/cadastrarcategoria"
								className="rounded-xl px-3 py-2 font-[Fredoka] transition duration-300 hover:bg-purple-800 hover:text-purple-200"
							>
								Cadastrar Categoria
							</Link>

							<Link
								to="/perfil"
								aria-label="Minha conta"
								className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-800 bg-purple-900 transition duration-300 hover:border-purple-500 hover:bg-purple-800 hover:text-purple-200"
							>
								<UserIcon size={26} weight="bold" />
							</Link>

							<Link
								to="/carrinho"
								aria-label="Carrinho de compras"
								className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-purple-800 bg-purple-900 transition duration-300 hover:border-purple-500 hover:bg-purple-800 hover:text-purple-200"
							>
								<ShoppingCartIcon size={26} weight="bold" />

								<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
									{quantidadeItems}
								</span>
							</Link>

							<button
								aria-label="Sair"
								className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-purple-800 bg-purple-900 transition duration-300 hover:border-red-400 hover:bg-red-500"
								onClick={logout}
							>
								<SignOutIcon size={26} weight="bold" />
							</button>

						</div>

						<button
							className="rounded-xl border border-purple-800 bg-purple-900 p-2 text-white transition duration-300 hover:bg-purple-800 md:hidden"
							aria-label="Abrir menu"
							onClick={() => setMenuAberto((open) => !open)}
						>
							<ListIcon size={28} weight="bold" />
						</button>

					</div>
				</div>

				<div
					className={`${menuAberto ? "flex" : "hidden"} md:hidden flex-col gap-2 border-t border-purple-800 bg-purple-950 px-5 py-4 text-white`}
				>

					<div className="mb-2 text-black">
						<SearchForm />
					</div>

					<Link
						to="/produtos"
						className="rounded-xl px-4 py-3 font-[Fredoka] transition duration-300 hover:bg-purple-800"
					>
						Produtos
					</Link>

					<Link
						to="/categorias"
						className="rounded-xl px-4 py-3 font-[Fredoka] transition duration-300 hover:bg-purple-800"
					>
						Categorias
					</Link>

					<Link
						to="/cadastrarcategoria"
						className="rounded-xl px-4 py-3 font-[Fredoka] transition duration-300 hover:bg-purple-800"
					>
						Cadastrar Categoria
					</Link>

					<Link
						to="/perfil"
						className="flex items-center gap-3 rounded-xl px-4 py-3 font-[Fredoka] transition duration-300 hover:bg-purple-800"
					>
						<UserIcon size={24} weight="bold" />
						Minha conta
					</Link>

					<Link
						to="/carrinho"
						className="flex items-center gap-3 rounded-xl px-4 py-3 font-[Fredoka] transition duration-300 hover:bg-purple-800"
					>
						<span className="relative flex items-center">
							<ShoppingCartIcon size={24} weight="bold" />

							<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
								{quantidadeItems}
							</span>
						</span>

						Carrinho
					</Link>

					<button
						onClick={logout}
						className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left font-[Fredoka] transition duration-300 hover:bg-red-500"
					>
						<SignOutIcon size={24} weight="bold" />
						Sair
					</button>

				</div>
			</>
		)
	}

	return (
		<>
			{component}
		</>
	)
}

export default Navbar