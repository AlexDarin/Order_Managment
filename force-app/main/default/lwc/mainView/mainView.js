import {LightningElement, wire, track, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import Id from '@salesforce/user/Id';
import AccountName from '@salesforce/apex/AccountController.getAccountName';
import AccountNumber from '@salesforce/apex/AccountController.getAccountNumber';

import IsManager from '@salesforce/apex/AccountController.checkIsManager';


export default class MainView extends NavigationMixin(LightningElement) {

    @track accountName;
    @track accountNumber;
    @track isManager = false;

    @wire(AccountName, {id: Id})
    wiredName({data}) {
        this.accountName = data;
    }

    @wire(AccountNumber, {id: Id})
    wiredNumber({data}) {
        this.accountNumber = data;
    }

    @wire(IsManager, {id: Id})
    wiredId({data}) {
        this.isManager = data;
    }

    @api
    handleCartButton() {
        this.template.querySelector('c-item-cart').showCart();
    }

    handleCreateProductButton() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Product__c',
                actionName: 'new'
            }
        })
    }

}