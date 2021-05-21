import { UserModel } from "../src/models/user.model";
import { signin, signup } from './helpers/auth.helper';

describe('POST /auth/signup - User Registration Endpoint', () => {
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to register', async () => {
        const userRegistered = await signup({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test123'
        });
        expect(userRegistered.status).toEqual(201);
        expect(userRegistered.body).toEqual({
            success: true,
            message: 'Success Registration',
            status: 'Created',
            statusCode: 201,
            data: userRegistered.body.data
        });
    });
    it(`Should can handle the error, if user doesn't input their name`, async () => {
        const userRegistered = await signup({
            email: 'test@gmail.com',
            password: 'test123'
        });
        expect(userRegistered.status).toEqual(422)
        expect(userRegistered.body).toEqual({
            success: false,
            message: 'Name Required: Your name is required to perform this action',
            error: { name: 'Name Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error,  if user doesn't input their email`, async () => {
        const userRegistered = await signup({
            name: 'Test',
            password: 'test123'
        });
       expect(userRegistered.status).toEqual(422);
       expect(userRegistered.body).toEqual({
            success: false,
            message: 'Email Required: Your email is required to perform this action',
            error: { name: 'Email Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
   
   it(`Should can handle the error,  if user input invalid email`, async () => {
        const userRegistered = await signup({
            name: 'Test',
            email: 'test',
            password: 'test123'
        });
       expect(userRegistered.status).toEqual(422);
       expect(userRegistered.body).toEqual({
            success: false,
            message: 'Invalid Email: Please input valid Email',
            error: { name: 'Invalid Email' },
            status: 'Unauthorized',
            statusCode: 422
        });
   });
   
    it(`Should can handle the error, if user doesn't input their unique email address`, async () => {
        const userOneRegister = await signup({
            name: 'Test1',
            email: 'test@gmail.com',
            password: 'test123'
        });
        expect(userOneRegister.status).toEqual(201);
        const userTwoRegister = await signup({
            name: 'Test2',
            email: 'test@gmail.com',
            password: 'test123'
        });
       
        expect(userTwoRegister.status).toEqual(422);
        expect(userTwoRegister.body).toEqual({
            success: false,
            message: 'MongoError: Sorry this data has been used by another user, please enter a unique data',
            error: {
               driver: true,
               name: 'MongoError',
               index: 0,
               code: 11000,
               keyPattern: { email: 1 },
               keyValue: { email: 'test@gmail.com' }
            },
            status: 'Unprocessable Entity',
            statusCode: 422
            });
    });
});

describe('POST /auth/signin - User Login Endpoint', () => {
    beforeEach(async () => {
        const userRegistered = await signup({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test123'
        });
        expect(userRegistered.status).toEqual(201);
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to login', async () => {
        const userLogged = await signin({
            email: 'test@gmail.com',
            password: 'test123'
        });
       expect(userLogged.status).toEqual(200);
        expect(userLogged.body).toEqual({
            success: true,
            message: 'Login Success',
            data: {
                User: userLogged.body.data.User,
                Authorization: userLogged.body.data.Authorization,
                expiresIn: 3600
            },
            status: 'OK',
            statusCode: 200,
        });
    });
   
    it(`Should can handle the error, if user doesn't input their email`, async () => {
        const userLogged = await signin({
            password: 'test123'
        });
        expect(userLogged.status).toEqual(422);
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Email is Required: Your email is required to perform this action',
            error: { name: 'Email is Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
   
    it(`Should can handle the error, if user doesn't input their password`, async () => {
        const userLogged = await signin({
            email: 'test@gmail.com',
        });
        expect(userLogged.status).toEqual(422);
        
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Password is Required: Your password is required to perform this action',
            error: { name: 'Password is Required' },
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
   
    it(`Should can handle the error, if user doesn't input their valid email address`, async () => {
        const userLogged = await signin({
            email: 'tes',
            password: 'test123'
        });
        expect(userLogged.status).toEqual(422);
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Invalid Email: Please input valid Email',
            error: { name: 'Invalid Email' },
            status: 'Unauthorized',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user input wrong email and correct password`, async () => {
        const userLogged = await signin({
            email: 'test123@gmail.com',
            password: 'test123'
        });
       expect(userLogged.status).toEqual(401);
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Email not Registered: Your email is not registerd',
            error: { name: 'Email not Registered' },
            status: 'Unauthorized',
            statusCode: 401
        });
    });
    it(`Should can handle the error, if user input correct email and wrong password`, async () => {
        const userLogged = await signin({
            email: 'test@gmail.com',
            password: 'test1234'
        });
        expect(userLogged.status).toEqual(401);
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Invalid Password: Your password is wrong',
            error: { name: 'Invalid Password' },
            status: 'Unauthorized',
            statusCode: 401
        });
    });
});
