trigger QuoteAutoSync on Quote (after insert){

    Map<Id, Id> quoteMap = new Map<Id, Id>();
    for(Quote currentQuote : Trigger.New)
    {
        system.debug(currentQuote.IS_PRIMARY__c);
        quoteMap.put(currentQuote.Id, currentQuote.OpportunityId);
    }
 system.debug(quoteMap);
    QuoteAutoSyncUtil.syncQuote(quoteMap);
    
}