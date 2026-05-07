Guarda aquí los pantallazos que acompañen las lecciones.

Estructura recomendada:

```txt
public/capturas/pyside6/
  ventana-01.png
  boton-02.png

public/capturas/pygame/
  loop-01.png
  colision-02.png
```

Luego, desde `curso.js`, usa rutas como:

```js
imageUrl: '/capturas/pyside6/ventana-01.png'
```

o dentro de `bloquesApoyo`:

```js
{
  id: 'ventana-esperada',
  tipo: 'imagenTexto',
  disposicion: 'arriba',
  imageUrl: '/capturas/pyside6/ventana-01.png',
}
```

Si necesitas dos o más pantallazos en fila:

```js
{
  id: 'comparacion',
  tipo: 'galeria',
  columnas: 2,
  imagenes: [
    { imageUrl: '/capturas/pyside6/ventana-01.png', imageAlt: 'Primer estado' },
    { imageUrl: '/capturas/pyside6/ventana-02.png', imageAlt: 'Segundo estado' },
  ],
}
```
