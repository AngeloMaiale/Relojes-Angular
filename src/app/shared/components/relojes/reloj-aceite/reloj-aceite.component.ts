import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-aceite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-aceite.component.html',
  styleUrls: ['./reloj-aceite.component.css']
})
export class RelojAceiteComponent { @Input() hora!: Date; }