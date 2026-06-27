import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importación de los 6 relojes históricos
import { RelojSolComponent } from './shared/components/relojes/reloj-sol/reloj-sol.component';
import { RelojAguaComponent } from './shared/components/relojes/reloj-agua/reloj-agua.component';
import { RelojArenaComponent } from './shared/components/relojes/reloj-arena/reloj-arena.component';
import { RelojVelaComponent } from './shared/components/relojes/reloj-vela/reloj-vela.component';
import { RelojPenduloComponent } from './shared/components/relojes/reloj-pendulo/reloj-pendulo.component';
import { RelojCuarzoComponent } from './shared/components/relojes/reloj-cuarzo/reloj-cuarzo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RelojSolComponent, 
    RelojAguaComponent, 
    RelojArenaComponent,
    RelojVelaComponent,
    RelojPenduloComponent,
    RelojCuarzoComponent
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
          <button [class.active]="relojSeleccionado === 'sol'" (click)="seleccionarReloj('sol')">☀️ 1. Sol</button>
          <button [class.active]="relojSeleccionado === 'agua'" (click)="seleccionarReloj('agua')">💧 2. Agua</button>
          <button [class.active]="relojSeleccionado === 'arena'" (click)="seleccionarReloj('arena')">⏳ 3. Arena</button>
          <button [class.active]="relojSeleccionado === 'vela'" (click)="seleccionarReloj('vela')">🕯️ 4. Vela</button>
          <button [class.active]="relojSeleccionado === 'pendulo'" (click)="seleccionarReloj('pendulo')">⚙️ 5. Péndulo</button>
          <button [class.active]="relojSeleccionado === 'cuarzo'" (click)="seleccionarReloj('cuarzo')">📟 6. Cuarzo</button>
        </div>
      </header>

      <main class="timeline-display">
        <app-reloj-sol   *ngIf="relojSeleccionado === 'sol'"   [hora]="horaGlobal"></app-reloj-sol>
        <app-reloj-agua  *ngIf="relojSeleccionado === 'agua'"  [hora]="horaGlobal"></app-reloj-agua>
        <app-reloj-arena *ngIf="relojSeleccionado === 'arena'" [hora]="horaGlobal"></app-reloj-arena>
        <app-reloj-vela    *ngIf="relojSeleccionado === 'vela'"    [hora]="horaGlobal"></app-reloj-vela>
        <app-reloj-pendulo *ngIf="relojSeleccionado === 'pendulo'" [hora]="horaGlobal"></app-reloj-pendulo>
        <app-reloj-cuarzo  *ngIf="relojSeleccionado === 'cuarzo'"  [hora]="horaGlobal"></app-reloj-cuarzo>
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
    
    .control-row { display: flex; align-items: center; gap: 1rem; }

    .btn-play {
      background: #2e7d32; color: white; border: none; padding: 0.6rem 1rem;
      border-radius: 6px; cursor: pointer; font-weight: bold; white-space: nowrap; transition: background 0.2s;
    }
    .btn-play:hover { background: #388e3c; }
    .btn-play.playing { background: #c62828; }
    .btn-play.playing:hover { background: #d32f2f; }

    .time-slider { width: 100%; cursor: pointer; accent-color: #ffd700; }
    .time-slider:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .alert-text { color: #aaa; display: block; margin-top: 0.5rem; font-style: italic; }

    .selector-relojes { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
    .selector-relojes button { background: #2a2a2a; color: #fff; border: 1px solid #444; padding: 0.6rem 1.2rem; border-radius: 25px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s ease; }
    .selector-relojes button.active { background: #ffd700; color: #121212; border-color: #ffd700; font-weight: bold; box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
    .timeline-display { display: flex; justify-content: center; align-items: center; min-height: 400px; margin-top: 2rem; }
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

  seleccionarReloj(tipo: string) {
    this.relojSeleccionado = tipo;
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