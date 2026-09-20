import './scss/styles.scss';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ShopApi } from './components/ShopApi';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';

import { CatalogCard } from './components/view/CatalogCard';
import { PreviewCard } from './components/view/PreviewCard';
import { BasketCard } from './components/view/BasketCard';
import { BasketView } from './components/view/BasketView';
import { Gallery } from './components/view/Gallery';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { OrderForm } from './components/view/OrderForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';

import type { IProduct, IOrderResponse, TBuyerInput, TOrder } from './types/index';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new Api(API_URL);
const shopApi = new ShopApi(api);

const productsModel = new ProductCatalog(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);

const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const onBuyerInput = events.trigger<TBuyerInput>('buyer:input');

const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const header = new Header(ensureElement<HTMLElement>('.header'), events.trigger('basket:open'));
const modal = new Modal(ensureElement<HTMLElement>('.modal'), events.trigger('modal:close'));
const basketView = new BasketView(
    cloneTemplate<HTMLElement>(basketTemplate),
    events.trigger('order:start'),
);
const orderForm = new OrderForm(
    cloneTemplate<HTMLFormElement>(orderTemplate),
    events.trigger('order:next'),
    (field, value) => onBuyerInput({ field, value }),
);
const contactsForm = new ContactsForm(
    cloneTemplate<HTMLFormElement>(contactsTemplate),
    events.trigger('order:submit'),
    (field, value) => onBuyerInput({ field, value }),
);
const success = new Success(
    cloneTemplate<HTMLElement>(successTemplate),
    events.trigger('success:close'),
);

let isOrderSubmitting = false;

function openModal(content: HTMLElement): void {
    modal.render({ content });
    modal.open();
}

function renderBasket(): HTMLElement {
    const items = basketModel.getItems().map((product, index) => {
        const card = new BasketCard(
            cloneTemplate<HTMLElement>(basketCardTemplate),
            events.trigger('basket:remove', { id: product.id }),
        );

        return card.render({
            index: index + 1,
            title: product.title,
            price: product.price,
        });
    });

    return basketView.render({
        items,
        total: basketModel.getTotal(),
        buttonDisabled: basketModel.getCount() === 0,
    });
}

function renderBuyerForms(): void {
    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();
    const orderErrors = [errors.payment, errors.address].filter(Boolean);
    const contactsErrors = [errors.email, errors.phone].filter(Boolean);

    orderForm.render({
        payment: buyer.payment,
        address: buyer.address,
        valid: orderErrors.length === 0,
        errors: orderErrors.join('. '),
    });

    contactsForm.render({
        email: buyer.email,
        phone: buyer.phone,
        valid: contactsErrors.length === 0,
        errors: contactsErrors.join('. '),
    });
}

events.on('products:changed', () => {
    const cards = productsModel.getProducts().map((product) => {
        const card = new CatalogCard(
            cloneTemplate<HTMLElement>(catalogTemplate),
            events.trigger('card:select', { id: product.id }),
        );

        return card.render({
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
        });
    });

    gallery.render({ items: cards });
});

events.on('product:selected', () => {
    const product = productsModel.getSelectedProduct();
    if (!product) {
        return;
    }

    const inBasket = basketModel.hasItem(product.id);
    let buttonText = 'Купить';

    if (product.price === null) {
        buttonText = 'Недоступно';
    } else if (inBasket) {
        buttonText = 'Удалить из корзины';
    }

    const previewCard = new PreviewCard(
        cloneTemplate<HTMLElement>(previewTemplate),
        events.trigger('product:toggle', { id: product.id }),
    );

    openModal(
        previewCard.render({
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            buttonText,
            buttonDisabled: product.price === null,
        }),
    );
});

events.on('basket:changed', () => {
    header.render({ counter: basketModel.getCount() });
    renderBasket();
});

events.on('buyer:changed', renderBuyerForms);

events.on<Pick<IProduct, 'id'>>('card:select', ({ id }) => {
    const product = productsModel.getProductById(id);
    if (!product) {
        return;
    }

    productsModel.setSelectedProduct(product);
});

events.on<Pick<IProduct, 'id'>>('product:toggle', ({ id }) => {
    const product = productsModel.getProductById(id);
    if (!product || product.price === null) {
        return;
    }

    if (basketModel.hasItem(product.id)) {
        basketModel.removeItem(product);
    } else {
        basketModel.addItem(product);
    }

    modal.close();
});

events.on('basket:open', () => openModal(renderBasket()));

events.on<Pick<IProduct, 'id'>>('basket:remove', ({ id }) => {
    const product = productsModel.getProductById(id);
    if (!product) {
        return;
    }

    basketModel.removeItem(product);
});

events.on('order:start', () => {
    if (basketModel.getCount() === 0) {
        return;
    }

    renderBuyerForms();
    openModal(orderForm.render());
});

events.on<TBuyerInput>('buyer:input', ({ field, value }) => {
    if (field === 'payment') {
        if (value !== 'card' && value !== 'cash' && value !== '') {
            return;
        }

        buyerModel.setData({ payment: value });
        return;
    }

    buyerModel.setData({ [field]: value });
});

events.on('order:next', () => {
    const errors = buyerModel.validate();
    if (errors.payment || errors.address) {
        return;
    }

    renderBuyerForms();
    openModal(contactsForm.render());
});

events.on('order:submit', async () => {
    if (isOrderSubmitting) {
        return;
    }

    const errors = buyerModel.validate();
    if (basketModel.getCount() === 0 || Object.keys(errors).length > 0) {
        return;
    }

    const order: TOrder = {
        ...buyerModel.getData(),
        total: basketModel.getTotal(),
        items: basketModel.getItems().map((product) => product.id),
    };

    isOrderSubmitting = true;
    let response: IOrderResponse;

    try {
        response = await shopApi.createOrder(order);
    } catch (error: unknown) {
        console.error('Не удалось оформить заказ:', error);
        openModal(
            contactsForm.render({
                errors: 'Не удалось оформить заказ. Попробуйте ещё раз.',
            }),
        );
        return;
    } finally {
        isOrderSubmitting = false;
    }

    basketModel.getItems().forEach((product) => {
        if (order.items.includes(product.id)) {
            basketModel.removeItem(product);
        }
    });

    const buyer = buyerModel.getData();
    if (
        buyer.payment === order.payment &&
        buyer.address === order.address &&
        buyer.email === order.email &&
        buyer.phone === order.phone
    ) {
        buyerModel.clear();
    }

    openModal(success.render({ total: response.total }));
});

events.on('modal:close', () => modal.close());
events.on('success:close', () => modal.close());

shopApi
    .getProducts()
    .then((response) => productsModel.setProducts(response.items))
    .catch((error: unknown) => {
        console.error('Не удалось загрузить или отобразить каталог товаров:', error);
    });
