import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-agua',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-agua.component.html',
  styleUrls: ['./reloj-agua.component.css']
})
export class RelojAguaComponent implements OnChanges {
  @Input() hora!: Date;
  porcentajeDia: number = 0;

  ngOnChanges() {
    if (!this.hora) return;
    const minutosTotales = this.hora.getHours() * 60 + this.hora.getMinutes();
    this.porcentajeDia = (minutosTotales / 1440) * 100;
  }
}