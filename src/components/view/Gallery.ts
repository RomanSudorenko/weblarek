import { Component } from '../base/Component';
import { TGallery } from '../../types';

export class Gallery extends Component<TGallery> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set items(value: HTMLElement[]) {
        this.container.replaceChildren(...value);
    }
}
