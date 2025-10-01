import { useState, useEffect } from 'react';
import api from '../../services/api'; 
import ViagemCard from './Components/ViagemCard';
import NovaViagem from './Components/NovaViagem';
import './style.css';

function Viagem() {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarNovaViagem, setMostrarNovaViagem] = useState(false);
  const [criandoViagem, setCriandoViagem] = useState(false);

  // Função para obter a data de hoje no formato YYYY-MM-DD
  const getDataHoje = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };

  const getDataHojeBr = () => 
    {return new Date().toLocaleDateString('pt-BR');}

  async function getViagens() {
    try {
      const dataHoje = getDataHoje();
      // Faz o GET com a data de hoje como parâmetro
      const response = await api.get(`/viagem/data/${dataHoje}`);  
      setViagens(response.data); 
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao buscar viagens');
      setLoading(false);
    }
  }

  const handleAbrirNovaViagem = () => {
    setMostrarNovaViagem(true);
  };

  const handleFecharNovaViagem = () => {
    setMostrarNovaViagem(false);
  };

  const handleNovaViagem = async (dadosViagem) => {
    setCriandoViagem(true);
    
    try {
      console.log('Criando nova viagem:', dadosViagem);
      const response = await api.post('/viagem', dadosViagem);
      console.log('Resposta da API:', response.data);
      setMostrarNovaViagem(false);
      alert('Viagem criada com sucesso!');
      await getViagens(); // Recarrega as viagens de hoje
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      alert('Erro ao criar viagem: ' + (error.response?.data?.message || error.message));
    } finally {
      setCriandoViagem(false);
    }
  };

  useEffect(() => {
    getViagens();
  }, []);

  if (loading) return <p>Carregando viagens de hoje...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='box'>
      <div className='viagem-container'>
        <div className="viagem-header">
          <h2 className='viagem-titulo'>Viagens de Hoje ({getDataHojeBr()})</h2>
        </div>
        
        <div className="viagem-listagem">
          {viagens.map((viagem) => (
            <ViagemCard key={viagem.id} viagem={viagem} />
          ))}
        </div>
      </div>

      {/* Botão FIXO no canto inferior direito */}
      <button 
        onClick={handleAbrirNovaViagem}
        className="btn-nova-viagem-fixed"
        title="Criar nova viagem"
      >
        <span>+</span>
        <span>Nova Viagem</span>
      </button>

      {/* Modal para nova viagem */}
      {mostrarNovaViagem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nova Viagem</h3>
              <button 
                className="btn-fechar"
                onClick={handleFecharNovaViagem}
                disabled={criandoViagem}
              >
                ✕
              </button>
            </div>
            <NovaViagem 
              onNovaViagem={handleNovaViagem}
              onCancelar={handleFecharNovaViagem}
              loading={criandoViagem}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Viagem;