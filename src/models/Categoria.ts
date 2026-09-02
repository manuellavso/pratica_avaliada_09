import type Produto from "./Produto";

// Definição da interface Categoria e tipagens de dados
export default interface Categoria {
    id: number;
    tipo: string;
    produto?: Produto[] | null;
}