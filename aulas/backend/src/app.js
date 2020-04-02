const express = require('express');
const cors = require('cors');
const { errors} = require('celebrate'); // importando os errors para pdoer saber qual é o erro
const routes = require('./routes');
// JEST ESTA SENDO UTILIZADO PARA REALIZAR TESTS
// DEPOIS QUE NPM INSTALL JEST, npx jest --init par ainicializar
// npm teste , para executar os testes olhe o arquivo Ongcontroller e generateuniqueID, 2 
/*  npm install cross-env, depois la no package.json 
foi posto no test, para poder alterar entre amb de desen e de teste  "test": "cross-env NODE_ENV=test  jest" */ 
// npm install supertest, para poder realizar os test de integração 
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors()); // ele esta sendo usado aqui



app.get('/', (req, res) => {
    return res.send('Olá MUndo')

});

module.exports = app;