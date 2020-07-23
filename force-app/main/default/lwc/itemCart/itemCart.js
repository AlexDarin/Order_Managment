import {LightningElement, api, track, wire} from 'lwc';
import getItemInCart from '@salesforce/apex/ItemCartController.getItemInCart';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ItemCart extends LightningElement {
    itemList;
    @track recordsInCart;
    recordsData = [];

    isCartOpened = false;
    @api
    showCart() {
        this.isCartOpened = true;
    }

    hideCart() {
        this.isCartOpened = false;
    }

    @api
    setItemsInCart(value) {
        this.itemList = value;
    }

    @wire(getItemInCart, {idList : '$itemList'})
    wiredItemInCart({data}) {
        if (data) {
            this.recordsInCart = JSON.parse(data.toString());
            this.recordsData = [];
            for (let i in this.recordsInCart) {
                this.recordsData.push({id: i, count: this.recordsInCart[i] })
            }
        }
    }

    handleCheckOutCart() {
       /* if (this.recordsData.length !== 0)
            this.template.querySelector('c-object-builder').createOrder(this.recordsData);
        else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Cart is empty',
                    variant: 'error',
                })
            );
        }*/
    }
}