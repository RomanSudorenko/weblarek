import { Form } from './Form';
import { IBuyer, TOrderForm, TPayment } from '../../types';
import { ensureElement } from '../../utils/utils';

export class OrderForm extends Form<TOrderForm> {
    protected addressInputElement: HTMLInputElement;
    protected cardButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;

    constructor(
        container: HTMLFormElement,
        onSubmit: () => void,
        onChange: (field: keyof IBuyer, value: string) => void,
    ) {
        super(container, onSubmit);

        this.addressInputElement = ensureElement<HTMLInputElement>(
            '[name="address"]',
            this.container,
        );

        this.cardButtonElement = ensureElement<HTMLButtonElement>('[name="card"]', this.container);

        this.cashButtonElement = ensureElement<HTMLButtonElement>('[name="cash"]', this.container);

        this.addressInputElement.addEventListener('input', () => {
            onChange('address', this.addressInputElement.value);
        });

        this.cardButtonElement.addEventListener('click', () => {
            onChange('payment', 'card');
        });

        this.cashButtonElement.addEventListener('click', () => {
            onChange('payment', 'cash');
        });
    }

    set address(value: string) {
        this.addressInputElement.value = value;
    }

    set payment(value: TPayment) {
        this.cardButtonElement.classList.toggle('button_alt-active', value === 'card');

        this.cashButtonElement.classList.toggle('button_alt-active', value === 'cash');
    }
}
