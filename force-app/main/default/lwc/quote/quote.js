import { LightningElement, track, wire, api } from 'lwc';
import retrieveProdData from '@salesforce/apex/lwcAppExampleApex.retrieveProdData';
import retrieveSumProd from '@salesforce/apex/lwcAppExampleApex.retrieveSumProd';
import retrieveproductDatabyrecordId from '@salesforce/apex/lwcAppExampleApex.retrieveproductDatabyrecordId';
import getOppProdForLineItem from '@salesforce/apex/lwcAppExampleApex.getOppProdForLineItem';
//import getAddress from '@salesforce/apex/lwcAppExampleApex.getAddress';
import ID_FIELD from '@salesforce/schema/QuoteLineItem.Id';
import DISCOUNT_FIELD from '@salesforce/schema/QuoteLineItem.Discount';

import {deleteRecord, createRecord, updateRecord, getRecord, getFieldValue } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class DisplayProductsOnQuote extends LightningElement {
@api recordId;
@api recordIdForProd;
@api recordIdForDelete;

@track records;
@track res;
@track afterDis = this.res;
@track discount = 0;
@track dataNotFound;
@track listOfProd;
@track tt;

quoteName;
quoteDescription;
quoteExpDate;
espace = " ";
newProd;
errorMsg;

   
@wire (retrieveProdData,{recordId:'$recordId'}) getProd ;

@wire (retrieveSumProd,{recooordId:'$recordId'}) prodSum;

@wire (getOppProdForLineItem,{recordId:'$recordId'}) getProductForOli;

@wire (retrieveproductDatabyrecordId,{recordIdForProd:'$recordIdForProd'}) getProdDatabyId;

//@wire (getAddress,{recordId:'$recordId'}) getProdAddress;

/*renderedCallback(){
    refreshApex(this.prodSum);
   console.log('nameeee === ', this.name);
   console.log('somme totale test', this.prodSum.data[0].expr0);

   console.log('Quote Id', this.recordId);
   let test = this.recordId;
   console.log(test);
 
          this.res = this.prodSum.data[0].expr0;
          console.log(this.res);
         let aft=0;      
          console.log(aft);
          console.log(this.discount);
                      
          aft = this.res -((this.res*this.discount)/100);
                        
          this.afterDis=aft;
          console.log(this.afterDis);
          return (refreshApex(this.res),refreshApex(this.prodSum))
   
} */

handleProdDelete(event){
        this.recordIdForDelete = event.target.value;
        
        window.console.log('recordId for delete ' + this.recordIdForDelete);
        console.log(this.getProd); 
        deleteRecord(this.recordIdForDelete) 
        .then(() =>{
    
           const toastEvent = new ShowToastEvent({
               title:'Record Deleted',
               message:'Record deleted successfully',
               variant:'success',
           })
           console.log(this.recordId);
           eval("$A.get('e.force:refreshView').fire();");
           this.dispatchEvent(toastEvent);

           return refreshApex((this.getProd),refreshApex(this.prodSum),refreshApex(this.getProductForOli));
           
        })
        .catch(error =>{
         const toastEvent = new ShowToastEvent({
            title:'Record not Deleted',
            message:'Record delete unsuccessfull',
            variant:'error',
        })
        this.dispatchEvent(toastEvent);
            window.console.log('Unable to delete record due to ' + error.body.message);
        });
     }
        
handleProdDup(event){
       this.recordIdForProd = event.target.value;
       
       window.console.log('recordId Selected ' + this.recordIdForProd);
       window.console.log('recordId Quote ' + this.recordId);      
       console.log('fields of the selected record from cont', this.getProdDatabyId.data);   
          
       let  fields =
         {
          'QuoteId': this.recordId,
          'PricebookEntryId' : this.getProdDatabyId.data.PricebookEntryId, 
          'Product2Id' : this.getProdDatabyId.data.Product2Id,
          'Quantity':this.getProdDatabyId.data.Quantity,
          'UnitPrice':this.getProdDatabyId.data.UnitPrice, 
          'Discount':this.getProdDatabyId.data.Discount,
          };     
       console.log('display the fields information for creation', fields);
       let Record = {'apiName' : 'QuoteLineItem', fields};
               console.log(Record);
               createRecord(Record).then(response =>{
    
          const toastEvent = new ShowToastEvent({
               title:'Record Duplicated',
               message:'Record Duplicated successfully with Id: '+response.id,
               variant:'success',
           })
           eval("$A.get('e.force:refreshView').fire();");
           this.dispatchEvent(toastEvent);                     
           return refreshApex((this.getProd),refreshApex(this.prodSum),refreshApex(this.getProductForOli));  
         })

         .catch(error =>{
            const toastEvent = new ShowToastEvent({
               title:'Record not Duplicated',
               message:'Record Duplicattion unsuccessfull',
               variant:'error',
           })
           this.dispatchEvent(toastEvent);
            window.console.log('Unable to duplicate record due to ' + error.body.message);
        });    
   }


discountChangedHandler(event){
   this.discount = event.target.value;
}
/*
nameChangedHandler(event){
   this.quoteName = event.target.value;
}
descriptionChangedHandler(event){
   this.quoteDescription = event.target.value;
}
expDateChangedHandler(event){
   this.quoteExpDate = event.target.value;
}*/

updateDiscount(){
    console.log('first', this.getProductForOli);
    for( let i=0; i<this.getProd.data.length; i++){
    const fields = {};
                  fields[ID_FIELD.fieldApiName] = this.getProductForOli.data[i].Id;
                  console.log('Id of the quotelineitem', this.getProductForOli.data[i].Id);
                  fields[DISCOUNT_FIELD.fieldApiName] = this.discount;
                  console.log('discount = ', this.discount,' for qli ',i);

                  const recordInput = { fields };
                  console.log(recordInput);
                  updateRecord(recordInput)
                      .then(() => {
                          this.dispatchEvent(
                              new ShowToastEvent({
                                  title: 'Success',
                                  message: 'Discount Changed successfully',
                                  variant: 'success'
                              })
                          );
                         
                      })
                      .catch(error => {
                          this.dispatchEvent(
                              new ShowToastEvent({
                                  title: 'Error creating record',
                                  message: error.body.message,
                                  variant: 'error'
                              })
                          );
                      });
                  
                  
            
}
eval("$A.get('e.force:refreshView').fire();");
}

/*
SaveQuote(){ 
          
         console.log('recordId == ' + this.recordId);
         console.log('Name' ,this.quoteName);
         console.log('ExpirationDate' ,this.quoteExpDate);
         console.log('Description',this.quoteDescription);        
         console.log('Discount',this.discount);
         console.log('GrandTotal',this.afterDis);
         console.log('OpportunityId :' , this.recordId);
         console.log('first', this.getProductForOli);
         refreshApex(this.getProductForOli);
         
   //create Quote
            let fields = {
               'Name' : this.quoteName, 
               'OpportunityId' : this.recordId, 
               'ExpirationDate' : this.quoteExpDate,
               'Description':this.quoteDescription,  
               'BillingName':this.getProdAddress.data[0].Account.Name,
               'ShippingName':this.getProdAddress.data[0].Account.Name,
               'BillingCity':this.getProdAddress.data[0].Account.BillingAddress.city,
               'BillingCountry':this.getProdAddress.data[0].Account.BillingAddress.country,
               'BillingCountryCode':this.getProdAddress.data[0].Account.BillingAddress.countryCode,
               'BillingPostalCode':this.getProdAddress.data[0].Account.BillingAddress.postalCode,
               'BillingState':this.getProdAddress.data[0].Account.BillingAddress.state,
               'BillingStateCode':this.getProdAddress.data[0].Account.BillingAddress.stateCode,
               'BillingStreet':this.getProdAddress.data[0].Account.BillingAddress.street,
            };                       
            var objRecordInput = {'apiName' : 'Quote', fields};           
            console.log(objRecordInput);            
            createRecord(objRecordInput).then(response => {
               const toastEvent = new ShowToastEvent({
                  title:'Quote Saved',
                  message:'Quote Saved successfully with Id: '+response.id,
                  variant:'success',
              })              
              this.dispatchEvent(toastEvent); 

              //Create Quote Line Items
              for( let i=0; i<this.getProductForOli.data.length; i++){
               let fields = {
                  'OpportunityLineItemId' : this.getProductForOli.data[i].id, 
                  'PricebookEntryId' : this.getProductForOli.data[i].PricebookEntryId, 
                  'Product2Id' : this.getProductForOli.data[i].Product2Id,
                  'QuoteId': response.id,
                  'Quantity':this.getProductForOli.data[i].Quantity,
                  'UnitPrice':this.getProductForOli.data[i].UnitPrice,
                  'Discount':this.discount+'%'                   
               };
               let objRecord = {'apiName' : 'QuoteLineItem', fields};
               console.log('response id', response.id);
               console.log(objRecord);
               console.log('record id', this.recordId);
               createRecord(objRecord).then(() =>{
             // Update stage in Opportunity     
                  const fields = {};
                  fields[ID_FIELD.fieldApiName] = this.recordId;
                  fields[STAGE_FIELD.fieldApiName] = 'Decision';
                  const recordInput = { fields };
               
                  updateRecord(recordInput)
                      .then(() => {
                          this.dispatchEvent(
                              new ShowToastEvent({
                                  title: 'Success',
                                  message: 'Stage Changed successfully',
                                  variant: 'success'
                              })
                          );
                         
                      })
                      .catch(error => {
                          this.dispatchEvent(
                              new ShowToastEvent({
                                  title: 'Error creating record',
                                  message: error.body.message,
                                  variant: 'error'
                              })
                          );
                      });
                  
                  
               });
               eval("$A.get('e.force:refreshView').fire();");         
              }                          
           })
           .catch(error =>{
            const toastEvent = new ShowToastEvent({
               title:'Quote not Saved',
               message:'Record Save unsuccessfull',
               variant:'error',
           })
           this.dispatchEvent(toastEvent);
            window.console.log('Unable to duplicate record due to ' + error.body.message);
        });
        }*/
}
