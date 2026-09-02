import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {

    return (
        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-800 bg-purple-900 shadow-lg transition duration-300 hover:shadow-xl">

            <header className="bg-purple-950 px-6 py-3 text-xl font-semibold text-white">
                Categoria
            </header>

            <p className="h-full bg-purple-900 p-8 text-3xl font-semibold text-purple-100">
                {categoria.tipo}
            </p>

            <div className="flex gap-2 bg-purple-900 p-3">

                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-purple-700 py-2 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600"
                >
                    <button>
                        Editar
                    </button>
                </Link>

                <Link
                    to={`/deletarcategoria/${categoria.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-purple-950 py-2 text-sm font-medium text-purple-300 transition duration-300 hover:bg-red-500 hover:text-white"
                >
                    <button>
                        Deletar
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default CardCategorias;