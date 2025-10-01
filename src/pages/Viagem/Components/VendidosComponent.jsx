import React, { useState } from 'react';
import { useEffect } from 'react';
import './VendidosComponent.css';

function VendidosComponent({ onVendidosChange }) { // ← ADICIONE ESTA PROP
    const [vendidos, setVendidos] = useState([
        { quantidade: '', valor: '' }
    ]);

    const adicionarLinha = () => {
        setVendidos([...vendidos, { quantidade: '', valor: '' }]);
    };

    const handleChange = (index, campo, valor) => {
        const novosVendidos = vendidos.map((item, i) => {
            if (i === index) {
                return { ...item, [campo]: valor };
            }
            return item;
        });
        setVendidos(novosVendidos);
    };

    const removerLinha = (index) => {
        if (vendidos.length > 1) {
            const novosVendidos = vendidos.filter((_, i) => i !== index);
            setVendidos(novosVendidos);
        }
    };

    useEffect(() => {
        if (onVendidosChange) {
            const dadosFormatados = vendidos
                .map(item => ({
                    quantidade: parseInt(item.quantidade) || 0,
                    valor: parseFloat(item.valor) || 0
                }))
                .filter(item => item.quantidade > 0 && item.valor > 0);
            
            onVendidosChange(dadosFormatados);
        }
    }, [vendidos]); // ← Só vendidos nas dependências

    return (
        <div className='atributos-vendidos'>
            <label className='atributos-label'>Vendidos</label>
            
            {vendidos.map((vendido, index) => (
                <div key={index} className="linha-vendido">
                    <input 
                        type="number"
                        placeholder="Quantidade"
                        value={vendido.quantidade}
                        onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                        min="0"
                        className="input-quantidade"
                    />
                    
                    <input 
                        type="number"
                        placeholder="Valor unitário"
                        value={vendido.valor}
                        onChange={(e) => handleChange(index, 'valor', e.target.value)}
                        min="0"
                        step="0.01"
                        className="input-valor"
                    />

                    {vendidos.length > 1 && (
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

            <div className="botoes-container">
                <button
                    type="button"
                    onClick={adicionarLinha}
                    className="btn-adicionar"
                >
                    + Adicionar Outra Linha
                </button>
            </div>
        </div>
    );
}

export default VendidosComponent;