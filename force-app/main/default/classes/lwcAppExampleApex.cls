public with sharing class lwcAppExampleApex {

    @AuraEnabled(cacheable=true)
    public static List<QuoteLineItem> retrieveProdData(string recordId){       
        
        System.debug('record Id '+recordId);
        string tes = recordId;
       System.debug('nv var '+tes);
       List<QuoteLineItem> productList = [Select Id, Product2.Name, Quantity,UnitPrice, Subtotal From QuoteLineItem Where QuoteId =: tes];
       System.debug('liste test'+productList);
       return productList;
    }

    @AuraEnabled(cacheable=true)
    public static AggregateResult[] retrieveSumProd(string recooordId){       
        
        
        AggregateResult[] productList = [Select SUM(Subtotal) From QuoteLineItem Where QuoteId =: recooordId];
       System.debug('liste test'+productList);
       return productList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAddress(string recordId){       
        
        List<Opportunity> addressList = [Select Account.Name, Account.BillingAddress From Opportunity Where Id =: recordId];
        
        return addressList;
        

    }

   /* @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getQuoteAddressForTest(String recordId){       
        System.debug('record Id '+recordId);
        string tes = recordId;
        System.debug('nv var '+tes);

        List<OpportunityLineItem> oliId = [Select Id, Name From OpportunityLineItem Where OpportunityId =: tes];
        System.debug('liste test'+oliId);
        return oliId;
    }
*/
    @AuraEnabled(cacheable=true)
    public static QuoteLineItem retrieveproductDatabyrecordId(string recordIdForProd){       
        
        System.debug('record Id du produit selectionnée '+recordIdForProd);
        QuoteLineItem productrecord = [
        Select Id, Quantity, OpportunityLineItemId, UnitPrice, PricebookEntryId, Product2Id, QuoteId
        From QuoteLineItem 
        Where Id =: recordIdForProd];
        System.debug('liste du produit selectionnée'+productrecord);
        return productrecord;        
    }

    @AuraEnabled(cacheable=true)
    public static List<QuoteLineItem> getOppProdForLineItem(string recordId){       
        
        List<QuoteLineItem> ProdForLineItem = [Select Id From QuoteLineItem Where QuoteId =: recordId];
        return ProdForLineItem;
  
}
}