const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// Configuração do MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Permitir que o Express entenda JSON
app.use(express.json());

// Rota GET para buscar usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM login', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    } else {
      res.json(results);
    }
  });
});

// Rota POST para inserir um novo usuário
app.post('/login', (req, res) => {
  console.log('Requisição recebida:', req.body); // Adicione isso para depuração
  const { nome, sobrenome, email_pai, idade, senha } = req.body;

  const sql = 'INSERT INTO login (nome, sobrenome, email_pai, idade, senha) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, sobrenome, email_pai, idade, senha], (err, results) => {
      if (err) {
          console.error('Erro ao inserir usuário:', err);
          return res.status(500).json({ error: 'Erro ao inserir usuário' });
      }
      res.status(201).json({ message: 'Usuário inserido com sucesso', userId: results.insertId });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
