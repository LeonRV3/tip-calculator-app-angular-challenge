import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tip-calculator-app-angular';

  valueTipAmount: number = 0;
  valueTotalPerson: number = 0;
  addItem(newItemEvent: number[]) {
    const [tipAmount, totalPersona] = newItemEvent;
    this.valueTipAmount = tipAmount;
    this.valueTotalPerson = totalPersona;

  }
}
