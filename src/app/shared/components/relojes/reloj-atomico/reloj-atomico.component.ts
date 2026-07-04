import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-atomico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-atomico.component.html',
  styleUrls: ['./reloj-atomico.component.css']
})
export class RelojAtomicoComponent { @Input() hora!: Date; }