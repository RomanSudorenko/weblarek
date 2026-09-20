import { IProduct } from '../../types/index';
import type { IEvents } from '../base/Events';

export class Basket {
    private items: IProduct[] = [];

    constructor(private readonly events: IEvents) {}

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(product: IProduct) {
        this.items.push(product);
        this.events.emit('basket:changed');
    }

    removeItem(product: IProduct) {
        this.items = this.items.filter((x) => x.id !== product.id);
        this.events.emit('basket:changed');
    }

    clear() {
        this.items = [];
        this.events.emit('basket:changed');
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
