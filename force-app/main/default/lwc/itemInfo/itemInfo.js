import {LightningElement, api, track} from 'lwc';

export default class ItemInfo extends LightningElement {

    @track id;
    @track isOpened = false;

    @api
    showDetails(id) {
        this.isOpened = true;
        this.id = id;
    }

    hideDetails() {
        this.id = undefined;
        this.isOpened = false;
    }
}