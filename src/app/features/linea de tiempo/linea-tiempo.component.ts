import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelojSolComponent } from '../../shared/components/relojes/reloj-sol/reloj-sol.component';
import { RelojAguaComponent } from '../../shared/components/relojes/reloj-agua/reloj-agua.component';
import { RelojArenaComponent } from '../../shared/components/relojes/reloj-arena/reloj-arena.component';

@Component({
  selector: 'app-linea-tiempo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RelojSolComponent, 
    RelojAguaComponent, 
    RelojArenaComponent
  ],
  templateUrl: './linea-tiempo.component.html',
  styleUrls: ['./linea-tiempo.component.css']
})
export class LineaTiempoComponent implements OnInit {
  minutosDelDia: number = 720; 
  horaGlobal: Date = new Date();

  ngOnInit() {
    this.actualizarHora();
  }

  actualizarHora() {
    const nuevaFecha = new Date();
    const horas = Math.floor(this.minutosDelDia / 60);
    const minutos = this.minutosDelDia % 60;
    
    nuevaFecha.setHours(horas, minutos, 0, 0);
    this.horaGlobal = nuevaFecha;
  }
}