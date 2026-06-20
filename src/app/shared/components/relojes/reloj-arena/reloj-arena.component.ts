import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-arena',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-arena.component.html',
  styleUrls: ['./reloj-arena.component.css']
})
export class RelojArenaComponent implements OnChanges {
  @Input() hora!: Date;
  minutosActuales: number = 0;

  ngOnChanges() {
    if (!this.hora) return;
    this.minutosActuales = this.hora.getMinutes();
  }
}