export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export type TOrder = IBuyer & {
    total: number;
    items: string[];
};

export interface IOrderResponse {
    id: string;
    total: number;
}

export type TCard = Pick<IProduct, 'title' | 'price'>;

export type TCatalogCard = Pick<IProduct, 'title' | 'price' | 'image' | 'category'>;

export type TPreviewCard = Pick<
    IProduct,
    'title' | 'price' | 'image' | 'category' | 'description'
> & {
    buttonText: string;
    buttonDisabled: boolean;
};

export type TBasketCard = TCard & {
    index: number;
};

export type TBasketView = {
    items: HTMLElement[];
    total: number;
    buttonDisabled: boolean;
};

export type THeader = {
    counter: number;
};

export type TGallery = {
    items: HTMLElement[];
};

export type TModal = {
    content: HTMLElement;
};

export type TForm = {
    valid: boolean;
    errors: string;
};

export type TOrderForm = TForm & Pick<IBuyer, 'payment' | 'address'>;

export type TContactsForm = TForm & Pick<IBuyer, 'email' | 'phone'>;

export type TSuccess = {
    total: number;
};

export type TBuyerInput = {
    field: keyof IBuyer;
    value: string;
};
