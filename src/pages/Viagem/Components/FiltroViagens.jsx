import React from 'react';
import './FiltroViagens.css';

function FiltroViagens({ onFiltroChange, loading, filtroAtivo }) {
    const handleFiltroClick = (novoFiltro) => {
        onFiltroChange(novoFiltro);
    };

    return (
        <div className="filtro-viagens">
            <h3>Visualizar Viagens</h3>
            
            <div className="filtro-opcoes">
                <div className="botoes-filtro">
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'hoje' ? 'ativo' : ''}`}
                        onClick={() => handleFiltroClick('hoje')}
                        disabled={loading}
                    >
                        📅 Hoje
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'abertas' ? 'ativo' : ''}`}
                        onClick={() => handleFiltroClick('abertas')}
                        disabled={loading}
                    >
                        ⏳ Abertas
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'todas' ? 'ativo' : ''}`}
                        onClick={() => handleFiltroClick('todas')}
                        disabled={loading}
                    >
                        📊 Todas
                    </button>
                </div>
            </div>

            {/* Info do filtro atual */}
            <div className="filtro-info">
                {filtroAtivo === 'hoje' && (
                    <span>📅 Mostrando viagens de hoje ({new Date().toLocaleDateString('pt-BR')})</span>
                )}
                {filtroAtivo === 'abertas' && (
                    <span>⏳ Mostrando viagens em aberto</span>
                )}
                {filtroAtivo === 'todas' && (
                    <span>📊 Mostrando todas as viagens</span>
                )}
            </div>
        </div>
    );
}

export default FiltroViagens;