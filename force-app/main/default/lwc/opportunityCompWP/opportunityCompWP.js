import { LightningElement, wire } from 'lwc';
import getAllOps from '@salesforce/apex/OpportunityController.getAllOpportunity';

export default class OpportunityCompWP extends LightningElement {
    //The Apex method will get called upon loading of this document
    //Framework pushes two properties : data & error.
    
    @wire(getAllOps) oppList; // oppList.data & oppList.error

}