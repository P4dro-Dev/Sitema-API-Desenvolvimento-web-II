const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Dados iniciais
let temas = [
    { id: 1, nome: 'Programação', descricao: 'Temas relacionados a programação' },
    { id: 2, nome: 'Design', descricao: 'Temas relacionados a design' }
];

let categorias = [
    { id: 1, temaId: 1, nome: 'Front-end', descricao: 'Categoria para front-end' },
    { id: 2, temaId: 1, nome: 'Back-end', descricao: 'Categoria para back-end' },
    { id: 3, temaId: 2, nome: 'UI', descricao: 'Categoria para User Interface' }
];

// Endpoint /autor
app.get('/autor', (req, res) => {
    res.json({
        nome: "Grupo de alunos",
        email: "grupo@email.com",
        curso: "Desenvolvimento de Software"
    });
});

// Endpoints para Tema
// GET /tema - Listar todos os temas
app.get('/tema', (req, res) => {
    res.json(temas);
});

// GET /tema/:id - Obter um tema específico
app.get('/tema/:id', (req, res) => {
    const tema = temas.find(t => t.id === parseInt(req.params.id));
    if (!tema) return res.status(404).send('Tema não encontrado');
    res.json(tema);
});

// POST /tema - Criar um novo tema
app.post('/tema', (req, res) => {
    const tema = {
        id: temas.length + 1,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    temas.push(tema);
    res.status(201).json(tema);
});

// PUT /tema/:id - Atualizar um tema
app.put('/tema/:id', (req, res) => {
    const tema = temas.find(t => t.id === parseInt(req.params.id));
    if (!tema) return res.status(404).send('Tema não encontrado');

    tema.nome = req.body.nome;
    tema.descricao = req.body.descricao;
    res.json(tema);
});

// DELETE /tema/:id - Remover um tema
app.delete('/tema/:id', (req, res) => {
    const temaIndex = temas.findIndex(t => t.id === parseInt(req.params.id));
    if (temaIndex === -1) return res.status(404).send('Tema não encontrado');

    // Remove também as categorias associadas
    categorias = categorias.filter(c => c.temaId !== parseInt(req.params.id));
    
    const temaRemovido = temas.splice(temaIndex, 1);
    res.json(temaRemovido);
});

// Endpoints para Categorias de Tema
// GET /tema/:id/categorias - Listar categorias de um tema
app.get('/tema/:id/categorias', (req, res) => {
    const temaCategorias = categorias.filter(c => c.temaId === parseInt(req.params.id));
    res.json(temaCategorias);
});

// POST /tema/:id/categorias - Adicionar categoria a um tema
app.post('/tema/:id/categorias', (req, res) => {
    const tema = temas.find(t => t.id === parseInt(req.params.id));
    if (!tema) return res.status(404).send('Tema não encontrado');

    const categoria = {
        id: categorias.length + 1,
        temaId: tema.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    categorias.push(categoria);
    res.status(201).json(categoria);
});

// PUT /categoria/:id - Atualizar uma categoria
app.put('/categoria/:id', (req, res) => {
    const categoria = categorias.find(c => c.id === parseInt(req.params.id));
    if (!categoria) return res.status(404).send('Categoria não encontrada');

    categoria.nome = req.body.nome;
    categoria.descricao = req.body.descricao;
    res.json(categoria);
});

// DELETE /categoria/:id - Remover uma categoria
app.delete('/categoria/:id', (req, res) => {
    const categoriaIndex = categorias.findIndex(c => c.id === parseInt(req.params.id));
    if (categoriaIndex === -1) return res.status(404).send('Categoria não encontrada');

    const categoriaRemovida = categorias.splice(categoriaIndex, 1);
    res.json(categoriaRemovida);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});