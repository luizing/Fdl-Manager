import { useState } from 'react';
import ViagemFinalizar from './ViagemFinalizar';
import api from '../../../services/api';
import './ViagemCard.css'
import { getNomeVeiculo } from '../../../data/veiculos';

function ViagemCard({ viagem }) {  
  const [mostrarFinalizar, setMostrarFinalizar] = useState(false);
  const [loading, setLoading] = useState(false); // ← ADICIONE ESTA LINHA

  const handleFinalizarClick = () => {
    setMostrarFinalizar(true);
  };

  const handleFecharFinalizar = () => {
    setMostrarFinalizar(false);
  };

  const handleViagemFinalizada = async (dadosViagem) => {
    setLoading(true); // ← AGORA setLoading ESTÁ DEFINIDO
    
    try {
        console.log('Enviando dados da viagem:', dadosViagem);

        // Usando AXIOS
        const response = await api.patch(`/viagem/${dadosViagem.viagemId}`, {
            kms: dadosViagem.quilometragem,
            bonus: dadosViagem.bonus,
            retorno: dadosViagem.retorno,
            precos: dadosViagem.vendidos,
            avariados: dadosViagem.avariados,
            despesas: dadosViagem.despesas,
            finalizada: true
        });

        console.log('Resposta da API:', response.data);
        
        // Fecha o modal após sucesso
        setMostrarFinalizar(false);
        
        alert(`Viagem #${dadosViagem.viagemId} finalizada com sucesso!`);
        
        // Opcional: recarregar a página para atualizar a lista
        window.location.reload();

    } catch (error) {
      console.error('Erro ao finalizar viagem:', error);
      alert('Erro ao finalizar viagem: ' + error.message);
    } finally {
      setLoading(false);
    }
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
            >
              Finalizar
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
                    <span>R$ {item.valor.toFixed(2)}</span>
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

            <div className='lista'>
              <strong>Despesas:</strong>
              <ul>
                {viagem.despesas?.map((item, idx) => (
                  <li key={idx}>
                    <span>{item.finalidade}</span>
                    <span>{item.valor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-container">
              <p className="details"><strong>Bônus:</strong> {viagem.bonus}</p>
              <p className="details"><strong>Retorno:</strong> {viagem.retorno}</p>
              <p className="details"><strong>KMs rodados:</strong> {viagem.kms} kms</p>
              <p className="details"><strong>Valor Recebido:</strong> R$ {viagem.valorFinal ? viagem.valorFinal.toFixed(2) : '0.00'} </p>
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
              >
                ✕
              </button>
            </div>
            <ViagemFinalizar 
              viagemId={viagem.id}
              onViagemFinalizada={handleViagemFinalizada}
              onCancelar={handleFecharFinalizar}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ViagemCard