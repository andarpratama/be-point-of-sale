import request from 'supertest';
import { IUserRegister } from '../src/interfaces/IUserRegister'
import { IUserLogin } from '../src/interfaces/IUserLogin'
import { signin, signup } from './helpers/auth.helper';
import { UserModel } from "../src/models/user.model";
import { infoUser, infoUserMissingToken } from "./helpers/user.helper";

describe('GET /users/:userID/detail - User Info Endpoint', () => {
    let userLoginResult: request.Response;
    beforeEach(async () => {
        const userRegistered = await signup({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test123'
        } as IUserRegister);
        expect(userRegistered.status).toEqual(201);
    });
    beforeEach(async () => {
        const userLogged = await signin({
            email: 'test@gmail.com',
            password: 'test123'
        } as IUserLogin);
       expect(userLogged.status).toEqual(200);
       userLoginResult = userLogged
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
   
   // TODO: Testing can get detail
    it('Should be able to see user info', async () => {
       const userInfo = await infoUser(
          userLoginResult.body.data.User,
          userLoginResult.body.data.Authorization
       );
      //   expect(userInfo.status).toEqual(200);
        expect(userInfo.body).toEqual({
            success: true,
            statusCode: 200,
            responseStatus: 'Status OK',
            message: 'Get Detail User',
            data: userInfo.body.data
        });
    });
    it(`Should can handle the error, if user doesn't input their bearer token for authorization`, async () => {
        const userInfo = await infoUserMissingToken(
          userLoginResult.body.data.Authorization
        );
        expect(userInfo.status).toEqual(401);
        expect(userInfo.body).toEqual({
            success: false,
            message: 'Missing Access Token: Please input your access token',
            error: { name: 'Missing Access Token' },
            status: 'Unauthorized',
            statusCode: 401
        });
    });
    it(`Should can handle the error, if user doesn't input their bearer token for authorization correctly`, async () => {
        const userInfo = await infoUser(
            userLoginResult.body.data.userID,
            userLoginResult.body.data.Authorization.replace('ey', '')
        );
        expect(userInfo.status).toEqual(401);
        expect(userInfo.body).toEqual({
            success: false,
            message: 'JsonWebTokenError: Invalid access token, please check the validity of your access token',
            error: { name: 'JsonWebTokenError', message: 'invalid token' },
            status: 'Unauthorized',
            statusCode: 401
        });
    });
});


describe('GET /users/:userID/detail - User Update Endpoint', () => {
   let userLoginResult: request.Response;
    beforeEach(async () => {
        const userRegistered = await signup({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test123'
        } as IUserRegister);
        expect(userRegistered.status).toEqual(201);
    });
    beforeEach(async () => {
        const userLogged = await signin({
            email: 'test@gmail.com',
            password: 'test123'
        } as IUserLogin);
       expect(userLogged.status).toEqual(200);
       userLoginResult = userLogged
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
   
   
})

// TODO: Testing can update

// TODO: Testing update input required

// TODO: Testing update input valid input 

// TODO: Testing can delete