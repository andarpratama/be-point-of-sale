import request from 'supertest';
import { APP, PORT } from '../../src/app';

const signin = async (user: { email?: string; password?: string }) => {
    const userRegistered = await request(APP)
        .post('/users/register')
        .send(user);
    return userRegistered;
};

const signup = async (user: { name?: string; email?: string; password?: string }) => {
    const userLogged = await request(APP).post('/api/v1/auth/signup').send(user);
    return userLogged;
};

export { signin, signup };
