import { useState } from 'react';
import './ViagemCard.css'

function ViagemCard({ viagem }) {  
  return (
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
        <p className="details"><strong>Veículo:</strong> {viagem.veiculoId}</p>
      </div>

      {!viagem.finalizada && (
        <div className="finalizar-viagem">
          <button className="btn-finalizar">
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

          <div className="details-container">
            <p className="details"><strong>Bônus:</strong> {viagem.bonus}</p>
            <p className="details"><strong>Retorno:</strong> {viagem.retorno}</p>
            <p className="details"><strong>KMs rodados:</strong> {viagem.kms} kms</p>
            <p className="details"><strong>Valor Recebido:</strong> R$ {viagem.valorFinal.toFixed(2)} </p>
          </div>
        </div>
      )}
    </div>
)
}

export default ViagemCard