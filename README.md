# demo-JWE 🌐🔐

Este proyecto es una demostración de la implementación de JSON Web Encryption (JWE) utilizando Angular.

Este proyecto hace uso de la biblioteca [`jose`](https://github.com/panva/jose), una completa y versátil herramienta para trabajar con `JSON Web Tokens (JWT)`, `JSON Web Encryption (JWE)`, `JSON Web Signature (JWS)`, y `JSON Web Key (JWK)`.

La elección de `jose` se debe a su amplia compatibilidad, seguridad y facilidad de uso, lo que la convierte en una opción ideal para implementar estándares modernos de seguridad en aplicaciones web.

La biblioteca `jose` se utiliza en este proyecto para:

- Generar pares de claves pública y privada de forma dinámica. (Se usa en `src/app/service/serviceJWE2.ts`)
- Cifrar y descifrar mensajes utilizando el estándar JWE, asegurando que la información sensible se transmita de manera segura.
- Firmar y verificar la autenticidad de los mensajes, proporcionando una capa adicional de seguridad.

Con estas herramientas, el proyecto demuestra cómo implementar una solución de encriptación robusta y segura, adaptándose a las necesidades de seguridad actuales en el desarrollo de aplicaciones web.
## 🎯 Objetivo del Proyecto

Este proyecto tiene como objetivo demostrar la implementación y uso de JSON Web Encryption o tambien conocido como JWE en una aplicación Angular para asegurar la comunicación y el intercambio de datos sensibles. 

A través de este proyecto, se busca demortrar una solución robusta para la encriptación de mensajes en aplicaciones web, garantizando así la privacidad y seguridad de la información compartida entre el cliente y el servidor.


Además, el proyecto incluye una interfaz de usuario intuitiva, con componentes como el chat y el inicio de sesión, para demostrar la encriptación de mensajes en un ```contexto real``` 

## 🚀 Requisitos

- Node.js
- Angular CLI

## 🛠 Ejecución

Para ejecutar el proyecto, utiliza el siguiente comando:

```bash
ng serve
```

## 📁 Descripción de Carpetas y Archivos

- **src/app/chat/**: Componente de chat, incluye su HTML, CSS y especificaciones de pruebas.
- **src/app/key/**: Contiene claves privadas y otros recursos relacionados con la criptografía.
- **src/app/login/**: Componente de inicio de sesión.
- **src/app/service/**: Servicios utilizados en la aplicación, incluyendo `serviceJWE.ts` y `serviceJWE2.ts` para la gestión de la encriptación.
- **app-routing.module.ts**: Configuración de las rutas de la aplicación.
- **app.component.\***: Componente raíz de la aplicación.
- **app.module.ts**: Módulo raíz de la aplicación.


## 🔧 Servicio de Encriptación

Nuestro proyecto implementa una robusta lógica de encriptación distribuida a través de dos servicios principales. El primero, detallado en `src/app/service/serviceJWE.ts`, utiliza un enfoque basado en claves pública y privada para asegurar la comunicación. Este método garantiza que solo el poseedor de la clave privada correspondiente pueda descifrar los mensajes cifrados con la clave pública.

El segundo servicio, ubicado en `src/app/service/serviceJWE2.ts`, aprovecha las capacidades de la biblioteca `jose` para generar y manejar claves de encriptación dinámicamente. Este enfoque permite una mayor flexibilidad y adaptabilidad, facilitando la generación de claves seguras sin la necesidad de gestionarlas manualmente.

Ambos servicios son fundamentales para la seguridad de nuestra aplicación, ofreciendo métodos de encriptación avanzados que se adaptan a diferentes necesidades y escenarios de uso.

## 🖼️ Galería

![Login](https://github.com/AngeloLaMadrid/demo-JWE/assets/101282128/eb2de488-a876-4181-b5c5-145f965ec349)

> [!NOTE]  
> Se muestra el proceso de inicio de sesión en la aplicación.

![Error de Credencial](https://github.com/AngeloLaMadrid/demo-JWE/assets/101282128/5b642b43-4673-4395-b3d6-fe1083392bb0)

> [!NOTE]  
> Este gif muestra el mensaje de error que se envía cuando el usuario introduce una credencial incorrecta.

![Uso del Chat](https://github.com/AngeloLaMadrid/demo-JWE/assets/101282128/0bb93dcd-de09-4a0e-86de-65eecd88fd24)

> [!NOTE]  
> En este gif se puede ver cómo se utiliza el chat y cómo el sistema retorna el texto encriptado, demostrando la funcionalidad de encriptación.

![Copiado de Texto Encriptado](https://github.com/AngeloLaMadrid/demo-JWE/assets/101282128/c846da16-dffc-404b-afd4-82c4af79cf7c)
> [!NOTE]  
> Se muestra cómo se utiliza la funcion de copiado para copiar el texto encriptado y pegarlo en una página [externa](https://dinochiesa.github.io/jwt/), demostrando que el proyecto funciona y cumple con JWE.


