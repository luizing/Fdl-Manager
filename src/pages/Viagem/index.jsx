import { useState, useEffect } from 'react';
import api from '../../services/api'; 
import ViagemCard from './Components/ViagemCard';
import './style.css';

function Viagem() {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getViagens() {
    try {
      const response = await api.get('/viagem');  
      setViagens(response.data); 
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao buscar viagens');
      setLoading(false);
    }
  }

  useEffect(() => {
    getViagens();
  }, []);

  if (loading) return <p>Carregando viagens...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='box'>
        <div className='viagem-container'>
          <h2 className='viagem-titulo'>Viagens</h2>
          <div className="viagem-listagem">
            {viagens.map((viagem) => (
              <ViagemCard key={viagem.id} viagem={viagem} />
            ))}
          </div>
        </div>
      </div>
  );
}

export default Viagem;
