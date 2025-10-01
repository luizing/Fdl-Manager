import { useState, useEffect } from 'react';
import api from '../../services/api'; 
import ViagemCard from './Components/ViagemCard';
import NovaViagem from './Components/NovaViagem';
import FiltroViagens from './Components/FiltroViagens';
import './style.css';

function Viagem() {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarNovaViagem, setMostrarNovaViagem] = useState(false);
  const [criandoViagem, setCriandoViagem] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('hoje'); // hoje, abertas, todas

  // Função para obter a data de hoje no formato YYYY-MM-DD
  const getDataHoje = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };

  async function getViagens() {
    setLoading(true);
    try {
      let url = '';
      
      // Constrói a URL baseada no filtro ativo
      switch(filtroAtivo) {
        case 'hoje':
          url = `/viagem/data/${getDataHoje()}`; // viagem/data/hoje
          break;
        case 'abertas':
          url = '/viagem/abertas'; // viagem/abertas
          break;
        case 'todas':
          url = '/viagem'; // viagem/
          break;
        default:
          url = `/viagem/${getDataHoje()}`;
      }

      console.log('Buscando viagens com URL:', url);
      const response = await api.get(url);  
      setViagens(response.data); 
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao buscar viagens');
      setLoading(false);
    }
  }

  const handleFiltroChange = (novoFiltro) => {
    // Atualiza o estado diretamente - não precisa de estado interno no FiltroViagens
    setFiltroAtivo(novoFiltro);
  };

  const handleAbrirNovaViagem = () => {
    setMostrarNovaViagem(true);
  };

  const handleFecharNovaViagem = () => {
    setMostrarNovaViagem(false);
  };

  const handleNovaViagem = async (dadosViagem) => {
    setCriandoViagem(true);
    try {
      const response = await api.post('/viagem', dadosViagem);
      setMostrarNovaViagem(false);
      alert('Viagem criada com sucesso!');
      await getViagens(); // Recarrega com o filtro atual
    } catch (error) {
      alert('Erro ao criar viagem: ' + (error.response?.data?.message || error.message));
    } finally {
      setCriandoViagem(false);
    }
  };

  useEffect(() => {
    getViagens();
  }, [filtroAtivo]); // Recarrega quando o filtro muda

  if (loading) return <p>Carregando viagens...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='box'>
      <div className='viagem-container'>
        <div className="viagem-header">
          <h2 className='viagem-titulo'>Viagens</h2>
        </div>

        {/* Componente de Filtros - Agora totalmente controlado */}
        <FiltroViagens 
          onFiltroChange={handleFiltroChange}
          loading={loading}
          filtroAtivo={filtroAtivo} // Passa o estado atual como prop
        />
        
        <div className="viagem-listagem">
          {viagens.length === 0 ? (
            <div className="sem-viagens">
              <p>Nenhuma viagem encontrada.</p>
            </div>
          ) : (
            viagens.map((viagem) => (
              <ViagemCard key={viagem.id} viagem={viagem} />
            ))
          )}
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