global class MultiSelectFlowValues {

   

    @InvocableMethod
 
    public static list<list<String>> CheckValues(List<string> values) {
 
       if(!(values.isEmpty())){
 
           
 
           string tempStr = values[0];
 
           list<string> lstnew = tempStr.split(';');
 
           list<list<String>> finalLst = new list<list<String>>();
 
           finalLst.add(lstnew);
 
           return finalLst;
 
       }
 
       else return null;
 
    }
 
 }