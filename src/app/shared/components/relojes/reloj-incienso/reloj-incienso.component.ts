import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-incienso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-incienso.component.html',
  styleUrls: ['./reloj-incienso.component.css']
})
export class RelojInciensoComponent implements OnInit {
  @Input() hora: Date = new Date(); 

  constructor() {}

  ngOnInit(): void {}

  get porcentajeConsumido(): number {
    if (!this.hora) return 0;

    
    
    const horasEscala = this.hora.getHours() % 6; 
    const minutosPasados = (horasEscala * 60) + this.hora.getMinutes();
    const totalMinutosCiclo = 360; 
    
    const calculo = (minutosPasados / totalMinutosCiclo) * 100;
    
    return Math.min(100, Math.max(0, calculo));
  }
}