const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',             
  password: 'M@riC2804',        
  database: 'clicando', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Criando uma conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados realizada com sucesso!');
    connection.release(); // Libera a conexão
  }
});

module.exports = pool; // Exporta o pool de conexões para uso em outras partes do código
