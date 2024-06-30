import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../service/serviceJWE';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})  
export class ChatComponent implements OnInit {
  messages: Array<{ sender: string, content: string }> = []; // Lista de mensajes en el chat
  newMessage: string = ''; // Nuevo mensaje escrito o recibido // sender: 'other' -> mensaje recibido // sender: 'user' -> mensaje enviado
  userName: string = 'No-enviado';

  constructor(private encryptionService: EncryptionService, private router: Router) { }

  async ngOnInit() {
    // Obtener el userType encriptado desde el localStorage
    const encryptedUserType = localStorage.getItem('userType');

    // Se recibe el mensaje encriptado-----------
    /*
    console.log('\n\n---------TEST--------------');
    console.log('--TEST-- Nombre de usuario es:', this.userName) // Compruebo si el nombre de usuario (Debe obtener 'No-enviado' en la consola porque aún no se ha desencriptado el nombre de usuario)
    console.log(`--TEST-- Tipo de usuario encriptado: ${encryptedUserType}`); // Se recibe el mensaje encriptado (Debe obtener el mensaje encriptado en la consola)
    console.log('---------------------------\n\n');
    */
    if (encryptedUserType) {
      try {
        // Desencriptar el userType
        const decryptedUserType = await this.encryptionService.decryptUsername(encryptedUserType);
        switch (decryptedUserType) {
          case 'user':
            this.userName = 'Usuario de Prueba';
            break;
          case 'angelolm':
            this.userName = 'Angelo';
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      } catch (error) {
        
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    console.log('\n\n-------DESENCRIPTADO---------');
    console.log('nombre de usuario es:', this.userName)
    console.log('-----------------------------\n\n');
    // Mensaje inicial de bienvenida
    const mensajeInicial = `Hola ${this.userName}, bienvenido al chat, escribe algo y te devolveré el texto de manera encriptada usando JWE`;
    this.messages.push({ sender: 'other', content: mensajeInicial });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const element = document.querySelector('.messages');
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() !== '') {
      // Encriptar el mensaje del usuario
      const encryptedMessage = await this.encryptionService.encryptMessage(this.newMessage);
      console.log(`Texto encriptado: ${encryptedMessage}`);

      // Desencriptar el mensaje
      const decryptedMessage = await this.encryptionService.decryptMessage(encryptedMessage);
      console.log(`Texto recibido encriptado: ${encryptedMessage}`);
      console.log(`Texto descencriptado: ${decryptedMessage}`);

      // Añadir el mensaje del usuario a la lista de mensajes
      this.messages.push({ sender: 'user', content: this.newMessage });
      this.scrollToBottom();

      // Añadir un mensaje de carga
      const loadingMessageIndex = this.messages.push({ sender: 'other', content: '...' }) - 1;
      this.scrollToBottom();

      // Esperar 2 segundos antes de reemplazar el mensaje de carga con el mensaje encriptado
      setTimeout(() => {
        this.messages.splice(loadingMessageIndex, 1);

        // Añadir el mensaje desencriptado y encriptado a la lista de mensajes
        this.messages.push({ sender: 'other', content: `El mensaje enviado es: ${decryptedMessage}` });
        this.messages.push({ sender: 'other', content: `${encryptedMessage} 📋` });
        this.scrollToBottom();
      }, 2000);

      this.newMessage = '';
    }
  }

  copyMessageToClipboard(messageIndex: number): void {
    const messageContent = this.messages[messageIndex].content.replace(' 📋', ''); // Extraer el contenido del mensaje sin el emoji
    const tempTextArea = document.createElement('textarea'); // Crear un elemento textarea temporal, necesario para el proceso de copiado
    tempTextArea.value = messageContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    console.log('Mensaje copiado al portapapeles');
  }
}
