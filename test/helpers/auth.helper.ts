import request from 'supertest';
import App  from '../../app';
const app = new App().app

const signin = async (user: { email?: string; password?: string }) => {
    const userRegistered = await request(app)
        .post('/users/register')
        .send(user);
    return userRegistered;
};

const signup = async (user: { email?: string; password?: string }) => {
    const userLogged = await request(app).post('/users/login').send(user);
    return userLogged;
};

export { signin, signup };
