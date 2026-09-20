import { Card } from './Card';
import { TCatalogCard } from '../../types';
import { ensureElement } from '../../utils/utils';
import { categoryMap, CDN_URL } from '../../utils/constants';

export class CatalogCard extends Card<TCatalogCard> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener('click', onClick);
    }

    set image(value: string) {
        this.setImage(this.imageElement, `${CDN_URL}${value}`);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        this.categoryElement.classList.remove(...Object.values(categoryMap));

        this.categoryElement.classList.add(categoryMap[value as keyof typeof categoryMap]);
    }
}
