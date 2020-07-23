import {LightningElement} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class StartingPoint extends NavigationMixin(LightningElement) {

    openManager() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/lightning/n/Order_Managment'
            }
        })
    }
}