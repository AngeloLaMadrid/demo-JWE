import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) {}

  login() {
    console.log(`Intento de inicio de sesión con el usuario: ${this.username}`);
    if ((this.username === 'angelolm' || this.username === 'user') && this.password === 'admin') {
      console.log('---------------------');
      console.log('Inicio de sesión exitoso');
      console.log('---------------------');
      console.log(`Usuario ingresando: ${this.username}`);
      console.log('---------------------');
      
      localStorage.setItem('userType', this.username);// Guardar el tipo de usuario en localStorage
      this.router.navigate(['/chat']);
    } else {
      console.log('Error en el inicio de sesión');
      this.loginError = true;
    }
  }
}