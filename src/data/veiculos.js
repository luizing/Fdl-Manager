// veiculos.js
export const veiculos = {
    1: "Trucado",
    2: "Vermelho", 
    3: "Toco"
};

// Função auxiliar para obter o nome do veículo
export const getNomeVeiculo = (veiculoId) => {
    return veiculos[veiculoId] || `Veículo ${veiculoId}`;
};