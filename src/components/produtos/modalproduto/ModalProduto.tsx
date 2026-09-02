import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import FormProduto from '../formproduto/FormProduto';

function ModalProduto() {

    return (
        <>
            <Popup
                trigger={
                    <button
                        className="rounded-xl bg-purple-700 px-5 py-2 text-sm font-medium text-purple-100 transition duration-300 hover:bg-purple-600 active:scale-95"
                    >
                        Novo Produto
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '1rem'
                }}
            >
                <FormProduto />
            </Popup>
        </>
    );
}

export default ModalProduto;