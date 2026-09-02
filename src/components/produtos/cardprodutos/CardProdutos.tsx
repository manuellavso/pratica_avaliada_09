import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'
import { CartContext } from '../../../contexts/CartContext'
import { useContext } from 'react'

interface CardProdutoProps {
	produto: Produto
}

function CardProdutos({ produto }: CardProdutoProps) {

	const { adicionarProduto } = useContext(CartContext)

	return (
		<div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-800 bg-purple-900 shadow-lg transition duration-300 hover:shadow-xl">

			<div className="flex items-center justify-end gap-2 bg-purple-950 px-4 py-3">

				<Link
					to={`/editarproduto/${produto.id}`}
					className="text-purple-300 transition duration-300 hover:text-purple-100"
				>
					<PencilIcon
						size={22}
						weight="bold"
					/>
				</Link>

				<Link
					to={`/deletarproduto/${produto.id}`}
					className="text-purple-300 transition duration-300 hover:text-red-400"
				>
					<TrashIcon
						size={22}
						weight="bold"
					/>
				</Link>

			</div>

			<div className="flex flex-col">

				<div className="flex h-52 items-center justify-center bg-white p-4">

					<img
						src={produto.foto}
						className="h-44 w-full object-contain"
						alt={produto.nome}
					/>

				</div>

				<div className="flex flex-col gap-2 bg-purple-900 p-5">

					<p className="text-center text-sm font-medium uppercase text-purple-300">
						Produto
					</p>

					<h3 className="text-center text-xl font-bold text-white">
						{produto.nome}
					</h3>

					<p className="text-center text-2xl font-semibold text-purple-200">
						R$ {produto.preco.toFixed(2).replace('.', ',')}
					</p>

					<p className="text-center text-sm italic text-purple-300">
						Categoria: {produto.categoria?.tipo ?? 'Sem categoria'}
					</p>

				</div>

			</div>

			<div className="bg-purple-900 p-3">

				<button
					className="w-full rounded-xl bg-purple-700 py-2 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600"
					onClick={() => adicionarProduto(produto)}
					type="button"
				>
					Comprar
				</button>

			</div>

		</div>
	)
}

export default CardProdutos