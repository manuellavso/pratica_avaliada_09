// Definição da interface Usuario e tipagens dos dados - correspondente ao que foi construído no backend.
export default interface Usuario {
    id: number,
    nome: string,
    usuario: string;
    senha: string,
    foto: string;
    dataNascimento: string;
}