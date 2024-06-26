import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../service/serviceJWE';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [EncryptionService]
})
export class ChatComponent implements OnInit {
  messages: Array<{ sender: string, content: string }> = [];
  newMessage: string = '';
  router: any;
  
  constructor(private encryptionService: EncryptionService) {}

  ngOnInit() {
    const userType = localStorage.getItem('userType');
    let nombreUsuario = '';
  
    switch (userType) {
      case 'user':
        nombreUsuario = 'Usuario de Prueba';
        break;
      case 'angelolm':
        nombreUsuario = 'Angelo';
        break;
      default:
        nombreUsuario = 'Desconocido';
        this.router.navigate(['/chat']);
        break;
    }
  
    const mensajeInicial = `Hola ${nombreUsuario}, bienvenido al chat, escribe algo y te devolveré el texto de manera encriptada usando JWE`;
    this.messages.push({ sender: 'other', content: mensajeInicial });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const element = document.querySelector('.messages');
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 100); // Un pequeño retraso asegura que el DOM se actualice con los mensajes antes de ajustar el scroll
  }
  
  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() !== '') {
      const encryptedMessage = await this.encryptionService.encryptMessage(this.newMessage);
      console.log(`Texto encriptado: ${encryptedMessage}`); // Log del texto encriptado
  
      const decryptedMessage = await this.encryptionService.decryptMessage(encryptedMessage);
      console.log(`Texto recibido encriptado: ${encryptedMessage}`); // Log del texto recibido encriptado (redundante pero solicitado)
      console.log(`Texto descencriptado: ${decryptedMessage}`); // Log del texto descencriptado
  
      this.messages.push({ sender: 'user', content: this.newMessage }); // Mensaje enviado por el usuario
      this.scrollToBottom();

      // Agrega el mensaje de carga
      const loadingMessageIndex = this.messages.push({ sender: 'other', content: '...' }) - 1;
      this.scrollToBottom(); // Ajusta el scroll después de agregar el mensaje de carga
      
      // Espera 2 segundos antes de reemplazar el mensaje de carga con el mensaje encriptado
      setTimeout(() => {
        // Elimina el mensaje de carga
        this.messages.splice(loadingMessageIndex, 1);
      
        // Agrega el mensaje encriptado y el mensaje descencriptado
        this.messages.push({ sender: 'other', content: `El mensaje enviado es: ${decryptedMessage}` }); // Mensaje recibido por el usuario
        // Aquí se agrega el emoji de copiar únicamente al mensaje encriptado
        this.messages.push({ sender: 'other', content: `${encryptedMessage} 📋` }); // Mensaje recibido por el usuario encriptado con emoji de copiar
        this.scrollToBottom(); // Ajusta el scroll después de agregar los mensajes encriptados y desencriptados
      }, 2000);
      
      this.newMessage = '';
      
    }
    
  }
  copyMessageToClipboard(messageIndex: number): void {
    // Extrae el contenido del mensaje sin el emoji
    const messageContent = this.messages[messageIndex].content.replace(' 📋', '');
    
    // Crea un elemento textarea temporal, necesario para el proceso de copiado
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = messageContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    // Opcional: Muestra una notificación o mensaje de que el contenido ha sido copiado
    console.log('Mensaje copiado al portapapeles');
  }
}
//