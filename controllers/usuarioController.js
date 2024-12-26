const Usuario = require('../models/usuarioModel');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  Usuario.getById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results[0]);
    }
  });
};

exports.createUsuario = (req, res) => {
  const newUsuario = req.body;
  Usuario.create(newUsuario, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...newUsuario });
    }
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const updatedUsuario = req.body;
  Usuario.update(id, updatedUsuario, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...updatedUsuario });
    }
  });
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
};
