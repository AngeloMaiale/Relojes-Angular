import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-bolsillo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-bolsillo.component.html',
  styleUrls: ['./reloj-bolsillo.component.css']
})
export class RelojBolsilloComponent { @Input() hora!: Date; }