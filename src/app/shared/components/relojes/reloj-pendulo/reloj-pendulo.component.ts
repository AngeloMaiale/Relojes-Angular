import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-pendulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-pendulo.component.html',
  styleUrls: ['./reloj-pendulo.component.css']
})
export class RelojPenduloComponent {
  @Input() hora!: Date;
  
  // Exponemos Math al HTML para el cálculo trigonométrico del vaivén
  protected readonly Math = Math; 
}