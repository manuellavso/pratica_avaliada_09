import { ShoppingCartIcon } from "@phosphor-icons/react"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import CardCart from "../cardcart/CardCart"
import { AuthContext } from "../../../contexts/AuthContext"
import { CartContext } from "../../../contexts/CartContext"

function Cart() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    const {
        items,
        quantidadeItems,
        valorTotal,
        limparCart
    } = useContext(CartContext)

    useEffect(() => {
        if (token === "") {
            navigate("/")
        }
    }, [token])

    return (
        <div className="min-h-screen bg-purple-100 py-8">

            <div className="container mx-auto px-4">

                {/* Cabeçalho */}
                <h1 className="mb-8 text-center text-3xl font-bold text-purple-950 md:text-4xl">
                    Carrinho de Compras
                </h1>

                {/* Carrinho vazio */}
                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-200 bg-white px-6 py-12 text-center shadow-sm">

                        <ShoppingCartIcon
                            size={64}
                            weight="duotone"
                            className="mb-4 text-purple-300"
                        />

                        <h2 className="mb-2 text-2xl font-bold text-purple-950">
                            Seu carrinho está vazio
                        </h2>

                        <p className="mb-6 text-purple-500">
                            Adicione produtos para começar suas compras!
                        </p>

                        <Link
                            to="/produtos"
                            className="rounded-xl bg-purple-700 px-6 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600"
                        >
                            Ver produtos
                        </Link>

                    </div>
                )}

                {/* Layout Principal */}
                {items.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Coluna Esquerda */}
                        <div className="flex flex-col gap-4 lg:col-span-2">

                            {items.map((item) => (
                                <CardCart
                                    key={item.id}
                                    item={item}
                                />
                            ))}

                        </div>

                        {/* Coluna Direita */}
                        <div className="lg:col-span-1">

                            <div className="sticky top-4 rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">

                                <h2 className="mb-4 border-b border-purple-100 pb-4 text-xl font-bold text-purple-950">
                                    Resumo da Compra
                                </h2>

                                <div className="mb-6 flex flex-col gap-3">

                                    <div className="flex justify-between text-purple-500">
                                        <span>
                                            Produtos ({quantidadeItems})
                                        </span>

                                        <span className="font-semibold text-purple-950">
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL"
                                            }).format(valorTotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-purple-500">
                                        <span>Frete</span>

                                        <span className="font-semibold text-green-600">
                                            Grátis
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-purple-500">
                                        <span>Desconto</span>

                                        <span className="font-semibold text-purple-950">
                                            R$ 0,00
                                        </span>
                                    </div>

                                </div>

                                {/* Total */}
                                <div className="mb-6 flex items-center justify-between border-t border-purple-100 py-4">

                                    <span className="text-lg font-bold text-purple-950">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-purple-700">
                                        {new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        }).format(valorTotal)}
                                    </span>

                                </div>

                                {/* Formas de Pagamento */}
                                <div className="mb-4 border-b border-purple-100 pb-4">

                                    <p className="mb-3 text-sm text-purple-500">
                                        Formas de pagamento:
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">

                                        <div className="flex rounded-lg bg-purple-50 p-2">
                                            <img
                                                src="https://ik.imagekit.io/vzr6ryejm/ecommerce/credit-card.png"
                                                alt="Logo Cartão de Crédito"
                                                className="w-10"
                                            />
                                        </div>

                                        <div className="flex items-center gap-1 rounded-lg bg-purple-50 p-2 text-xs font-semibold text-purple-700">
                                            <img
                                                src="https://ik.imagekit.io/vzr6ryejm/ecommerce/pix-svgrepo-com.svg"
                                                alt="Logo do PIX"
                                                className="w-4"
                                            />
                                            <span>PIX</span>
                                        </div>

                                        <div className="flex rounded-lg bg-purple-50 p-2">
                                            <img
                                                src="https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg"
                                                alt="Logo do Google Pay"
                                                className="w-8"
                                            />
                                        </div>

                                        <div className="flex rounded-lg bg-purple-50 p-2">
                                            <img
                                                src="https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg"
                                                alt="Logo do Apple Pay"
                                                className="w-8"
                                            />
                                        </div>

                                        <div className="flex rounded-lg bg-purple-50 p-2">
                                            <img
                                                src="https://ik.imagekit.io/vzr6ryejm/ecommerce/boleto-logo.svg"
                                                alt="Logo do Boleto Bancário"
                                                className="w-10"
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Finalizar Compra */}
                                <button
                                    className="w-full rounded-xl bg-purple-700 py-3 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 active:scale-95"
                                    type="button"
                                    onClick={limparCart}
                                >
                                    Finalizar Compra
                                </button>

                                <p className="mt-4 text-center text-xs text-purple-400">
                                    Frete grátis para todo o Brasil
                                </p>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    )
}

export default Cart