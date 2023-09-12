import supertest from "supertest";
import initializeServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";


const app = initializeServer();

const registrationPayload = {
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'test',
    password: 'Password123',
    allowExtraEmails: true
};

const loginPayload = {
    email: 'test@email.com',
    password: 'Password123'
};


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

    describe('registration of new user', () => {

        it('should return the saved user, an access token and a refresh token', async () => {
            
            const res = await supertest(app)
                                .post('/auth/register')
                                .send(registrationPayload)
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .expect(201);

            expect(res.body.accessToken).toBeDefined();
            expect(res.body.refreshToken).toBeDefined();
            expect(res.body.user).toBeDefined();
        });

        describe('non valid form data', () => {

            it('should return a "missing one or more parameters" message', async () => {
                
                const { email, ...payload } = registrationPayload; 

                const res = await supertest(app)
                                .post('/auth/register')
                                .send(payload)
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .expect(422);

                expect(res.body.message).toBeDefined();
                expect(res.body.message).toBe('Missing one or more required parameters');
            });

            it('should return a "email already in use" message', async () => {

                const res = await supertest(app)
                                .post('/auth/register')
                                .send(registrationPayload)
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .expect(409);

                expect(res.body.message).toBeDefined();
                expect(res.body.message).toBe('Email already in use');
            });

            it('should return a "weak password" message', async () => {

                const res = await supertest(app)
                                .post('/auth/register')
                                .send({  ...registrationPayload, password: 'weak_password' })
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
                                .expect(409);

                expect(res.body.message).toBeDefined();
                expect(res.body.message).toBe('Weak password');
            });

        });

        describe('logging in a user', () => {

            it('should return te logged in user', async () => {
                
                const res = await supertest(app).post('/auth/login').send(loginPayload).expect(200);

                expect(res.body.accessToken).toBeDefined();
                expect(res.body.refreshToken).toBeDefined();
                expect(res.body.user).toBeDefined();
            });
        });

    });

});