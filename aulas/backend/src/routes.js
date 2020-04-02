const express = require('express');
const crypto = require('crypto') // para criptografar
const connection = require('./database/connection');
const routes = express.Router();
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController');
const {celebrate, Segments, Joi} = require('celebrate'); // para fazer validação , npm install celebrate a vali é feita pelo JOY o celebrate realiza a integração com o express



routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),SessionController.create) // login no sistema


routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({ 
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(10),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);
// veja acima ele adicionou o celebrate e tem que vim antes do ongController apra a validação funcionar
// olhe no app.js
routes.get('/ongs',  OngController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required().min(25).max(50),
        valor: Joi.number().required(),
    }),

}), IncidentController.create )


routes.get('/incidents', celebrate({ // tornando obrigatorio o numero da pagina, esta no IncidentController  na linha 14
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index )


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)



routes.get('/profile', celebrate({ // veja como aqui é usado o HEADERS, pq é para verificar se uuario passou o ling e ali em cima é usado o body para egar os cmapos
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);


module.exports = routes;