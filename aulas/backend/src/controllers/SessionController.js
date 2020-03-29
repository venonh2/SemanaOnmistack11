const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('nome')
        .first();

        if(!ong) {
            return Response.status(400).json({
                error: 'Ong com essa id não encontrada'
            })
        }

        return res.json(ong);
    }
}