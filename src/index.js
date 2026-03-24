const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

const pool = require('./config/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//listar
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(result.rows);
        console.log("Dados buscados com sucesso", result.rows);
    } catch (error) {
        console.error("erro ao buscar os dados", error);
        res.status(500).send({ error: error.message });
    }
});
//cadastrar
app.post('/cadastrar', async (req, res) => {
    const { email, numero, dataNascimento, nome } = req.body;
    try {
        const queryText = 'INSERT INTO users (email, numero, data_nascimento, nome) VALUES ($1, $2, $3, $4)';
        const values = [email, numero, dataNascimento, nome];

        await pool.query(queryText, values);


        res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
    }
    catch (error) {
        console.error("Erro ao inserir os dados", error);
        res.status(500).send({ error: error.message });
    }
});
//deletar
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
//editar
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { email, numero} = req.body;
    try {
        await pool.query('UPDATE users SET  email = $1, numero = $2, WHERE id = $3', [email, numero, id]);
        res.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
