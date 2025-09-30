import './ViagemCard.css'

function ViagemCard({ viagem }) {
  return (
    <div className="viagem-card">
      <h3 className="viagem-titulo">Viagem #{viagem.id}</h3>

      <p>
        <strong>Status:</strong>{" "}
        {viagem.finalizada ? (
          <span className="status finalizada">Finalizada</span>
        ) : (
          <span className="status aberta">Em aberto</span>
        )}
      </p>

      <p><strong>Data:</strong> {viagem.data}</p>
      <p><strong>Rota:</strong> {viagem.rota}</p>
      <p><strong>Carga:</strong> {viagem.carga}</p>
      <p><strong>Veículo:</strong> {viagem.veiculoId}</p>

      {viagem.finalizada && (
        <div className="detalhes-finalizada">
          <div>
            <strong>Vendas:</strong>
            <ul>
              {viagem.precos?.map((item, idx) => (
                <li key={idx}>
                  {item.quantidade} .....  R$ {item.valor.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Avariados:</strong>
            <ul>
              {viagem.avariados?.map((item, idx) => (
                <li key={idx}>
                  {item.quantidade} ({item.tipo}s)
                </li>
              ))}
            </ul>
          </div>

          <p><strong>KMs rodados:</strong> {viagem.kms}</p>
          <p><strong>Bônus:</strong> {viagem.bonus}</p>
          <p><strong>Retorno:</strong> {viagem.retorno}</p>
          <p><strong>Valor Recebido:</strong> {viagem.valorFinal} </p>
        </div>
      )}
      
    </div>
  )
}

export default ViagemCard
