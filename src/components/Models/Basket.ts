import { IProduct } from '../../types/index';

export class Basket {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(product: IProduct) {
        this.items.push(product);
    }

    removeItem(product: IProduct) {
        this.items = this.items.filter((x) => x.id !== product.id);
    }

    clear() {
        this.items = [];
    }

    getTotal(): number {
        return this.items.reduce((acc, product) => {
            return acc + (product.price ?? 0);
        }, 0);
    }

    getCount() {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some((product) => product.id === id);
    }
}
