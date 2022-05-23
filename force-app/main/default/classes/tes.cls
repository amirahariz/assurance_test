global class tes {

    @InvocableMethod
    public static list<boolean> tes(list<String> oppId) {
        boolean mot=false;
        list <boolean> responseList = new list <boolean>();
        string opp = [select StageName from Opportunity where Id=: oppId].StageName;
if (opp =='Propose'){
    mot = true;

}
responseList.add(mot);
return responseList;
    }
}
