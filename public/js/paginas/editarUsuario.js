const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);

app.post('/usuario/editarUsuario', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { id } = req.session.usuario;
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (!isValidPhone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.' });
    }

    const query = `
        UPDATE tbusuario
        SET Nome = ?, Email = ?, Telefone = ?
        WHERE UsuarioID = ?
    `;
    const values = [nome, email, telefone, id];

    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar os dados do usuário:', err);
            return res.status(500).json({ error: 'Erro ao atualizar os dados do usuário.' });
        }

        console.log('Usuário atualizado com sucesso:', results);
        res.json({ message: 'Dados atualizados com sucesso!' });
    });
});
