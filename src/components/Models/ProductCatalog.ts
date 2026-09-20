import { IProduct } from '../../types/index';
import type { IEvents } from '../base/Events';

export class ProductCatalog {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    constructor(private readonly events: IEvents) {}

    setProducts(products: IProduct[]) {
        this.products = products;
        this.events.emit('products:changed');
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    setSelectedProduct(product: IProduct) {
        this.selectedProduct = product;
        this.events.emit('product:selected');
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}
