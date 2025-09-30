import React, { useState, useEffect } from 'react';
import './AvariadosComponent.css';

function AvariadosComponent({ onAvariadosChange }) {
    const [avariados, setAvariados] = useState([
        { quantidade: '', tipo: '' }
    ]);

    // Opções para o select de tipo
    const opcoesTipo = [
        { value: '', label: 'Selecione o tipo' },
        { value: 'quebrado', label: 'Quebrados' },
        { value: 'vazado', label: 'Vazados' },
        { value: 'vencido', label: 'Vencidos' }
    ];

    const adicionarLinha = () => {
        setAvariados([...avariados, { quantidade: '', tipo: '' }]);
    };

    const handleChange = (index, campo, valor) => {
        const novosAvariados = avariados.map((item, i) => {
            if (i === index) {
                return { ...item, [campo]: valor };
            }
            return item;
        });
        setAvariados(novosAvariados);
    };

    const removerLinha = (index) => {
        if (avariados.length > 1) {
            const novosAvariados = avariados.filter((_, i) => i !== index);
            setAvariados(novosAvariados);
        }
    };

    // Envia os dados para o componente pai quando houver mudanças
    useEffect(() => {
        if (onAvariadosChange) {
            const dadosFormatados = avariados.map(item => ({
                quantidade: parseInt(item.quantidade) || 0,
                tipo: item.tipo
            })).filter(item => item.quantidade > 0 && item.tipo !== '');
            
            onAvariadosChange(dadosFormatados);
        }
    }, [avariados, onAvariadosChange]);

    return (
        <div className='atributos-avariados'>
            <label className='atributos-label'>Avariados</label>
            
            {avariados.map((avariado, index) => (
                <div key={index} className="linha-avariado">
                    <input 
                        type="number"
                        placeholder="Quantidade"
                        value={avariado.quantidade}
                        onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                        min="0"
                        className="input-quantidade"
                    />
                    
                    <select
                        value={avariado.tipo}
                        onChange={(e) => handleChange(index, 'tipo', e.target.value)}
                        className="select-tipo"
                    >
                        {opcoesTipo.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>

                    {avariados.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removerLinha(index)}
                            className="btn-remover"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={adicionarLinha}
                className="btn-adicionar"
            >
                + Adicionar Outra Linha
            </button>
        </div>
    );
}

export default AvariadosComponent;