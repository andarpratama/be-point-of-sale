import request from 'supertest';
import { APP } from '../../src/app';

// COMMENT: Valid endpoint
const infoUser = async (userId: string, bearerToken: string) => {
    const userInfo = await request(APP)
        .get(`/api/v1/user/${userId}/detail`)
        .set('Authorization', `${bearerToken}`)
    return userInfo;
};

// COMMENT: InValid endpoint
const infoUserMissingToken = async (userId: string) => {
    const userInfo = await request(APP)
        .get(`/api/v1/user/detail/${userId}`)
    return userInfo;
};

export { infoUser, infoUserMissingToken };
