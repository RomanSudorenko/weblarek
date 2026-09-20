import { Component } from '../base/Component';
import { TForm } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Form<T extends TForm> extends Component<T> {
    protected submitButtonElement: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLFormElement, onSubmit: () => void) {
        super(container);

        this.submitButtonElement = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            this.container,
        );

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            onSubmit();
        });
    }

    set valid(value: boolean) {
        this.submitButtonElement.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}
