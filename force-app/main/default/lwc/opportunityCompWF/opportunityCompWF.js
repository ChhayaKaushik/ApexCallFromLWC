import { LightningElement,track,wire } from 'lwc';

import getAllOpps from '@salesforce/apex/OpportunityController.getAllOpportunity';

export default class OpportunityCompWF extends LightningElement {
   
    @track oppTaxList;


    //Wiring a function so getAllOps is wired to function which has 1 param obj with 2 properties
    //data & error
    //Wire function executes twice : 1. When component is loaded i.e. both data & error are undefined
    //2. When data and error has value
    @wire(getAllOpps)
    loadAllOpps({data,error}){
        if(data){
            console.log("success");
            this.oppTaxList=[]; 
            data.forEach(element => 
                {
                  //  let amt=element.Amount;
                
                    this.oppTaxList.push({
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
        else if(error){
            console.log("error");
        }
    }
}