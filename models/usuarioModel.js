const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    db.query('SELECT * FROM TbUsuario', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM TbUsuario WHERE UsuarioID = ?', [id], callback);
  },
  create: (usuario, callback) => {
    const sql = `
      INSERT INTO TbUsuario (Nome, DataNascimento, Documento, Genero, Telefone, Email, Senha, Logradouro, Numero, Bairro, Cidade, Estado, CEP, CategoriaID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      usuario.Nome, usuario.DataNascimento, usuario.Documento, usuario.Genero,
      usuario.Telefone, usuario.Email, usuario.Senha, usuario.Logradouro,
      usuario.Numero, usuario.Bairro, usuario.Cidade, usuario.Estado,
      usuario.CEP, usuario.CategoriaID
    ];
    db.query(sql, values, callback);
  },
  update: (id, usuario, callback) => {
    const sql = `
      UPDATE TbUsuario
      SET Nome = ?, DataNascimento = ?, Documento = ?, Genero = ?, Telefone = ?, Email = ?, Senha = ?, Logradouro = ?, Numero = ?, Bairro = ?, Cidade = ?, Estado = ?, CEP = ?, CategoriaID = ?
      WHERE UsuarioID = ?
    `;
    const values = [
      usuario.Nome, usuario.DataNascimento, usuario.Documento, usuario.Genero,
      usuario.Telefone, usuario.Email, usuario.Senha, usuario.Logradouro,
      usuario.Numero, usuario.Bairro, usuario.Cidade, usuario.Estado,
      usuario.CEP, usuario.CategoriaID, id
    ];
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM TbUsuario WHERE UsuarioID = ?', [id], callback);
  },
};

module.exports = Usuario;
