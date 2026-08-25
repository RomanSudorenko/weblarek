import './scss/styles.scss';

import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { ShopApi } from './components/ShopApi';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

const productsModel = new ProductCatalog();
productsModel.setProducts(apiProducts.items);

const testProduct1 = productsModel.getProducts()[0];
const testProduct2 = productsModel.getProducts()[2];

console.log('Массив товаров из каталога:', productsModel.getProducts());
console.log('Товар по id:', productsModel.getProductById(testProduct1.id));

productsModel.setSelectedProduct(testProduct2);
console.log('Выбранный продукт:', productsModel.getSelectedProduct());

const basketModel = new Basket();

basketModel.addItem(testProduct1);
basketModel.addItem(testProduct2);
console.log('Товары в корзине:', basketModel.getItems());
console.log(`В корзине: ${basketModel.getCount()} товаров, на сумму ${basketModel.getTotal()}`);
console.log('Первый товар есть в корзине:', basketModel.hasItem(testProduct1.id));

basketModel.removeItem(testProduct1);
console.log(
    `После удаления: ${basketModel.getCount()} товаров, на сумму ${basketModel.getTotal()}`,
);
console.log('Удалённый товар есть в корзине:', basketModel.hasItem(testProduct1.id));

basketModel.clear();
console.log('Корзина после очистки:', basketModel.getItems());

const buyerModel = new Buyer();
buyerModel.setData({ payment: 'cash', phone: '+79990999121' });
console.log('Данные покупателя:', buyerModel.getData());
console.log('Ошибки валидации:', buyerModel.validate());

buyerModel.setData({ email: 'test@test.te', address: 'Красная 1' });
console.log('Данные покупателя после заполнения:', buyerModel.getData());
console.log('Ошибки после заполнения:', buyerModel.validate());

buyerModel.clear();
console.log('Данные после очистки:', buyerModel.getData());
console.log('Ошибки после очистки:', buyerModel.validate());

const api = new Api(API_URL);
const shopApi = new ShopApi(api);
const products = await shopApi.getProducts();
console.log('Каталог, полученный с сервера:', products);
