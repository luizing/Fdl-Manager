import './style.css'
import ViagemCard from './Components/ViagemCard';

function Viagem() {
  const viagemAberta = {
    id: 1,
    data: "2025-09-30",
    rota: "Horizonte",
    carga: 500,
    veiculoId: 2,
    finalizada: false
  };

  const viagemFinalizada = {
    id: 2,
    data: "2025-09-15",
    rota: "Serra do Felix",
    carga: 750,
    veiculoId: 1,
    finalizada: true,
    precos: [
      { quantidade: 740, valor: 4 }
    ],
    avariados: [
      { quantidade: 5, tipo: "Quebrado" },
      { quantidade: 5, tipo: "Vazado" }
    ],
    kms: 180,
    bonus: 10,
    retorno: 20,
    valorFinal: 1220
  };

  return (
    <div>
      <h2>Lista de Viagens</h2>
      <ViagemCard viagem={viagemAberta} />
      <ViagemCard viagem={viagemFinalizada} />
    </div>
  );
}

export default Viagem
