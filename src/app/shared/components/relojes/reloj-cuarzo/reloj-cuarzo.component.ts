import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-cuarzo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-cuarzo.component.html',
  styleUrls: ['./reloj-cuarzo.component.css']
})
export class RelojCuarzoComponent {
  @Input() hora!: Date;
}