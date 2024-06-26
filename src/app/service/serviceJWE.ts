import { generateKeyPair, exportJWK, importJWK, CompactEncrypt, compactDecrypt } from 'jose';

// VERIFICAR EL JWE: https://dinochiesa.github.io/jwt/
export class EncryptionService {
  private publicKey: any;
  private privateKey: any;
  private publicKeyCrypto: CryptoKey | undefined;
  private privateKeyCrypto: CryptoKey | undefined;

  constructor() {
    this.init();
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('--Versión 1: manualmente --');
    console.log('---------------------------');
    console.log('---------------------------');
  
  }
  // Lo que hace esto es que inicializa las claves publicas y privadas
  private async init() {
    const pemToCryptoKey = async (pem: string, keyType: 'public' | 'private'): Promise<CryptoKey> => {
      // Paso 1: Extraer el cuerpo de la clave PEM
      const pemBody = pem.replace(/-----\w+ PRIVATE KEY-----/g, '').replace(/-----\w+ PUBLIC KEY-----/g, '').replace(/\n/g, '');
      // Paso 2: Convertir base64 a ArrayBuffer
      const binaryDerString = window.atob(pemBody);
      const binaryDer = new Uint8Array(binaryDerString.length);
      for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
      }
      // Paso 3: Importar como CryptoKey
      if (keyType === 'public') {
        return window.crypto.subtle.importKey(
          'spki',
          binaryDer.buffer,
          {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
          },
          true,
          ['encrypt']
        );
      } else { // Recordatorio: 'private'
        return window.crypto.subtle.importKey(
          'pkcs8',
          binaryDer.buffer,
          {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
          },
          true,
          ['decrypt']
        );
      }
    };
  //Generados mediante: https://dinochiesa.github.io/jwt/
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3/LMwfzY1YBq5mcOK6zz
a52lLjuPrtW3lXzYlXwlFlTzMlwe4X1Paok+rP2JBlBSDzqNGHs3R6Vr3jnNkN2r
97tgbFx6oqnDsNSl6UkUSAYZHPPXg8M5d0wPNJ/oPCW30lxgkVXLpWpQ0J5J+6c+
alae2vl6Vk6QlkC4JuSEavrAkQVzPzhV8baaQsrLMF/gg6UTYaQvWz72YKfoTj+h
gHzIsbt1C6S1SWzpW2UeKnQ3NO7yY/tpOHeSF40554kzqpVEtJndByyoPjFLxK6e
2GAUdTulQF2q1giRqla6csb/GBOAuXeM1X3MuwpuxUGpf7Z9Sr9SL5eazKH8Lb+S
BQIDAQAB
-----END PUBLIC KEY-----`;
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDf8szB/NjVgGrm
Zw4rrPNrnaUuO4+u1beVfNiVfCUWVPMyXB7hfU9qiT6s/YkGUFIPOo0YezdHpWve
Oc2Q3av3u2BsXHqiqcOw1KXpSRRIBhkc89eDwzl3TA80n+g8JbfSXGCRVculalDQ
nkn7pz5qVp7a+XpWTpCWQLgm5IRq+sCRBXM/OFXxtppCysswX+CDpRNhpC9bPvZg
p+hOP6GAfMixu3ULpLVJbOlbZR4qdDc07vJj+2k4d5IXjTnniTOqlUS0md0HLKg+
MUvErp7YYBR1O6VAXarWCJGqVrpyxv8YE4C5d4zVfcy7Cm7FQal/tn1Kv1Ivl5rM
ofwtv5IFAgMBAAECggEAPNzMvw/LkkKjStjJJh+LzDx8ztLLGtXkXdEfP4kMv0P5
ED+u+NNIiQihqvwAiGG923urKvMZs/QGG9ATyQIloV8gNnLvtVNz5pP0PzFoPKbD
nnW6pYmiDYTzQPcQc4BAs//9EqKBhQQe0IOkUatDMD04UQSqNdiGPP97zL4gKr5W
vHhlgyHO5uD6OEl086VCHhgQ7Km8t036cvWehMudJcik2q+4wjlObEnKI0dx0sSG
k3umFwyjrfUjFIE3uXHglbzJitm4fwJsD9MbzI1RQxokSNGKBywcgS0ZqTKmdq3B
5tkcJZA/Q7ljpkKNy5tfohGsmHCV5B6LzykeEVq/xQKBgQD/J+MDpCVtEerGHaAb
xtcew6ACwNiUCcve7cD26rvqUda1KWGqsmEZv5vSLqkKIa5ApZgmd62jxVEw/oIh
a55czl6govyiI2EBuCNuVkSLOQWj9tUORdMYrF9+YEIYggJZxmFYOKFdpXrdAi+D
vY2SvGQmv4CMWQXURtFM7NiVlwKBgQDgsHsapySH2HtlKpcOJOZB7Le1XNC0J4Nd
k4c2AAk+K0YnuN2+a3WlQqqqPV7S6BHDGpyOOTfmNkSXUYaHZF2Qtd/7MIqY85e/
gCiiFui06W04NYgNeZkModNZXledxH7mIh7kHt0Zq96q6JXeZM9sVZQK4c/hGAhl
5XSBoFtgwwKBgFMSUGXKFmlJUQ+Ja6w/c6BPfpQG5zxjaB2/eHiredzTIj0/KM4j
X1u7t2aZzG1BA/OGNmAnzL+qKUHzSrjIyflbMxHHnsrHC/k8U0TED3LocL6uSTVp
ZE3/KOQDQOGrykoiPWU0oszTaIn2ATQ6DZK9hTncVWTcQvqWx+PspKMnAoGAFlp4
ZNZsE/e9jvsFvCp/nd9nB2wMd1/W+eBLe1vVj5HOkPUbWm5mbeKMCBPC80iTO83R
9XRL02Niv4skzyN1C4iMl/jkUQMq/apKYJXW4Oi4LPdmabDHQTJ4TFPOc6uw1ERg
vmEzrfIjXO12u4FcAXMiH1MH02UIsNp7FMpXTPECgYAEWTZFgpeQj74729/Q/Mye
ndIpaw1ybJbylZud9anQMAEue0UPrw9/frT+/kHYVsm5H3qDzIw4Z0i3rT91pNc/
YfNd5lNZqphmR/XbZv1/QDP2HD3NDkySoBFynGuEwL76uhD2HL1fOT4a1gTduOKR
VsK33AMjXhW2/dbLuoHOeA==
-----END PRIVATE KEY-----`;

    this.publicKeyCrypto = await pemToCryptoKey(publicKey, 'public');
    this.privateKeyCrypto = await pemToCryptoKey(privateKey, 'private');

    // Imprimir la clave privada para depuración
    //console.log('Clave privada:', privateKey);
  }

  public async encryptMessage(message: string): Promise<string> {
    const encoder = new TextEncoder();
    if (!this.publicKeyCrypto) {
      throw new Error('Public key no esta inicializando OJO!!');
    }
    // Usa publicKeyCrypto en lugar de this.publicKey
    const encryptedMessage = await new CompactEncrypt(encoder.encode(message))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(this.publicKeyCrypto); // Cambiado a publicKeyCrypto
    return encryptedMessage;
  }

  public async decryptMessage(encryptedMessage: string): Promise<string> {
    if (!this.privateKeyCrypto) {
      throw new Error('Public key no esta inicializando OJO!!');
    }
    // Usa privateKeyCrypto en lugar de this.privateKey
    const { plaintext } = await compactDecrypt(encryptedMessage, this.privateKeyCrypto); // Cambiado a privateKeyCrypto
    const decoder = new TextDecoder();
    return decoder.decode(plaintext);
  }
}
