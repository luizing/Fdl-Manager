import React, { useState } from 'react';
import VendidosComponent from './VendidosComponent';
import AvariadosComponent from './AvariadosComponent';
import DespesasComponent from './DespesasComponent';
import './ViagemFinalizar.css';

function ViagemFinalizar({ viagemId, onViagemFinalizada, onCancelar, loading }) {
    const [km, setKm] = useState('');
    const [bonus, setBonus] = useState('');
    const [retorno, setRetorno] = useState('');
    const [message, setMessage] = useState('');
    const [vendidos, setVendidos] = useState([]);
    const [avariados, setAvariados] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const handleVendidosChange = (dadosVendidos) => {
        setVendidos(dadosVendidos);
    };

    const handleAvariadosChange = (dadosAvariados) => {
        setAvariados(dadosAvariados);
    };

    const handleDespesasChange = (dadosDespesas) => {
        setDespesas(dadosDespesas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');


        // Prepara os dados para enviar
        const dadosParaEnviar = {
            viagemId: viagemId,
            quilometragem: parseInt(km),
            bonus: parseInt(bonus) || 0, // ← Agora é inteiro
            retorno: parseInt(retorno) || 0, // ← Agora é inteiro
            vendidos: vendidos,
            avariados: avariados,
            despesas: despesas
        };

        console.log('Dados completos para enviar:', dadosParaEnviar);

        // Chama a função do pai que fará o POST
        if (onViagemFinalizada) {
            await onViagemFinalizada(dadosParaEnviar);
        }
    };

    const handleKmChange = (e) => {
        setKm(e.target.value);
    };

    const handleBonusChange = (e) => {
        setBonus(e.target.value);
    };

    const handleRetornoChange = (e) => {
        setRetorno(e.target.value);
    };

    return(
        <div className="viagem-finalizar-container">
            
            <form onSubmit={handleSubmit} className="viagem-form">
                {/* Campos Principais */}
                <div className="campos-principais">
                    <div className="form-group">
                        <label htmlFor="km" className="form-label">
                            Quilômetros Rodados:
                        </label>
                        <input 
                            type="number"
                            id="km"
                            name="km"
                            value={km}
                            onChange={handleKmChange}
                            placeholder="Quilômetros Rodados"
                            min="0"
                            required
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bonus" className="form-label">
                            Bonificação:
                        </label>
                        <input 
                            type="number"
                            id="bonus"
                            name="bonus"
                            value={bonus}
                            onChange={handleBonusChange}
                            placeholder="Bônus"
                            min="0"
                            step="1"
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="retorno" className="form-label">
                            Retorno:
                        </label>
                        <input 
                            type="number"
                            id="retorno"
                            name="retorno"
                            value={retorno}
                            onChange={handleRetornoChange}
                            placeholder="Retorno"
                            min="0"
                            step="1"
                            className="form-input"
                            disabled={loading}
                        />
                    </div>
                </div>

                <VendidosComponent onVendidosChange={handleVendidosChange} />
                <AvariadosComponent onAvariadosChange={handleAvariadosChange} />
                <DespesasComponent onDespesasChange={handleDespesasChange} />

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
                        disabled={loading || !km}
                        className="submit-button"
                    >
                        {loading ? 'Enviando...' : `Finalizar Viagem`}
                    </button>
                </div>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default ViagemFinalizar;