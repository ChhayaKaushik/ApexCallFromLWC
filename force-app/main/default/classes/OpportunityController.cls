//with sharing keyword when declaring a class to enforce sharing rules of the current user
public with sharing class OpportunityController {
    public OpportunityController() {

    }
    @AuraEnabled(cacheable=true)//No of DML'S that can be performed =0 as method is cacheable 
    //i.e. we cannot perform DMLs inside cacheable methods
    public static List<Opportunity> getAllOpportunity(){
        return [select Id,Name,StageName,CloseDate,Amount from Opportunity];
    }

    @AuraEnabled(cacheable=true)
        public static List<Opportunity> getAllWonOpportunity(){
            return [select Id,Name,StageName,CloseDate,Amount from Opportunity
                    where StageName='Closed Won'];
        }
    
        @AuraEnabled
        public static void deleteOpp(String sid){
            try {
                System.debug(sid);
                List<Opportunity> opList=[select Name from Opportunity where Id=:sid];
                delete opList;
            } 
            catch(DMLException ex){
              System.debug(ex.getMessage());
            }
            catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
}
