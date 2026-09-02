import { MagnifyingGlassIcon } from "@phosphor-icons/react";

function SearchForm() {

	return (
		<form className="relative flex items-center w-full">
			<div className="relative flex items-center w-full">

				<input
					className="w-full h-10 pl-4 pr-12 text-white bg-purple-900 rounded-xl border-2 border-purple-700 shadow-lg
                    focus:outline-none focus:border-purple-400
                    placeholder:text-purple-300
                    transition-all duration-200"
					type="search"
					placeholder="Buscar jogos..."
					id="busca"
					name="busca"
				/>

				<button
					type="submit"
					className="absolute right-1 flex items-center justify-center w-8 h-8 text-white
                    bg-purple-600 rounded-lg
                    hover:bg-purple-500
                    active:bg-purple-700
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                    shadow-md"
					aria-label="Buscar"
				>
					<MagnifyingGlassIcon size={18} weight="bold" />
				</button>

			</div>
		</form>
	)
}

export default SearchForm