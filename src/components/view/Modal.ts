import { Component } from '../base/Component';
import type { TModal } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<TModal> {
    protected contentElement: HTMLElement;
    protected closeButtonElement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.contentElement = ensureElement<HTMLElement>(
            '.modal__content',
            this.container
        );

        this.closeButtonElement = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this.container
        );

        this.closeButtonElement.addEventListener('click', () => {
            this.close();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}