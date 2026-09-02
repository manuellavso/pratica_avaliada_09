import type Categoria from "./Categoria";

// Definição da interface Produto e tipagens de dados
export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    foto: string;
    categoria?: Categoria | null;
}