import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  @Output() loginExitoso = new EventEmitter<string>();

  isLoginMode = true;
  email = '';
  password = '';
  username = '';
  errorMensaje = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMensaje = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMensaje = 'Por favor, llena todos los campos.';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios_reloj') || '[]');

    if (this.isLoginMode) {
      // Lógica de Inicio de Sesión
      const usuarioEncontrado = usuarios.find((u: any) => u.email === this.email && u.password === this.password);
      if (usuarioEncontrado) {
        this.loginExitoso.emit(usuarioEncontrado.username);
      } else {
        this.errorMensaje = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    } else {
      // Lógica de Registro
      if (!this.username) {
        this.errorMensaje = 'El nombre de usuario es obligatorio.';
        return;
      }
      if (usuarios.some((u: any) => u.email === this.email)) {
        this.errorMensaje = 'El correo ya se encuentra registrado.';
        return;
      }

      usuarios.push({ username: this.username, email: this.email, password: this.password });
      localStorage.setItem('usuarios_reloj', JSON.stringify(usuarios));
      
      // Auto-login tras registrarse con éxito
      this.loginExitoso.emit(this.username);
    }
  }
}