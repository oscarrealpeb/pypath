# Firebase Setup y Testing

Esta guía deja el proyecto listo para probar `HU01`, `HU02`, `HU04` y `HU23` con Firebase, sin depender de automatizaciones externas ni de servicios de pago.

## 1. Authentication

En Firebase Console:

1. abre `Build > Authentication`
2. entra a `Sign-in method`
3. habilita `Email/Password`
4. habilita `Google`
5. revisa `Settings > Authorized domains`
6. confirma que `localhost` exista

Para que los correos salgan mejor:

1. entra a `Authentication > Templates`
2. abre `Email address verification`
3. revisa asunto, nombre del remitente y cuerpo
4. deja el copy en español
5. haz lo mismo en `Password reset`

## 2. Admin inicial

La app reserva `admin@pypath.com` como admin fijo.

En `Authentication > Users > Add user` crea:

- correo: `admin@pypath.com`
- contraseña: `admin123`

Notas:

- esa cuenta no se crea desde el registro público
- esa cuenta no exige verificación de correo
- esa cuenta no usa recuperación por correo
- si olvidas esa contraseña, debes cambiarla desde una sesión ya iniciada o con una operación administrativa de Firebase

## 3. Firestore

En Firebase Console:

1. abre `Build > Firestore Database`
2. crea la base
3. para esta fase usa `Start in test mode`
4. cuando termine, abre la pestaña `Rules`
5. reemplaza las reglas por el contenido de `firestore.rules`
6. publica las reglas

Colecciones usadas por PyPath:

- `users`
- `emailIndex`
- `displayNameIndex`
- `nicknameIndex`
- `platform/content-cms`

## 4. Variables de entorno

El proyecto usa `.env.local`.

Variables esperadas:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

La cuenta bootstrap de administración sigue siendo fija:

- `admin@pypath.com`

## 5. Matriz corta de pruebas

### HU01

1. entra a `/register`
2. crea una cuenta normal con correo real
3. confirma que te mande a `/verify-email`
4. abre el enlace de tu correo
5. vuelve y pulsa `Ya confirmé, revisar de nuevo`
6. confirma entrada a `/dashboard`

### HU02

1. inicia sesión con correo y contraseña
2. prueba una contraseña incorrecta
3. prueba `Continuar con Google`
4. prueba `Olvidé mi contraseña`
5. prueba acceso admin desde `/control` con `admin@pypath.com`

### HU04

1. entra a `/profile`
2. cambia nombre
3. cambia nickname
4. cambia rol, experiencia e intereses
5. cambia `Ruta objetivo`
6. recarga la app
7. confirma que Firestore mantuvo el perfil y el progreso

### HU23

1. entra a `/admin/contenido`
2. crea un curso
3. crea una unidad
4. crea una lección
5. edita curso, unidad y lección
6. publica y devuelve a borrador
7. elimina lección, unidad y curso
8. cierra sesión y vuelve a entrar
9. confirma que los cambios sigan en Firestore

## 6. Limitación actual

El CMS ya persiste a Firestore, pero sigue guardando un snapshot completo del contenido en un solo documento. Para pruebas funciona bien. El siguiente salto natural será:

- mover imágenes a Firebase Storage
- dividir el CMS por curso o por secciones
- separar mejor contenido público y contenido en borrador

## 7. Política actual de verificación

En esta fase:

- si el usuario no verifica el correo, no entra
- puede reenviar el correo de verificación
- la cuenta no se borra automáticamente

No estamos usando limpieza automática de cuentas no verificadas porque eso nos llevaría a servicios adicionales que por ahora no hacen falta para pruebas.
