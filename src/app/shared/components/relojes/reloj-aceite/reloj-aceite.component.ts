import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-aceite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-aceite.component.html',
  styleUrls: ['./reloj-aceite.component.css']
})
export class RelojAceiteComponent implements OnInit {
  // Cambiado a 'hora' para solucionar el error de enlace del compilador
  @Input() hora: Date = new Date(); 

  constructor() {}

  ngOnInit(): void {}

  // El nivel de aceite empieza lleno (100%) y se vacía conforme avanza el día (0%)
  get porcentajeAceiteRestante(): number {
    if (!this.hora) return 100;
    const minutosPasados = (this.hora.getHours() * 60) + this.hora.getMinutes();
    const totalMinutosDia = 1440;
    
    const porcentajeConsumido = (minutosPasados / totalMinutosDia) * 100;
    return 100 - porcentajeConsumido;
  }
}