const Registro = require('../models/registroModel'); // Certifique-se de que esse arquivo está correto

const registroController = {
    // Criar um novo registro
    createRegistro: (req, res) => {
        const { UsuarioID, ProjetoID, Descricao, DataRegistro } = req.body;
        
        // Validação simples
        if (!UsuarioID || !ProjetoID || !Descricao || !DataRegistro) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const novoRegistro = { UsuarioID, ProjetoID, Descricao, DataRegistro };
        
        Registro.create(novoRegistro, (err, registroId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Registro criado com sucesso', registroId });
        });
    },

    // Obter um registro por ID
    getRegistroById: (req, res) => {
        const registroId = req.params.id;

        Registro.findById(registroId, (err, registro) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!registro) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            res.json({ registro });
        });
    },

    // Obter todos os registros
    getAllRegistros: (req, res) => {
        Registro.getAll((err, registros) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ registros });
        });
    },

    // Atualizar um registro
    updateRegistro: (req, res) => {
        const registroId = req.params.id;
        const { UsuarioID, ProjetoID, Descricao, DataRegistro } = req.body;

        const registroAtualizado = { UsuarioID, ProjetoID, Descricao, DataRegistro };

        Registro.update(registroId, registroAtualizado, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
    },

    // Deletar um registro
    deleteRegistro: (req, res) => {
        const registroId = req.params.id;

        Registro.delete(registroId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Registro deletado com sucesso' });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'cadastrarFotos.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const registroId = req.params.id;

        Registro.findById(registroId, (err, registro) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!registro) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            res.json({ registro });
        });
    }
};

module.exports = registroController;
