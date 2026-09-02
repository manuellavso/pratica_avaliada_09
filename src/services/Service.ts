import axios from "axios"

// Conectar com o backend (baseURL = endereço do deploy)
const api = axios.create({
    baseURL: 'https://lojagames-3nay.onrender.com'
})

// Criar funções para enviar requisições ao backend
// 1. Função assíncrona Cadastrar usuário:
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// 2. Função Autenticar usuário:
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// 3. Função assíncrona Buscar, responsável por executar todas as operações de busca de recursos na aplicação, como Categorias, Produtos e etc.
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

// 4. Função assíncrona Cadastrar
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

// 5. Função assíncrona Atualizar
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

// 6. Função assíncrona Deletar
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}