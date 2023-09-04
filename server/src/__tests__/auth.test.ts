import supertest from "supertest";
import initializeServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = initializeServer();

describe('auth', () => {

    beforeAll(async () =>  {
        const mongoServer = await MongoMemoryServer.create();
        console.log(mongoServer.getUri())
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('Saving new user', () => {
        it('should return the saved user', async () => {
            
            const payload = {
                email: 'test@email.com',
                firstName: 'test',
                lastName: 'test',
                password: 'Password123',
                allowExtraEmails: true
            };
            
            const res = await supertest(app)
                            .post('/auth/register')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .expect(201);
        });

        it('should return te logged in user', async () => {
            
            const payload = { email: 'test@email.com', password: 'Password123' };

            await supertest(app).post('/auth/login').send(payload).expect(200)
        });
    });
    /*it('should work', async () => {
        await supertest(app).get('/auth/login?email=kenansultanic0805@gmail.com&password=Covid-19').expect(400);
    })*/
})