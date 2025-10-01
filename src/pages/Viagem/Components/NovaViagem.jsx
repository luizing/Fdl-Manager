import React, { useState } from 'react';
import { veiculos } from '../../../data/veiculos';
import './NovaViagem.css';

function NovaViagem({ onNovaViagem, onCancelar, loading }) {
    // Função para obter a data de hoje no formato YYYY-MM-DD
    const getDataHoje = () => {
        const hoje = new Date();
        return hoje.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        rota: '',
        data: getDataHoje(), // ← Data de hoje como padrão
        carga: '',
        veiculoId: ''
    });

    // Opções para o select de veículos
    const opcoesVeiculos = [
        { value: '', label: 'Selecione o veículo' },
    ...Object.entries(veiculos).map(([id, nome]) => ({
        value: id,
        label: nome
    }))
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepara os dados para enviar
        const dadosParaEnviar = {
            rota: formData.rota,
            data: formData.data,
            carga: parseInt(formData.carga) || 0,
            veiculoId: parseInt(formData.veiculoId) || 0
        };

        console.log('Dados para nova viagem:', dadosParaEnviar);

        // Chama a função do pai que fará o POST
        if (onNovaViagem) {
            await onNovaViagem(dadosParaEnviar);
        }
    };

    return (
        <div className="nova-viagem-container">
            <form onSubmit={handleSubmit} className="nova-viagem-form">
                <h3>Nova Viagem</h3>
                
                <div className="form-group">
                    <label htmlFor="rota" className="form-label">
                        Rota: *
                    </label>
                    <input 
                        type="text"
                        id="rota"
                        name="rota"
                        value={formData.rota}
                        onChange={handleChange}
                        placeholder="Horizonte, Ocara, Serra ..."
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="data" className="form-label">
                        Data:
                    </label>
                    <input 
                        type="date"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="carga" className="form-label">
                        Carga: 
                    </label>
                    <input 
                        type="number"
                        id="carga"
                        name="carga"
                        value={formData.carga}
                        onChange={handleChange}
                        placeholder="Quantidade de garrafões"
                        min="1"
                        step="1"
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="veiculoId" className="form-label">
                        Veículo:
                    </label>
                    <select
                        id="veiculoId"
                        name="veiculoId"
                        value={formData.veiculoId}
                        onChange={handleChange}
                        required
                        className="form-input"
                        disabled={loading}
                    >
                        {opcoesVeiculos.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="botoes-form">
                    <button 
                        type="button"
                        onClick={onCancelar}
                        className="btn-cancelar"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    
                    <button 
                        type="submit" 
                        disabled={loading || !formData.rota || !formData.data || !formData.carga || !formData.veiculoId}
                        className="submit-button"
                    >
                        {loading ? 'Criando...' : 'Criar Viagem'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NovaViagem;