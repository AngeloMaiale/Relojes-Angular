import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-incienso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-incienso.component.html',
  styleUrls: ['./reloj-incienso.component.css']
})
export class RelojInciensoComponent { @Input() hora!: Date; }