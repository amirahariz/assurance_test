import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import PACK_SELECTED_MESSAGE from '@salesforce/messageChannel/PackSelected__c';

// Utils to extract field values
import { getFieldValue } from 'lightning/uiRecordApi';

// Pack__c Schema
import NAME_FIELD from '@salesforce/schema/Pack__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Pack__c.Description__c';
import GARANTIES_FIELD from '@salesforce/schema/Pack__c.garanties__c';
import IMAGE_FIELD from '@salesforce/schema/Pack__c.Pack_Image__c';



const CSS_CLASS = "modal-hidden";

export default class PackPopup extends LightningElement {
    showModal = false;

    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }

    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    garantiesField = GARANTIES_FIELD;
    imageField = IMAGE_FIELD;


    recordId;

    packName;
    packDescription;
    packGaranties;
    
    packImage;

    @wire(MessageContext) messageContext;

    packSelectionSubscription;

    connectedCallback() {
        this.packSelectionSubscription = subscribe(
            this.messageContext,
            PACK_SELECTED_MESSAGE,
            (message) => this.handlePackSelected(message.packId)
        );
    }

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.packName = getFieldValue(recordData, NAME_FIELD);
        this.packDescription = getFieldValue(recordData, DESCRIPTION_FIELD);
        this.packGaranties = getFieldValue(recordData, GARANTIES_FIELD);
        this.packImage = getFieldValue(recordData, IMAGE_FIELD);

    }

   
    handlePackSelected(packId) {
        this.recordId = packId;
    }



  
}