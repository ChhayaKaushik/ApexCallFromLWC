import { LightningElement,wire,api,track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllOps from '@salesforce/apex/OpportunityController.getAllOpportunity';
import deleteOpp from '@salesforce/apex/OpportunityController.deleteOpp';

const cols=[
    { label:'Id',fieldName:'Id',type:'text',hidden:true },
    { label:'Name',fieldName:'Name',type:'text' },
    { label:'Stage',fieldName:'StageName',type:'text' },
    { label:'Close Date',fieldName:'CloseDate',type:'datetime' },
    { label:'Amount',fieldName:'Amount',type:'currency' },
];
export default class LightningDataTableExample extends LightningElement {
    opList;
    opColumns=cols;
    oppId;
    _response;
    delExecuted;
    @wire(getAllOps)
    wiredGetAllOpportunities(response){
        this._response=response;
        if(response.data){
            this.opList=response.data;

        }
    }

    handleRowSelection(event){
       const selectedRows= event.detail.selectedRows;
       this.oppId=selectedRows[0].Id;
    }

    handleDelete(){
        deleteOpp({sid: this.oppId})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedRows=[];
            //locker-svc doesn't allow document.queryselector
            refreshApex(this._response);
        })
        .catch(()=>{
            alert('Error deleting record');
        })//always pass arguments as JS Object to apex method
    }
}