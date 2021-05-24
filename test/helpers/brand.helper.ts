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

const updateInvalid = async (id:string) => {
    const newBrand = await request(APP)
        .patch(`/api/v1/inventory/brand/${id}`)
        .send();
    return newBrand;
};

const getall = async () => {
    const foundBrand = await request(APP)
        .get('/api/v1/inventory/brand')
    return foundBrand;
};

const getOne = async (id:string) => {
    const foundBrand = await request(APP)
        .get(`/api/v1/inventory/brand/${id}`)
    return foundBrand;
};

const deleteBrand = async (id:string) => {
    const foundBrand = await request(APP)
        .delete(`/api/v1/inventory/brand/${id}`)
    return foundBrand;
};

export { create, update, deleteBrand, getOne, updateInvalid, createInvalid, getall };