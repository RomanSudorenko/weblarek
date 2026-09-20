import { Component } from '../base/Component';
import { THeader } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Header extends Component<THeader> {
    protected basketButtonElement: HTMLButtonElement;
    protected basketCounterElement: HTMLElement;

    constructor(container: HTMLElement, onBasketClick: () => void) {
        super(container);

        this.basketButtonElement = ensureElement<HTMLButtonElement>(
            '.header__basket',
            this.container,
        );

        this.basketCounterElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            this.container,
        );

        this.basketButtonElement.addEventListener('click', onBasketClick);
    }

    set counter(value: number) {
        this.basketCounterElement.textContent = String(value);
    }
}
