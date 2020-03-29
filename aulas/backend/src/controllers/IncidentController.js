const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const { page = 1} = req.query; // criando esquema de pagina ção

        const [count] = await connection('incidents') // trazendo a contidade total de de incidentes apra mostrar no front
        .count();
        console.log(count)

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // esta fazendo um join para trazer os dados de duas tabelas, o id da tabela de ong é igual ao id da tabela de incidentes 
        .limit(5) // ajustando para trazer 5 incidentes por pagina 
        .offset((page - 1) * 5)
        .select([
            'incidents.*', 
            'ongs.nome', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.cidade', 
            'ongs.uf']); // pega todos os camps de todos os registros se usar só select('*'), depois ele mudou para traga tudo de 1 e tais dados do outro

        res.header('X-Total-Count', count['count(*)']); // quando retornar o  total deitems na tabela retorna pelo header da requisição nnão pelo body

        return res.json(incidents);
    
    },


    async create(req, res){
        const { titulo, descricao, valor} = req.body;
        const ong_id = req.headers.authorization;
        //req.headers; // para pegar qual usuário ta logado

        const [id] = await connection('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id,
        });

        return res.json({id});
    },

    async delete(req, res){
        const { id} = req.params;
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if( incidents.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};