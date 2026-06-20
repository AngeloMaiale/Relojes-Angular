import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-sol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-sol.component.html',
  styleUrls: ['./reloj-sol.component.css']
})
export class RelojSolComponent implements OnChanges {
  @Input() hora!: Date;
  anguloSombra: number = 0;
  esDeNoche: boolean = false;

  ngOnChanges() {
    if (!this.hora) return;
    const h = this.hora.getHours();
    const m = this.hora.getMinutes();
    
    if (h < 6 || h >= 18) {
      this.esDeNoche = true;
      this.anguloSombra = 0;
    } else {
      this.esDeNoche = false;
      const horasDecimales = h + m / 60;
      this.anguloSombra = (horasDecimales - 12) * 15; 
    }
  }
}