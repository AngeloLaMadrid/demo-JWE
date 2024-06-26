// esto es un backup del archivo serviceJWE.ts, el cual se encuentra en la carpeta service
import { generateKeyPair, exportJWK, importJWK, CompactEncrypt, compactDecrypt } from 'jose';

export class EncryptionService {
  private publicKey: any;
  private privateKey: any;

  constructor() {
    this.init();
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('-Versión 2: usando liberia-');
    console.log('---------------------------');
    console.log('---------------------------');
  }

private async init() {
  const { publicKey, privateKey } = await generateKeyPair('RSA-OAEP-256');
  this.publicKey = publicKey;
  this.privateKey = privateKey;
  
  // Imprimir la clave privada para depuración
  console.log('Clave privada:', this.privateKey);
}

  public async encryptMessage(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const encryptedMessage = await new CompactEncrypt(encoder.encode(message))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(this.publicKey);
    return encryptedMessage;
  }

  public async decryptMessage(encryptedMessage: string): Promise<string> {
    const { plaintext } = await compactDecrypt(encryptedMessage, this.privateKey);
    const decoder = new TextDecoder();
    return decoder.decode(plaintext);
  }
}