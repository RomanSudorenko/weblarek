import { Card } from './Card';
import { TBasketCard } from '../../types';
import { ensureElement } from '../../utils/utils';

export class BasketCard extends Card<TBasketCard> {
    protected indexElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.basket__item-delete',
            this.container,
        );

        this.buttonElement.addEventListener('click', onClick);
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
