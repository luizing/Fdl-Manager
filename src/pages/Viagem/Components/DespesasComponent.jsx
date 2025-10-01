import React, { useState, useEffect } from 'react';
import './DespesasComponent.css';

function DespesasComponent({ onDespesasChange }) {
    const [despesas, setDespesas] = useState([
        { finalidade: '', valor: '' }
    ]);

    const adicionarLinha = () => {
        setDespesas([...despesas, { finalidade: '', valor: '' }]);
    };

    const handleChange = (index, campo, valor) => {
        const novasDespesas = despesas.map((item, i) => {
            if (i === index) {
                return { ...item, [campo]: valor };
            }
            return item;
        });
        setDespesas(novasDespesas);
    };

    const removerLinha = (index) => {
        if (despesas.length > 1) {
            const novasDespesas = despesas.filter((_, i) => i !== index);
            setDespesas(novasDespesas);
        }
    };

    // Envia os dados para o componente pai quando houver mudanças
useEffect(() => {
    if (onDespesasChange) {
        const dadosFormatados = despesas
            .map(item => ({
                finalidade: item.finalidade.trim(),
                valor: parseFloat(item.valor) || 0
            }))
            .filter(item => item.finalidade !== '' && item.valor > 0);
        
        onDespesasChange(dadosFormatados);
    }
}, [despesas]); // ← Só despesas nas dependências

    return (
        <div className='atributos-despesas'>
            <label className='atributos-label'>Despesas</label>
            
            {despesas.map((despesa, index) => (
                <div key={index} className="linha-despesa">
                    <input 
                        type="text"
                        placeholder="Finalidade da despesa"
                        value={despesa.finalidade}
                        onChange={(e) => handleChange(index, 'finalidade', e.target.value)}
                        className="input-finalidade"
                    />
                    
                    <input 
                        type="number"
                        placeholder="Valor (R$)"
                        value={despesa.valor}
                        onChange={(e) => handleChange(index, 'valor', e.target.value)}
                        min="0"
                        step="0.01"
                        className="input-valor"
                    />

                    {despesas.length > 1 && (
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
                + Adicionar Outra Despesa
            </button>
        </div>
    );
}

export default DespesasComponent;