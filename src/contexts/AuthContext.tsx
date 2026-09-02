// Importações necessárias
import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import axios from "axios";
import { login } from "../services/Service";
import { toast } from "react-toastify";
 
//  Criação da interface AuthContext, e definição dos
// dados e funções que podem ser acessados em qualquer parte da aplicação.
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): void
    handleLogout(): void
    isLoading: boolean
 
}
 
// Quem irá consumir a context - ter acesso.
interface AuthProviderProps {
    children: ReactNode
}
 
// Criar o contexto usando a tipagem AuthContextProps, Isso define os dados e funções que podem ser acessados em qualquer parte da aplicação.
export const AuthContext = createContext({} as AuthContextProps)
 
// Inicializar o provedor AuthProvider, responsável por gerenciar o contexto da aplicação, compartilhar estados e funções
// implementar a lógica das funções compartilhadas e atualizar estados centralizadamente.
export function AuthProvider({ children }: AuthProviderProps) {
 
    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        dataNascimento:'',
        token: '',
    })

    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);
 
    // Implementar a função handleLogin, responsável por autenticar o usuário na aplicação.
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);
 
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            toast.success("Usuário Autenticado com sucesso!");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Erro ao autenticar o usuário: ${error.response.status}`);
                console.log('Resposta da API: ', error.message);
            } else {
                toast.error("Erro ao autenticar o usuário! Verifique a conexão com a API!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Implementar a função handleLogout (desconectar o Usuario).
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            dataNascimento:'',
            token: '',
        })
 
    }

    // 
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
 
 
}