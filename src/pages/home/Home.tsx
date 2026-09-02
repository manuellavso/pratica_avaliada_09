import ModalProduto from "../../components/produtos/modalproduto/ModalProduto"

function Home() {
	return (
		<>
			<div className="flex min-h-screen justify-center bg-purple-100">
				<div className="container grid w-full grid-cols-1 items-center px-4 text-purple-950 md:grid-cols-2 md:px-8">

					<div className="flex flex-col items-center justify-center gap-3 py-10 md:items-start md:gap-4">

						<h2 className="text-center text-4xl font-bold leading-tight md:text-left md:text-5xl lg:text-6xl">
							Seja bem-vindo! 🎮
						</h2>

						<p className="max-w-md text-center text-lg text-purple-700 md:text-left md:text-xl">
							Aqui você encontra os melhores jogos para deixar sua coleção ainda mais incrível!
						</p>

						<div className="mt-2 flex w-full justify-center md:justify-start">
							<div className="flex">
								<ModalProduto />
							</div>
						</div>

					</div>

					<div className="flex w-full items-center justify-center py-6 md:py-10">
						<img
							src="https://ik.imagekit.io/iibl43pgxp/imagem_roxa_fundo_transparente_personagem_original.png"
							alt="Imagem Página Home"
							className="h-64 w-4/5 object-contain transition duration-300 hover:scale-105 md:h-80 md:w-4/5 lg:h-96"
						/>
					</div>
				
				</div>
			</div>
		</>
	)
}

export default Home