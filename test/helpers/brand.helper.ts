import request from 'supertest';
import { APP } from '../../src/app';

const create = async (data:{name:string}) => {
    const newBrand = await request(APP)
        .post('/api/v1/inventory/brand')
        .send(data);
    return newBrand;
};

const createInvalid = async () => {
    const newBrand = await request(APP)
        .post('/api/v1/inventory/brand')
        .send();
    return newBrand;
};

const update = async (data: { name: string }, id:string) => {
    const newBrand = await request(APP)
        .patch(`/api/v1/inventory/brand/${id}`)
        .send(data);
    return newBrand;
};

const updateInvalid = async (data: {data:string, }, id:string) => {
    const newBrand = await request(APP)
        .patch(`/api/v1/inventory/brand/${id}`)
        .send(data);
    return newBrand;
};

const getall = async () => {
    const foundBrand = await request(APP)
        .get('/api/v1/inventory/brand')
    return foundBrand;
};

const signup = async (user: { name?: string; email?: string; password?: string }) => {
    const userLogged = await request(APP).post('/api/v1/auth/signup').send(user);
    return userLogged;
};

export { create, update, updateInvalid, createInvalid, getall, signup };