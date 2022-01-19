import { style } from '@angular/animations';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  bill: number = 0;
  valorTip: number = 0;
  numberOfPeople: number = 0;

  tipAmount: number = 0;
  totalPersona: number = 0;




  @Output() newItemEvent = new EventEmitter<number[]>();

  strActiveButton: string = "";
  boolActiveButton: boolean = false;




  setBillOrNumPpl(event: Event) {
    const inputValue = event.target as HTMLInputElement;

    let inputValueStr = inputValue.value;



    if (inputValueStr === '') {
      inputValueStr = '0';
    }

    if (Number(inputValueStr) !== NaN) {
      const inputValueNum = Number(inputValueStr);

      if (inputValue.name === 'billInput') {
        this.bill = inputValueNum;
      } else {
        this.numberOfPeople = inputValueNum;
      }
    }
    this.emitValues(inputValue);
  }


  setTip(event: Event) {

    const inputValue = event.target as HTMLInputElement;
    const inputValueStr = inputValue.value;

    if (inputValue.name !== "custom") {
      if (this.boolActiveButton && inputValue.classList.contains('btn-active')) {
        inputValue.classList.remove("btn-active");
        this.boolActiveButton = false;

      } else {

        this.deleteClassActButtons(inputValue);

        inputValue.classList.add("btn-active");
        this.boolActiveButton = true;
      }
    } else {
      this.valorTip = 0;
      this.deleteClassActButtons(inputValue);
    }

    if (inputValueStr.includes("%") && inputValueStr.length === 3) {
      let strSliced = inputValue.value.slice(0, 2);
      this.valorTip = Number(strSliced);
    } else if (inputValueStr.includes("%") && inputValueStr.length === 2) {
      let strSliced = inputValue.value.slice(0, 1);
      this.valorTip = Number(strSliced);
    } else {
      if (inputValueStr !== '') {
        this.valorTip = Number(inputValueStr);
      }
    }


    this.emitValues(inputValue);

  }


  calculateTipAmount(): number {
    return ((this.bill * this.valorTip) / 100) / this.numberOfPeople;
  }

  calculateTotalPersona(tipAmount: number): number {
    return ((this.bill / this.numberOfPeople) + tipAmount);
  }

  deleteClassActButtons(inputValue: HTMLInputElement) {
    //Eliminar los activos de otros botones
    if (inputValue.parentNode?.hasChildNodes) {
      let children = inputValue.parentNode?.children
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("btn-active");
      }
    }
  }

  flagEmmit: boolean = true;
  emitValues(inputValue: HTMLInputElement): void {

    //validaciones


    if (inputValue.name === 'nPeopleInput') {


      if (inputValue.classList.contains('error-input') && this.numberOfPeople !== 0) {
        inputValue.classList.remove('error-input');
        this.flagEmmit = true;
      } else if (!inputValue.classList.contains('error-input') && this.numberOfPeople === 0) {
        inputValue.classList.add('error-input');
        this.flagEmmit = false;
      }


    }

    if (this.flagEmmit && this.numberOfPeople !== 0) {
      let values = [];
      let tipAmount = this.calculateTipAmount();
      let totalPersona = this.calculateTotalPersona(tipAmount);
      values.push(tipAmount);
      values.push(totalPersona);
      this.newItemEvent.emit(values);
    }



  }
}
