import { Component } from '../base/Component';
import { TSuccess } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Success extends Component<TSuccess> {
    protected totalElement: HTMLElement;
    protected closeButtonElement: HTMLButtonElement;

    constructor(container: HTMLElement, onClose: () => void) {
        super(container);

        this.totalElement = ensureElement<HTMLElement>(
            '.order-success__description',
            this.container,
        );

        this.closeButtonElement = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            this.container,
        );

        this.closeButtonElement.addEventListener('click', onClose);
    }

    set total(value: number) {
        this.totalElement.textContent = `Списано ${value} синапсов`;
    }
}
