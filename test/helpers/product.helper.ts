import request from 'supertest';
import App  from '../../app';
const app = new App().app

// TODO: finishing testing create product
const createProduct = async (user: {
   email?: string;
   password?: string
}) => {
    const userRegistered = await request(app)
        .post('/product/create')
        .send(user);
    return userRegistered;
};

const listProduct = async () => {
    const productList = await request(app).get('/products/list');
    return productList;
};

const detailProduct = async (productID: string) => {
    const productDetail = await request(app).get(
        `/products/${productID}/detail`
    );
    return productDetail;
};

export { listProduct, detailProduct };
