import { useState } from 'react';
import ViagemFinalizar from './ViagemFinalizar';
import RelatorioViagem from './RelatorioViagem';
import {getNomeVeiculo} from '../../../data/veiculos'
import api from '../../../services/api'; 
import './ViagemCard.css'

function ViagemCard({ viagem }) {  
  const [mostrarFinalizar, setMostrarFinalizar] = useState(false);
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinalizarClick = () => {
    setMostrarFinalizar(true);
  };

  const handleFecharFinalizar = () => {
    setMostrarFinalizar(false);
  };

const handleViagemFinalizada = async (dadosViagem) => {
    setLoading(true);
    
    try {
        console.log('📍 FINALIZANDO VIAGEM:', dadosViagem);

        // Faz o PATCH para a API
        const response = await api.patch(`/viagem/${dadosViagem.viagemId}`, {
            kms: dadosViagem.quilometragem,
            bonus: dadosViagem.bonus,
            retorno: dadosViagem.retorno,
            precos: dadosViagem.vendidos,
            avariados: dadosViagem.avariados,
            despesas: dadosViagem.despesas,
            finalizada: true
        });

        console.log('✅ VIAGEM FINALIZADA COM SUCESSO:', response.data);
        
        // Fecha o modal após sucesso
        setMostrarFinalizar(false);
        
        alert(`✅ Viagem #${dadosViagem.viagemId} finalizada com sucesso!`);
        
        // Recarrega a página para atualizar a lista
        window.location.reload();

    } catch (error) {
        console.error('❌ ERRO AO FINALIZAR VIAGEM:', error);
        alert('❌ Erro ao finalizar viagem: ' + (error.response?.data?.message || error.message));
    } finally {
        setLoading(false);
    }
};

  const handleGerarRelatorio = () => {
    console.log('Abrindo relatório para viagem:', viagem.id);
    setMostrarRelatorio(true);
  };

  const handleFecharRelatorio = () => {
    setMostrarRelatorio(false);
  };

  return (
    <>
      <div className="viagem-card">
        <div className="cabecalho">
          <p className='viagem-id'>Viagem #{viagem.id}</p>
          <p>Status:{" "}
            {viagem.finalizada ? (
              <span className="status finalizada">Finalizada</span>
            ) : (
              <span className="status aberta">Em aberto</span>
            )}
          </p>
        </div>

        <div className="details-container">
          <p className="details"><strong>Data:</strong> {viagem.data}</p>
          <p className="details"><strong>Rota:</strong> {viagem.rota}</p>
          <p className="details"><strong>Carga:</strong> {viagem.carga}</p>
          <p className="details"><strong>Veículo:</strong> {getNomeVeiculo(viagem.veiculoId)}</p>
        </div>

        {!viagem.finalizada && (
          <div className="finalizar-viagem">
            <button 
              className="btn-finalizar"
              onClick={handleFinalizarClick}
              disabled={loading}
            >
              {loading ? 'Finalizando...' : 'Finalizar'}
            </button>
          </div>
        )}

        {viagem.finalizada && (
          <div>
            <div className='lista'>
              <strong>Vendas:</strong>
              <ul>
                {viagem.precos?.map((item, idx) => (
                  <li key={idx}>
                    <span>R$ {item.valor?.toFixed(2)}</span>
                    <span>{item.quantidade}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='lista'>
              <strong>Avariados:</strong>
              <ul>
                {viagem.avariados?.map((item, idx) => (
                  <li key={idx}>
                    <span>{item.quantidade}</span>
                    <span>{item.tipo}s</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-container">
              <p className="details"><strong>Bônus:</strong> {viagem.bonus || 0}</p>
              <p className="details"><strong>Retorno:</strong> {viagem.retorno || 0}</p>
              <p className="details"><strong>KMs rodados:</strong> {viagem.kms || 0} kms</p>
              <p className="details"><strong>Valor Recebido:</strong> R$ {(viagem.valorFinal || 0).toFixed(2)}</p>
            </div>

            {/* BOTÃO GERAR RELATÓRIO - ADICIONADO AQUI */}
            <div className="relatorio-actions">
              <button 
                className="btn-relatorio"
                onClick={handleGerarRelatorio}
              >
                Gerar Relatório
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para finalizar viagem */}
      {mostrarFinalizar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Finalizar Viagem #{viagem.id}</h3>
              <button 
                className="btn-fechar"
                onClick={handleFecharFinalizar}
                disabled={loading}
              >
                ✕
              </button>
            </div>
            <ViagemFinalizar 
              viagemId={viagem.id}
              onViagemFinalizada={handleViagemFinalizada}
              onCancelar={handleFecharFinalizar}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Modal para relatório */}
      {mostrarRelatorio && (
        <RelatorioViagem 
          viagem={viagem}
          onFechar={handleFecharRelatorio}
        />
      )}
    </>
  )
}

export default ViagemCard;