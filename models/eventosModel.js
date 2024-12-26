const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD, // Configurado no .env
    database: process.env.DB_NAME
});

// Função para adicionar um evento ao banco de dados
const addEvento = (evento, callback) => {
    const query = `
        INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, ProjetoID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [
        evento.NomeEvento,
        evento.DataEvento,
        evento.LocalEvento,
        evento.ProjetoID
    ];

    connection.execute(query, values, callback);
};

// Função para buscar todos os eventos
const getAllEventos = (callback) => {
    const query = `
        SELECT 
            e.EventoID, 
            e.NomeEvento, 
            e.DataEvento, 
            e.LocalEvento, 
            e.ProjetoID, 
            p.NomeProjeto 
        FROM 
            TbEventos e
        LEFT JOIN 
            TbProjeto p ON e.ProjetoID = p.ProjetoID
    `;
    connection.query(query, callback);
};

// Exporta as funções
module.exports = {
    addEvento,
    getAllEventos
};
