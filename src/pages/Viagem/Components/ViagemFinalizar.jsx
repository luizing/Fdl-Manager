import React, { useState } from 'react';
import VendidosComponent from './VendidosComponent';
import AvariadosComponent from './AvariadosComponent';
import DespesasComponent from './DespesasComponent';
import './ViagemFinalizar.css';

function ViagemFinalizar() {
    const [km, setKm] = useState('');
    const [bonus, setBonus] = useState('');
    const [retorno, setRetorno] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setMessage('');

        try {
            // Dados que serão enviados para a API
            const dadosParaEnviar = {
                quilometragem: parseFloat(km) || 0,
                bonus: parseFloat(bonus) || 0,
                retorno: parseFloat(retorno) || 0,
                vendidos: vendidos,
                avariados: avariados,
                despesas: despesas
            };

            console.log('Dados para enviar:', dadosParaEnviar);

            // Simulando o envio para a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage('✅ Viagem finalizada com sucesso!');
            
            // Limpa todos os campos
            setKm('');
            setBonus('');
            setRetorno('');
            setVendidos([]);
            setAvariados([]);
            setDespesas([]);

        } catch (error) {
            setMessage('❌ Erro ao finalizar viagem');
        } finally {
            setLoading(false);
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
                    {/* Campo de Quilometragem */}
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
                            step="0.01"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Campo de Bônus */}
                    <div className="form-group">
                        <label htmlFor="bonus" className="form-label">
                            Bonificação :
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
                        />
                    </div>

                    {/* Campo de Retorno */}
                    <div className="form-group">
                        <label htmlFor="retorno" className="form-label">
                            Retorno :
                        </label>
                        <input 
                            type="number"
                            id="retorno"
                            name="retorno"
                            value={retorno}
                            onChange={handleRetornoChange}
                            placeholder="Quantidade de retorno"
                            min="0"
                            step="1"
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Componente Vendidos */}
                <VendidosComponent onVendidosChange={handleVendidosChange} />

                {/* Componente Avariados */}
                <AvariadosComponent onAvariadosChange={handleAvariadosChange} />

                {/* Componente Despesas */}
                <DespesasComponent onDespesasChange={handleDespesasChange} />

                <button 
                    type="submit" 
                    disabled={loading || !km}
                    className="submit-button"
                >
                    {loading ? 'Enviando...' : 'Finalizar Viagem'}
                </button>

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