public class QuoteAutoSyncUtil{

    @future ( callout = true)
    public static void syncQuote(Map<Id, Id> quoteMap)
    {
        Map<Id, Opportunity> oppMap = new Map<Id, Opportunity>();
        for(Id currentQuote : quoteMap.keyset())
        {
            
            Opportunity opp = new Opportunity();
            opp.Id = quoteMap.get(currentQuote);
            opp.SyncedQuoteId = currentQuote;
            opp.Quote__c = currentQuote;
            oppMap.put(opp.Id, opp);
            
        }
        update oppMap.values();
    }
}