import { Form } from './Form';
import { IBuyer, TContactsForm } from '../../types';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Form<TContactsForm> {
    protected emailInputElement: HTMLInputElement;
    protected phoneInputElement: HTMLInputElement;

    constructor(
        container: HTMLFormElement,
        onSubmit: () => void,
        onChange: (field: keyof IBuyer, value: string) => void,
    ) {
        super(container, onSubmit);

        this.emailInputElement = ensureElement<HTMLInputElement>('[name="email"]', this.container);

        this.phoneInputElement = ensureElement<HTMLInputElement>('[name="phone"]', this.container);

        this.emailInputElement.addEventListener('input', () => {
            onChange('email', this.emailInputElement.value);
        });

        this.phoneInputElement.addEventListener('input', () => {
            onChange('phone', this.phoneInputElement.value);
        });
    }

    set email(value: string) {
        this.emailInputElement.value = value;
    }

    set phone(value: string) {
        this.phoneInputElement.value = value;
    }
}
