import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-vela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-vela.component.html',
  styleUrls: ['./reloj-vela.component.css']
})
export class RelojVelaComponent {
  @Input() hora!: Date;
}