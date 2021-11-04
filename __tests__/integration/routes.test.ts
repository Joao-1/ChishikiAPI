import request from 'supertest';
import App from '../../src/app';
import truncate from '../utils/truncate';
import db from '../utils/database/getDatabase';
import { Server } from 'http';

const app = new App();
let server: Server;
let httpVerbs: request.SuperTest<request.Test>;

(async () => {
    await app.load();
    server = app.start(3000);
    httpVerbs = request(server);
})();


describe('Guild operations', () => {
    it('should receive a code 201 when register a new guild.', async () => {
        const registerGuildResponse = await httpVerbs.post('/guild').send({
            id: '751646711251730452',
        });

        expect(registerGuildResponse.status).toBe(201);
    });

    it('should receive a list of guilds.', async () => {
        const getGuildsResponse = await httpVerbs.get('/guild');
        expect(getGuildsResponse.body.guilds);
    });
});

afterAll(async () => {
    await truncate(db.sequelize.models);
    db.sequelize.close();
    server.close();
});
