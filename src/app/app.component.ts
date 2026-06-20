import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelojSolComponent } from './shared/components/relojes/reloj-sol/reloj-sol.component';
import { RelojAguaComponent } from './shared/components/relojes/reloj-agua/reloj-agua.component';
import { RelojArenaComponent } from './shared/components/relojes/reloj-arena/reloj-arena.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RelojSolComponent, 
    RelojAguaComponent, 
    RelojArenaComponent
  ],
  template: `
    <div class="dashboard-container">
      <header>
        <h1>Línea de Tiempo Histórica de Relojes</h1>
        <p>Monitorea el flujo del tiempo o viaja manualmente usando los controles</p>
        
        <div class="slider-box">
          <span class="time-display">{{ horaGlobal | date:'HH:mm:ss' }}</span>
          
          <div class="control-row">
            <button class="btn-play" (click)="toggleTiempoReal()" [class.playing]="enTiempoReal">
              {{ enTiempoReal ? '⏸️ Pausar' : '▶️ Tiempo Real' }}
            </button>
            
            <input 
              type="range" 
              min="0" 
              max="1439" 
              [(ngModel)]="minutosDelDia" 
              (input)="usuarioMueveSlider()" 
              [disabled]="enTiempoReal"
              class="time-slider"
            />
          </div>
          <small *ngIf="enTiempoReal" class="alert-text">Desactiva "Tiempo Real" para usar el slider</small>
        </div>

        <div class="selector-relojes">
          <button [class.active]="relojSeleccionado === 'sol'" (click)="relojSeleccionado = 'sol'">
            ☀️ 1. Reloj de Sol
          </button>
          <button [class.active]="relojSeleccionado === 'agua'" (click)="relojSeleccionado = 'agua'">
            💧 2. Clepsidra (Agua)
          </button>
          <button [class.active]="relojSeleccionado === 'arena'" (click)="relojSeleccionado = 'arena'">
            ⏳ 3. Reloj de Arena
          </button>
        </div>
      </header>

      <main class="timeline-display">
        <app-reloj-sol   *ngIf="relojSeleccionado === 'sol'"   [hora]="horaGlobal"></app-reloj-sol>
        <app-reloj-agua  *ngIf="relojSeleccionado === 'agua'"  [hora]="horaGlobal"></app-reloj-agua>
        <app-reloj-arena *ngIf="relojSeleccionado === 'arena'" [hora]="horaGlobal"></app-reloj-arena>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #121212;
      color: #ffffff;
      min-height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .dashboard-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 2rem; }
    
    .slider-box { 
      background: #1e1e1e; 
      padding: 1.5rem; 
      border-radius: 12px; 
      display: inline-block; 
      width: 100%; 
      max-width: 550px; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.5); 
      box-sizing: border-box; 
      margin-bottom: 2rem; 
    }
    .time-display { font-size: 2.8rem; font-family: monospace; font-weight: bold; color: #ffd700; display: block; margin-bottom: 1rem; }
    
    .control-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-play {
      background: #2e7d32;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      white-space: nowrap;
      transition: background 0.2s;
    }
    .btn-play:hover { background: #388e3c; }
    .btn-play.playing { background: #c62828; }
    .btn-play.playing:hover { background: #d32f2f; }

    .time-slider { width: 100%; cursor: pointer; accent-color: #ffd700; }
    .time-slider:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .alert-text { color: #aaa; display: block; margin-top: 0.5rem; font-style: italic; }

    .selector-relojes { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
    .selector-relojes button { background: #2a2a2a; color: #fff; border: 1px solid #444; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; }
    .selector-relojes button.active { background: #ffd700; color: #121212; border-color: #ffd700; font-weight: bold; box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
    .timeline-display { display: flex; justify-content: center; align-items: center; min-height: 380px; margin-top: 2rem; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  minutosDelDia: number = 720; 
  horaGlobal: Date = new Date();
  relojSeleccionado: string = 'sol';
  
  enTiempoReal: boolean = false;
  private timerId: any = null;

  ngOnInit() {
    this.sincronizarConFecha(new Date());
  }

  ngOnDestroy() {
    this.detenerTemporizador();
  }

  
  usuarioMueveSlider() {
    const nuevaFecha = new Date();
    const horas = Math.floor(this.minutosDelDia / 60);
    const minutos = this.minutosDelDia % 60;
    nuevaFecha.setHours(horas, minutos, 0, 0); 
    this.horaGlobal = nuevaFecha;
  }

  
  toggleTiempoReal() {
    this.enTiempoReal = !this.enTiempoReal;
    if (this.enTiempoReal) {
      this.timerId = setInterval(() => {
        this.sincronizarConFecha(new Date());
      }, 1000);
    } else {
      this.detenerTemporizador();
    }
  }

  private sincronizarConFecha(fecha: Date) {
    this.horaGlobal = fecha;
    
    this.minutosDelDia = (fecha.getHours() * 60) + fecha.getMinutes();
  }

  private detenerTemporizador() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}