import { LightningElement,track } from 'lwc';
import getAllOpportunities from '@salesforce/apex/OpportunityController.getAllOpportunity';
import getAllWonOpportunities from '@salesforce/apex/OpportunityController.getAllWonOpportunity';


//Imperative can call both cacheable & non-cacheable apex methods
//therefore imperative approach can be used for both 1). fetching Data & 2). performing DML
//whereas @wire can call only cacheable - only for fetching Data

//Imperative call returns promise - with success (.then) & failure (.catch)
export default class OpportunityCompImpreative extends LightningElement {
    
    //to make the property reactive
    //@api makes it public & reactive
    //@track makes it private & reactive
    @track resultList=[];

    loadAllOps(){
        getAllOpportunities().then(result=>{
            if(result){
                this.resultList=[];
                console.log("success");
                this.oppTaxList=[]; 
                result.forEach(element => 
                    {
                            this.resultList.push({
                            Id:element.Id,
                            Name:element.Name,
                            Stage:element.StageName, 
                            CloseDate:element.CloseDate,
                            Amount:parseInt(element.Amount),
                            SGST: parseInt(element.Amount)*0.5,
                            CGST:parseInt(element.Amount)*1.2
                        });
                });
            }   
        });
    }

    loadWonOps(){
        getAllWonOpportunities().then(result=>{
            if(result){
                console.log("success");
                this.resultList=[]; 
                result.forEach(element => 
                    {
                            this.resultList.push({
                            Id:element.Id,
                            Name:element.Name,
                            Stage:element.StageName, 
                            CloseDate:element.CloseDate,
                            Amount:parseInt(element.Amount),
                            SGST: parseInt(element.Amount)*0.5,
                            CGST:parseInt(element.Amount)*1.2
                        });
                });
            }   
        });
    }
}