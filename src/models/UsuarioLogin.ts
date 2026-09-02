// Definição da interface UsuarioLogin e tipagens dos dados - correspondente ao que foi construído no backend.
export default interface UsuarioLogin {
    id: number,
    nome: string,
    usuario: string;
    senha: string,
    foto: string;
    dataNascimento: string;
    token: string;
}