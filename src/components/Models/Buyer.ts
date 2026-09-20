import { IBuyer, TPayment } from '../../types/index';
import type { IEvents } from '../base/Events';

export class Buyer {
    private payment: TPayment = '';
    private address: string = '';
    private phone: string = '';
    private email: string = '';

    constructor(private readonly events: IEvents) {}

    setData(data: Partial<IBuyer>) {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }

        this.events.emit('buyer:changed');
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            phone: this.phone,
            email: this.email,
        };
    }

    clear() {
        this.payment = '';
        this.address = '';
        this.phone = '';
        this.email = '';

        this.events.emit('buyer:changed');
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (this.payment === '') {
            errors.payment = 'Не выбран вид оплаты';
        }

        if (this.address === '') {
            errors.address = 'Введите адрес';
        }

        if (this.phone === '') {
            errors.phone = 'Введите телефон';
        }

        if (this.email === '') {
            errors.email = 'Введите email';
        }

        return errors;
    }
}
