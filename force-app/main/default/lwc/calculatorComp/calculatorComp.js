import { api, LightningElement } from 'lwc';

export default class CalculatorComp extends LightningElement {
    //Defining properties
    //properties must be in camelCase
    //by default private
    //@api decoractor makes the property public
    @api firstNumber=30;
    @api secondNumber=6;
    @api result;

    capturefirstNumber(event){
        this.firstNumber=event.target.value;
        
    }
    capturesecondNumber(event){
        this.secondNumber=event.target.value;
    }
    add(){
        
        this.result=parseInt(this.firstNumber)+parseInt(this.secondNumber);
    }

    sub(){
        this.result=this.secondNumber>this.firstNumber?this.secondNumber-this.firstNumber:this.firstNumber-this.secondNumber;
    }

    mul(){
        this.result=this.firstNumber*this.secondNumber;
    }

    divide(){
        this.result=this.secondNumber/this.firstNumber;
    }

}