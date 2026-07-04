import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './shared/components/auth/auth.component';
import { RelojSolComponent } from './shared/components/relojes/reloj-sol/reloj-sol.component';
import { RelojAguaComponent } from './shared/components/relojes/reloj-agua/reloj-agua.component';
import { RelojArenaComponent } from './shared/components/relojes/reloj-arena/reloj-arena.component';
import { RelojVelaComponent } from './shared/components/relojes/reloj-vela/reloj-vela.component';
import { RelojPenduloComponent } from './shared/components/relojes/reloj-pendulo/reloj-pendulo.component';
import { RelojCuarzoComponent } from './shared/components/relojes/reloj-cuarzo/reloj-cuarzo.component';
import { RelojInciensoComponent } from './shared/components/relojes/reloj-incienso/reloj-incienso.component';
import { RelojAceiteComponent } from './shared/components/relojes/reloj-aceite/reloj-aceite.component';
import { RelojBolsilloComponent } from './shared/components/relojes/reloj-bolsillo/reloj-bolsillo.component';
import { RelojAtomicoComponent } from './shared/components/relojes/reloj-atomico/reloj-atomico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AuthComponent,
    RelojSolComponent,
    RelojAguaComponent,
    RelojArenaComponent,
    RelojVelaComponent,
    RelojPenduloComponent,
    RelojCuarzoComponent,
    RelojInciensoComponent,
    RelojAceiteComponent,
    RelojBolsilloComponent,
    RelojAtomicoComponent,
  ],
  template: `
    <app-auth *ngIf="!usuarioLogueado" (loginExitoso)="manejarLogin($event)"></app-auth>

    <div class="dashboard-container" *ngIf="usuarioLogueado">
      <header>
        <div class="user-badge">
          🛡️ Sistema de Gestión: {{ usuarioLogueado }} |
          <span class="logout" (click)="logout()">Cerrar Sesión</span>
        </div>

        <h1>Línea de Tiempo Histórica de Relojes</h1>
        <p>Monitorea el flujo del tiempo o acelera la simulación cuántica</p>

        <div class="slider-box">
          <span class="time-display">{{ horaGlobal | date: 'HH:mm:ss' }}</span>

          <div class="control-row">
            <button class="btn-play" (click)="toggleTiempoReal()" [class.playing]="enTiempoReal">
              {{ enTiempoReal ? '⏸️ Pausar Simulación' : '▶️ Activar Simulación' }}
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

          <div class="velocidad-box" *ngIf="enTiempoReal">
            <label>Multiplicador de Flujo Temporal:</label>
            <select [(ngModel)]="multiplicadorVelocidad">
              <option [ngValue]="1">1x (Tiempo Real)</option>
              <option [ngValue]="10">10x (Acelerado)</option>
              <option [ngValue]="60">60x (1 Minuto por Segundo)</option>
              <option [ngValue]="600">600x (Modo Hiperespacio)</option>
            </select>
          </div>

          <small *ngIf="enTiempoReal" class="alert-text"
            >Simulación activa ejecutándose a 20 ticks/seg.</small
          >
          <small *ngIf="!enTiempoReal" class="alert-text manual"
            >Modo manual: Arrastra el slider para controlar los relojes.</small
          >
        </div>

        <div class="selector-relojes">
          <button [class.active]="relojSeleccionado === 'sol'" (click)="seleccionarReloj('sol')">
            ☀️ 1. Sol (~1500 a.C.)
          </button>
          <button [class.active]="relojSeleccionado === 'agua'" (click)="seleccionarReloj('agua')">
            💧 2. Agua (~1400 a.C.)
          </button>
          <button
            [class.active]="relojSeleccionado === 'arena'"
            (click)="seleccionarReloj('arena')"
          >
            ⏳ 3. Arena (~Siglo III d.C.)
          </button>
          <button
            [class.active]="relojSeleccionado === 'incienso'"
            (click)="seleccionarReloj('incienso')"
          >
            🪵 4. Incienso (~Siglo VI d.C.)
          </button>
          <button [class.active]="relojSeleccionado === 'vela'" (click)="seleccionarReloj('vela')">
            🕯️ 5. Vela (~Siglo IX d.C.)
          </button>
          <button
            [class.active]="relojSeleccionado === 'aceite'"
            (click)="seleccionarReloj('aceite')"
          >
            🛢️ 6. Aceite (~Siglo XVI d.C.)
          </button>
          <button
            [class.active]="relojSeleccionado === 'pendulo'"
            (click)="seleccionarReloj('pendulo')"
          >
            ⚙️ 7. Péndulo (~1656)
          </button>
          <button
            [class.active]="relojSeleccionado === 'bolsillo'"
            (click)="seleccionarReloj('bolsillo')"
          >
            ⌚ 8. Bolsillo (~Siglo XVIII)
          </button>
          <button
            [class.active]="relojSeleccionado === 'cuarzo'"
            (click)="seleccionarReloj('cuarzo')"
          >
            📟 9. Cuarzo (~1927)
          </button>
          <button
            [class.active]="relojSeleccionado === 'atomico'"
            (click)="seleccionarReloj('atomico')"
          >
            ⚛️ 10. Atómico (~1967)
          </button>
        </div>
      </header>

      <main class="timeline-display">
        <app-reloj-sol *ngIf="relojSeleccionado === 'sol'" [hora]="horaGlobal"></app-reloj-sol>
        <app-reloj-agua *ngIf="relojSeleccionado === 'agua'" [hora]="horaGlobal"></app-reloj-agua>
        <app-reloj-arena
          *ngIf="relojSeleccionado === 'arena'"
          [hora]="horaGlobal"
        ></app-reloj-arena>
        <app-reloj-vela *ngIf="relojSeleccionado === 'vela'" [hora]="horaGlobal"></app-reloj-vela>
        <app-reloj-pendulo
          *ngIf="relojSeleccionado === 'pendulo'"
          [hora]="horaGlobal"
        ></app-reloj-pendulo>
        <app-reloj-cuarzo
          *ngIf="relojSeleccionado === 'cuarzo'"
          [hora]="horaGlobal"
        ></app-reloj-cuarzo>
        <app-reloj-incienso
          *ngIf="relojSeleccionado === 'incienso'"
          [hora]="horaGlobal"
        ></app-reloj-incienso>
        <app-reloj-aceite
          *ngIf="relojSeleccionado === 'aceite'"
          [hora]="horaGlobal"
        ></app-reloj-aceite>
        <app-reloj-bolsillo
          *ngIf="relojSeleccionado === 'bolsillo'"
          [hora]="horaGlobal"
        ></app-reloj-bolsillo>
        <app-reloj-atomico
          *ngIf="relojSeleccionado === 'atomico'"
          [hora]="horaGlobal"
        ></app-reloj-atomico>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #121212;
        color: #ffffff;
        min-height: 100vh;
        font-family: system-ui, sans-serif;
      }
      .dashboard-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .user-badge {
        text-align: right;
        color: #ffd700;
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }
      .logout {
        color: #ff5555;
        cursor: pointer;
        text-decoration: underline;
        margin-left: 8px;
      }
      .logout:hover {
        color: #ff3333;
      }

      .slider-box {
        background: #1e1e1e;
        padding: 1.5rem;
        border-radius: 12px;
        display: inline-block;
        width: 100%;
        max-width: 550px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        margin-bottom: 2rem;
      }
      .time-display {
        font-size: 2.8rem;
        font-family: monospace;
        font-weight: bold;
        color: #ffd700;
        display: block;
        margin-bottom: 1rem;
      }
      .control-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .btn-play {
        background: #2e7d32;
        color: white;
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        min-width: 160px;
      }
      .btn-play.playing {
        background: #c62828;
      }
      .time-slider {
        width: 100%;
        cursor: pointer;
        accent-color: #ffd700;
      }

      .velocidad-box {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      .velocidad-box select {
        background: #2a2a2a;
        color: white;
        border: 1px solid #444;
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      }
      .alert-text {
        display: block;
        font-style: italic;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #58a6ff;
      }
      .alert-text.manual {
        color: #ffa500;
      }

      .selector-relojes {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        flex-wrap: wrap;
      }
      .selector-relojes button {
        background: #2a2a2a;
        color: #fff;
        border: 1px solid #444;
        padding: 0.6rem 1.2rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.85rem;
      }
      .selector-relojes button.active {
        background: #ffd700;
        color: #121212;
        border-color: #ffd700;
        font-weight: bold;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
      }

      .timeline-display {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 420px;
        margin-top: 2rem;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  usuarioLogueado: string | null = null;
  minutosDelDia: number = 0;
  horaGlobal: Date = new Date();
  relojSeleccionado: string = 'sol';
  enTiempoReal: boolean = true;
  multiplicadorVelocidad: number = 1;

  private loopTimerId: any = null;
  private ultimoTimestamp: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.usuarioLogueado = localStorage.getItem('sesion_activa');
    this.ultimoTimestamp = Date.now();
    this.arrancarBucleFrecuencia();
  }

  ngOnDestroy() {
    this.detenerTemporizador();
  }

  arrancarBucleFrecuencia() {
    this.detenerTemporizador();
    this.ultimoTimestamp = Date.now();

    this.loopTimerId = setInterval(() => {
      const ahora = Date.now();
      const deltaMs = ahora - this.ultimoTimestamp;
      this.ultimoTimestamp = ahora;

      if (this.enTiempoReal) {
        const tiempoAvanzadoMs = deltaMs * this.multiplicadorVelocidad;
        const nuevaFecha = new Date(this.horaGlobal.getTime() + tiempoAvanzadoMs);
        this.sincronizarConFecha(nuevaFecha);
      } else {
        const nuevaFecha = new Date(this.horaGlobal.getTime() + deltaMs);
        const horasSlider = Math.floor(this.minutosDelDia / 60);
        const minutosSlider = this.minutosDelDia % 60;
        nuevaFecha.setHours(horasSlider, minutosSlider);
        this.horaGlobal = nuevaFecha;
      }

      this.cdr.detectChanges();
    }, 50);
  }

  usuarioMueveSlider() {
    const nuevaFecha = new Date();
    const horas = Math.floor(this.minutosDelDia / 60);
    const minutos = this.minutosDelDia % 60;
    nuevaFecha.setHours(horas, minutos, 0, 0);
    this.horaGlobal = nuevaFecha;
    this.cdr.detectChanges();
  }

  toggleTiempoReal() {
    this.enTiempoReal = !this.enTiempoReal;
    this.ultimoTimestamp = Date.now();
    this.cdr.detectChanges();
  }

  seleccionarReloj(tipo: string) {
    this.relojSeleccionado = tipo;
    this.cdr.detectChanges();
  }

  manejarLogin(username: string) {
    this.usuarioLogueado = username;
    localStorage.setItem('sesion_activa', username);
    this.ultimoTimestamp = Date.now();
  }

  logout() {
    this.usuarioLogueado = null;
    localStorage.removeItem('sesion_activa');
  }

  private sincronizarConFecha(fecha: Date) {
    this.horaGlobal = fecha;
    this.minutosDelDia = fecha.getHours() * 60 + fecha.getMinutes();
  }

  private detenerTemporizador() {
    if (this.loopTimerId) {
      clearInterval(this.loopTimerId);
      this.loopTimerId = null;
    }
  }
}
