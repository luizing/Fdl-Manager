import React from 'react';
import './RelatorioViagem.css';

function RelatorioViagem({ viagem, onFechar }) {
    
    const formatarData = (dataString) => {
        if (!dataString) return '-';
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    const calcularTotalVendido = () => {
        if (!viagem.precos || viagem.precos.length === 0) return 0;
        return viagem.precos.reduce((total, item) => {
            return total + (item.quantidade * item.valor);
        }, 0);
    };

    const calcularTotalDespesas = () => {
        if (!viagem.despesas || viagem.despesas.length === 0) return 0;
        return viagem.despesas.reduce((total, despesa) => {
            return total + despesa.valor;
        }, 0);
    };

    const calcularLucro = () => {
        const totalVendido = calcularTotalVendido();
        const totalDespesas = calcularTotalDespesas();
        return totalVendido - totalDespesas;
    };

    const handleImprimir = () => {
        window.print();
    };

    return (
        <div className="relatorio-overlay">
            <div className="relatorio-container">
                <div className="relatorio-header no-print">
                    <h2>Relatório da Viagem #{viagem.id}</h2>
                    <div className="relatorio-actions">
                        <button onClick={handleImprimir} className="btn-imprimir">
                            🖨️ Imprimir
                        </button>
                        <button onClick={onFechar} className="btn-fechar">
                            ✕ Fechar
                        </button>
                    </div>
                </div>

                <div className="relatorio-content">
                    {/* Cabeçalho do relatório (visível apenas na impressão) */}
                    <div className="print-header">
                        <h1>Relatório da Viagem #{viagem.id}</h1>
                        <p className="print-date">Emitido em: {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>

                    {/* Informações Básicas */}
                    <section className="relatorio-section compact">
                        <h3>Informações da Viagem</h3>
                        <div className="info-grid compact">
                            <div className="info-item">
                                <strong>Data:</strong> {formatarData(viagem.data)}
                            </div>
                            <div className="info-item">
                                <strong>Rota:</strong> {viagem.rota || '-'}
                            </div>
                            <div className="info-item">
                                <strong>Veículo:</strong> {viagem.veiculoId === 1 ? 'Truncado' : 
                                                         viagem.veiculoId === 2 ? 'Carreta' : 
                                                         viagem.veiculoId === 3 ? 'Caminhonete' : 
                                                         `Veículo ${viagem.veiculoId}`}
                            </div>
                            <div className="info-item">
                                <strong>Carga Inicial:</strong> {viagem.carga || 0} garrafões
                            </div>
                        </div>
                    </section>

                    {/* Quilometragem e Cargas */}
                    <section className="relatorio-section compact">
                        <h3>Desempenho</h3>
                        <div className="info-grid compact">
                            <div className="info-item">
                                <strong>Quilometragem:</strong> {viagem.kms || 0} km
                            </div>
                            <div className="info-item">
                                <strong>Bonificação:</strong> {viagem.bonus || 0} garrafões
                            </div>
                            <div className="info-item">
                                <strong>Retorno:</strong> {viagem.retorno || 0} garrafões
                            </div>
                        </div>
                    </section>

                    {/* Vendas */}
                    {viagem.precos && viagem.precos.length > 0 && (
                        <section className="relatorio-section compact">
                            <h3>Vendas Realizadas</h3>
                            <table className="relatorio-table compact">
                                <thead>
                                    <tr>
                                        <th>Quantidade</th>
                                        <th>Valor Unitário</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viagem.precos.map((venda, index) => (
                                        <tr key={index}>
                                            <td>{venda.quantidade}</td>
                                            <td>R$ {venda.valor?.toFixed(2)}</td>
                                            <td>R$ {(venda.quantidade * venda.valor)?.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="total-row">
                                        <td colSpan="2"><strong>Total Vendido:</strong></td>
                                        <td><strong>R$ {calcularTotalVendido().toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                    )}

                    {/* Avariados */}
                    {viagem.avariados && viagem.avariados.length > 0 && (
                        <section className="relatorio-section compact">
                            <h3>Garrafões Avariados</h3>
                            <table className="relatorio-table compact">
                                <thead>
                                    <tr>
                                        <th>Quantidade</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viagem.avariados.map((avariado, index) => (
                                        <tr key={index}>
                                            <td>{avariado.quantidade}</td>
                                            <td>{avariado.tipo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}

                    {/* Despesas */}
                    {viagem.despesas && viagem.despesas.length > 0 && (
                        <section className="relatorio-section compact">
                            <h3>Despesas</h3>
                            <table className="relatorio-table compact">
                                <thead>
                                    <tr>
                                        <th>Finalidade</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viagem.despesas.map((despesa, index) => (
                                        <tr key={index}>
                                            <td>{despesa.finalidade}</td>
                                            <td>R$ {despesa.valor?.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="total-row">
                                        <td><strong>Total Despesas:</strong></td>
                                        <td><strong>R$ {calcularTotalDespesas().toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                    )}

                    {/* Resumo Financeiro */}
                    <section className="relatorio-section compact resumo-financeiro">
                        <h3>Resumo Financeiro</h3>
                        <div className="resumo-grid compact">
                            <div className="resumo-item">
                                <span>Total Vendido:</span>
                                <span>R$ {calcularTotalVendido().toFixed(2)}</span>
                            </div>
                            <div className="resumo-item">
                                <span>Total Despesas:</span>
                                <span>R$ {calcularTotalDespesas().toFixed(2)}</span>
                            </div>
                            <div className="resumo-item lucro">
                                <span><strong>Lucro Líquido:</strong></span>
                                <span><strong>R$ {calcularLucro().toFixed(2)}</strong></span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default RelatorioViagem;