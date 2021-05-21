jest.useFakeTimers()
import request from 'supertest';
import { IUserRegister } from '../src/interfaces/IUserRegister'
import { IUserLogin } from '../src/interfaces/IUserLogin'
import { signin, signup } from './helpers/auth.helper';
import { UserModel } from "../src/models/user.model";

import { sum } from "./helpers/test.helper";

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('GET /users/:userID/info - User Info Endpoint', () => {
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
        
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
   
   // TODO: Testing can get detail
   //  it('Should be able to see user info', async () => {
   //      const userInfo = await infoUser(
   //          userLoginResult.body.data.userID,
   //          userLoginResult.body.data.bearerToken
   //      );
   //      expect(userInfo.status).toEqual(200);
   //      expect(userInfo.body).toEqual({
   //          success: true,
   //          message: 'User Found',
   //          data: userInfo.body.data,
   //          status: 'OK',
   //          statusCode: 200
   //      });
   //  });
   //  it(`Should can handle the error, if user doesn't input their bearer token for authorization`, async () => {
   //      const userInfo = await request(app).get(
   //          `/users/${userLoginResult.body.data.userID}/info`
   //      );
   //      expect(userInfo.status).toEqual(401);
   //      expect(userInfo.body).toEqual({
   //          success: false,
   //          message: 'Missing Access Token: Please input your access token',
   //          error: { name: 'Missing Access Token' },
   //          status: 'Unauthorized',
   //          statusCode: 401
   //      });
   //  });
   //  it(`Should can handle the error, if user doesn't input their bearer token for authorization correctly`, async () => {
   //      const userInfo = await infoUser(
   //          userLoginResult.body.data.userID,
   //          userLoginResult.body.data.bearerToken.replace('ey', '')
   //      );
   //      expect(userInfo.status).toEqual(401);
   //      expect(userInfo.body).toEqual({
   //          success: false,
   //          message:
   //              'JsonWebTokenError: Invalid access token, please check the validity of your access token',
   //          error: { name: 'JsonWebTokenError', message: 'invalid token' },
   //          status: 'Unauthorized',
   //          statusCode: 401
   //      });
   //  });
   //  it(`Should can handle the error, if user doesn't input their own bearer token for authorization`, async () => {
   //      const userRegister = await registerUser({
   //          username: 'john.doe',
   //          email: 'john-doe@gmail.com',
   //          password: '12345'
   //      } as IUser);
   //      expect(userRegister.status).toEqual(201);
   //      const userLogin = await loginUser({
   //          username: 'john.doe',
   //          email: 'john-doe@gmail.com',
   //          password: '12345'
   //      } as IUser);
   //      expect(userLogin.status).toEqual(200);
   //      const userInfo = await infoUser(
   //          userLoginResult.body.data.userID,
   //          userLogin.body.data.bearerToken
   //      );
   //      expect(userInfo.status).toEqual(403);
   //      expect(userInfo.body).toEqual({
   //          success: false,
   //          message:
   //              'Forbidden Access: Sorry, access is restricted, make sure you use your own access token',
   //          error: { name: 'Forbidden Access' },
   //          status: 'Forbidden',
   //          statusCode: 403
   //      });
   //  });
});



// TODO: Testing can update

// TODO: Testing update input required

// TODO: Testing update input valid input 

// TODO: Testing can delete