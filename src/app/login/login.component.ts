import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from '../service/serviceJWE';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private encryptionService: EncryptionService,private toastr: ToastrService) {}

  async login() {
    console.log(`Intento de inicio de sesión con el usuario: ${this.username}`);
    if ((this.username === 'angelolm' || this.username === 'user') && this.password === 'admin') {
      console.log('Inicio de sesión exitoso');
      
      // Encriptar el username antes de almacenarlo
      const encryptedUsername = await this.encryptionService.encryptUsername(this.username);
      localStorage.setItem('userType', encryptedUsername); // Almacenar el username encriptado
      console.log('\n\n------DATOS ENCRIPTADOS ------');
      console.log('Datos del usuario para enviar a chat:', encryptedUsername);
      console.log('---------------------------\n\n');
      this.toastr.info(`${this.username}`, 'Cuenta:');
      this.toastr.success(`Datos encriptados`, 'Encriptado');

      this.router.navigate(['/chat']);
    } else {
      this.toastr.error('Error en el inicio de sesión', 'Error');
      console.log('Error en el inicio de sesión');
      this.loginError = true;
    }
  }
}