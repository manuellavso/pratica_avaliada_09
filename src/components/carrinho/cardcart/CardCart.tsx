import {MinusIcon, PlusIcon, TrashIcon} from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext, type Items } from "../../../contexts/CartContext"



interface CardCartProps {
    item: Items
}

function CardCart({ item }: CardCartProps) {

    const {
        adicionarItem,
        removerItem,
        removerProduto
    } = useContext(CartContext)

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-purple-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-lg sm:flex-row">

            {/* Imagem do Produto */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center self-center rounded-xl bg-purple-50 p-2 sm:self-auto">
                <img
                    src={item.foto}
                    className="max-h-full max-w-full object-contain"
                    alt={item.nome}
                />
            </div>

            {/* Informações do Produto */}
            <div className="flex grow flex-col justify-between">

                <div>
                    <h3 className="mb-1 font-semibold text-purple-950">
                        {item.nome}
                    </h3>

                    <p className="mb-2 text-sm text-purple-500">
                        Categoria: {item.categoria?.tipo ?? "Sem categoria"}
                    </p>

                    <p className="text-xl font-bold text-purple-700">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(item.preco)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className="mt-3 flex items-center gap-4">

                    <div className="flex items-center gap-2 rounded-xl border border-purple-200">

                        <button
                            type="button"
                            className="rounded-l-xl p-2 text-purple-700 transition duration-300 hover:bg-purple-100"
                            onClick={() => removerItem(item.id)}
                        >
                            <MinusIcon size={20} weight="bold" />
                        </button>

                        <span className="min-w-10 px-4 text-center font-semibold text-purple-950">
                            {item.quantidade}
                        </span>

                        <button
                            type="button"
                            className="rounded-r-xl p-2 text-purple-700 transition duration-300 hover:bg-purple-100"
                            onClick={() => adicionarItem(item.id)}
                        >
                            <PlusIcon size={20} weight="bold" />
                        </button>

                    </div>

                    <button
                        type="button"
                        className="rounded-xl p-2 text-purple-700 transition duration-300 hover:bg-red-50 hover:text-red-500"
                        onClick={() => removerProduto(item.id)}
                        title="Remover produto"
                    >
                        <TrashIcon size={20} weight="bold" />
                    </button>

                </div>

            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between border-t border-purple-100 pt-3 sm:flex-col sm:items-end sm:justify-between sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">

                <span className="text-xs uppercase tracking-wide text-purple-400 sm:hidden">
                    Subtotal
                </span>

                <p className="text-lg font-bold text-purple-950">
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(item.preco * item.quantidade)}
                </p>

            </div>

        </div>
    )
}

export default CardCart