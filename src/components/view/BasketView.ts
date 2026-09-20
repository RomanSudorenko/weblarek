import { Component } from '../base/Component';
import { TBasketView } from '../../types';
import { ensureElement } from '../../utils/utils';

export class BasketView extends Component<TBasketView> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, onSubmit: () => void) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);

        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);

        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.buttonElement.addEventListener('click', onSubmit);
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}
