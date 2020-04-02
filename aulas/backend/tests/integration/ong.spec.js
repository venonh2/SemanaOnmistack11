const request = require('supertest'); // importando o super test para subir a aplicacao 
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('Should be able to create a new ong', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'idvalidode ong') caso vai testar algo que precidsa de login
            .send({
                nome: "DOS",
                email: "brendow@gmail.com",
                whatsapp: "1234567891",
                cidade: "Rio do sul",
                uf: "PR"
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})