import { LightningElement, api } from 'lwc';
import PACK_OBJECT from '@salesforce/schema/Pack__c';
import { NavigationMixin } from 'lightning/navigation';



export default class PackTile extends NavigationMixin(LightningElement) {
    /** Whether the tile is draggable. */
    
    @api draggable;

    _pack;
    /** Product__c to display. */
    @api
    get pack() {
        return this._pack;
    }
    set pack(value) {
        this._pack = value;
        this.name = value.Name;
        this.description = value.Description__c;

    }

    /** Product__c field values to display. */
    name;
    description;


    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.pack.Id
        });
        console.log(this.pack.Id);

        this.dispatchEvent(selectedEvent);
        // ouvrir popup
        const modal = this.template.querySelector("c-pack-popup");
        modal.show();
    }
    

  /* handleDragStart(event) {
        event.dataTransfer.setData('pack', JSON.stringify(this.pack));
    }

 /*   handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PACK_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }*/
}
