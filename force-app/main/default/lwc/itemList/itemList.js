import {LightningElement, wire, api, track} from 'lwc';

import Results from '@salesforce/apex/ItemFilterController.getResults';
import Families from '@salesforce/apex/ItemFilterController.getFamilies';
import Types from '@salesforce/apex/ItemFilterController.getTypes';


export default class ItemList extends LightningElement {
    
    @track items;

    families;
    @wire(Families)
    wiredFamiliesList(data) {
        if (data) {
            this.families = data;
            this.families = this.families.data;
        }
    }

    types;
    @wire(Types)
    wiredTypesList(data) {
        if (data) {
            this.types = data;
            this.types = this.types.data;
        }
    }

    get optionsFamilies() {
        var result = []
        for (let i in this.families)
            result.push({label: this.families[i], value: this.families[i]});
        return result;
    }

    get optionsTypes() {
        var result = []
        for (let i in this.types)
            result.push({label: this.types[i], value: this.types[i]});
        return result;
    }

    @wire(Results, {familyFilters : '$familiesFilter', typeFilters: '$typesFilter', searchKey: '$inputValue'})
    wiredFilterProduct(data) {
        if (data) this.items = data;
    }

    familiesFilter = [];
    handleCBFilterChange(e) {
        this.familiesFilter = e.detail.value;
        this.wiredFilterProduct();
    }

    typesFilter = [];
    handleCBTypeChange(e) {
        this.typesFilter = e.detail.value;
        this.wiredFilterProduct();
    }

    inputValue = '';
    handleSearch(event) {
        this.inputValue = event.target.value;
        this.wiredFilterProduct();
    }

    handleDetails(event) {
        this.template.querySelector('c-item-info').showDetails(event.target.name);
    }

    @api recordList = [];
    handleAddItemToCart(event) {
        this.recordList.push(event.target.name);
        this.template.querySelector('c-item-cart').setItemsInCart(this.recordList);
    }

}