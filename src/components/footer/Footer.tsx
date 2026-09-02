import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon
} from '@phosphor-icons/react'
import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    let component: ReactNode;

    if (token !== '') {
        component = (
            <footer className="w-full bg-purple-950 px-4 py-6 text-white">
                <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">

                    <div className="text-center md:text-left">
                        <p className="text-lg font-semibold md:text-2xl">
                            Loja de Games
                        </p>

                        <p className="mt-1 text-sm text-purple-300">
                            Copyright: 2026
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 md:items-end">
                        <p className="text-sm text-purple-200 md:text-base">
                            Acesse nossas redes sociais
                        </p>

                        <div className="flex gap-3">

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-800 bg-purple-900 text-purple-200 transition duration-300 hover:border-purple-500 hover:bg-purple-800 hover:text-white"
                            >
                                <LinkedinLogoIcon size={24} weight="bold" />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-800 bg-purple-900 text-purple-200 transition duration-300 hover:border-purple-500 hover:bg-purple-800 hover:text-white"
                            >
                                <InstagramLogoIcon size={24} weight="bold" />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-800 bg-purple-900 text-purple-200 transition duration-300 hover:border-purple-500 hover:bg-purple-800 hover:text-white"
                            >
                                <FacebookLogoIcon size={24} weight="bold" />
                            </a>

                        </div>
                    </div>

                </div>
            </footer>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Footer;