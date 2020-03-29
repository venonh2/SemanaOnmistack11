const connection = require('../database/connection');
const crypto = require('crypto')
module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*'); // pega todos os camps de todos os regis

        return res.json(ongs);
    },


    async create(req, res) {
        const { nome, email, whatsapp, cidade, uf } = req.body; // ele faz a desestruturação para ter cada dado em variavel separada, e garante que o user n envia dado que ele n quer

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        })

        return res.json({ id });
    }
};