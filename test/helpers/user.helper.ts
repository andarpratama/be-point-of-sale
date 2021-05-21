import request from 'supertest';
import { APP } from '../../src/app';

const infoUser = async (userID: string, bearerToken: string) => {
    const userInfo = await request(APP)
        .get(`/api/v1/user/${userID}/detail`)
        .set('Authorization', `${bearerToken}`);
    return userInfo;
};

export { infoUser };
