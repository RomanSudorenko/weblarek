import type { IApi, IProductsResponse, TOrder, IOrderResponse } from '../types/index';

export class ShopApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get('/product/');
    }

    createOrder(order: TOrder): Promise<IOrderResponse> {
        return this.api.post('/order/', order);
    }
}
