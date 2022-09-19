import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {
  @Input() valorTip: number = 0;
  @Input() valorTotalPersona: number = 0;


  clean(): void {
    this.valorTip = 0;
    this.valorTotalPersona = 0;
  }
}
