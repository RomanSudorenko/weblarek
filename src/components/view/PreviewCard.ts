import { Card } from './Card';
import { TPreviewCard } from '../../types';
import { ensureElement, setCategory } from '../../utils/utils';

export class PreviewCard extends Card<TPreviewCard> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);

        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buttonElement.addEventListener('click', onClick);
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
    }
    set category(value: string) {
        setCategory(this.categoryElement, value);
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}
