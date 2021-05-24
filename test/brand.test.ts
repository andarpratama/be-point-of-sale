import { BrandModel } from "../src/models/brand.model";
import { create, updateInvalid, deleteBrand, getOne, createInvalid, update, getall } from './helpers/brand.helper';


describe('POST /inventory/brand - Brand Create Endpoint', () => {
   afterEach(async () => {
        await BrandModel.deleteMany();
   });

   it('Should be able to create new brand', async () => {
        const newBrand = await create({name: 'BrandTest'});
        expect(newBrand.status).toEqual(201);
        expect(newBrand.body).toEqual({
            success: true,
            statusCode: 201,
            responseStatus: 'Status OK',
            message: 'Brand BrandTest Created',
            data: newBrand.body.data
        });
   });

   it('Should can handle the error, if doesnt input body', async () => {
        const newBrand = await createInvalid();
        expect(newBrand.status).toEqual(422);
        expect(newBrand.body).toEqual({
            success: false,
            message: 'Input body Required: Please input data in body',
            error: { name: 'Input body Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
   });
    
});

describe('GET /inventory/brand - Brand Getall Endpoint', () => {
   beforeEach(async () => {
        const newBrand = await create({name: 'BrandTest1'});
        expect(newBrand.status).toEqual(201);
   });

   beforeEach(async () => {
        const newBrand = await create({name: 'BrandTest2'});
        expect(newBrand.status).toEqual(201);
   });
   
   afterEach(async () => {
        await BrandModel.deleteMany();
   });

   it('Should be able to register', async () => {
        const foundAllBrand = await getall();
        expect(foundAllBrand.status).toEqual(200);
        expect(foundAllBrand.body).toEqual({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Success Find All Brand",
            data: foundAllBrand.body.data
        });
   });
    
});


describe('GET /inventory/brand/:id - Brand Get One Endpoint', () => {
   let idBrand:string
   beforeEach(async () => {
        const newBrand = await create({name: 'BrandTest1'});
        expect(newBrand.status).toEqual(201);
        idBrand = newBrand.body.data._id
   });
   
   afterEach(async () => {
        await BrandModel.deleteMany();
   });

   it('Should be able to register', async () => {
        const foundOneBrand = await getOne(idBrand);
        expect(foundOneBrand.status).toEqual(200);
        expect(foundOneBrand.body).toEqual({
            success: true,
            statusCode: 200,
            responseStatus: 'Status OK',
            message: 'Success Find One Brand',
            data: foundOneBrand.body.data
        });
   });
    
});

describe('PATCH /inventory/brand - Brand Update Endpoint', () => {
   let brandResultId:any
   beforeEach(async () => {
        const newBrand = await create({name: 'BrandTest1'});
        expect(newBrand.status).toEqual(201);
        brandResultId = newBrand.body.data._id
   });
   
   afterEach(async () => {
        await BrandModel.deleteMany();
   });

   it('Should be able to update brand', async () => {
        const updatedBrand = await update({name: 'BrandTest12'}, brandResultId);
        expect(updatedBrand.status).toEqual(201);
        expect(updatedBrand.body).toEqual({
            success: true,
            statusCode: 201,
            responseStatus: 'Status OK',
            message: `Success edit brand name to ${updatedBrand.body.data.name}`,
            data: updatedBrand.body.data
        });
   });

   it('Should can handle the error, if doesnt input body', async () => {
        const updateInv = await updateInvalid(brandResultId);
        expect(updateInv.status).toEqual(422);
        expect(updateInv.body).toEqual({
            success: false,
            message: 'Input body Required: Please input data in body',
            error: { name: 'Input body Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
   });
});


describe('DELETE /inventory/brand/:id - Brand Delete Endpoint', () => {
   let idBrand:string
   beforeEach(async () => {
        const newBrand = await create({name: 'BrandTest1'});
        expect(newBrand.status).toEqual(201);
        idBrand = newBrand.body.data._id
   });
   
   afterEach(async () => {
        await BrandModel.deleteMany();
   });

   it('Should be able to delete brand', async () => {
        const foundOneBrand = await deleteBrand(idBrand);
        expect(foundOneBrand.status).toEqual(200);
        expect(foundOneBrand.body).toEqual({
            success: true,
            statusCode: 200,
            responseStatus: 'Status OK',
            message: 'Delete Inventory Brand',
            data: foundOneBrand.body.data
        });
   });
    
});