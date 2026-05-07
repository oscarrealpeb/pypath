// Plantilla base para crear un curso nuevo.
// Copia esta carpeta, cambia el nombre del export
// y luego registra el curso en `src/datos/cursos/index.js`.

export const cursoPlantilla = {
  id: 'curso-demo',
  title: 'Nombre del curso',
  library: 'Biblioteca',
  requiredCourseIds: ['python-fundamentals'],
  summary: 'Resumen corto del curso y del tipo de proyecto que permite crear.',
  difficulty: 'Texto corto para explicar el nivel esperado',
  units: [
    {
      id: 'unidad-demo',
      title: 'Nombre de la unidad',
      summary: 'Qué aprende la persona en esta unidad.',
      lessons: [
        {
          id: 'leccion-demo',
          title: 'Misión 01: Nombre de la lección',
          duration: '10 min',
          xp: 120,
          objective: 'Objetivo concreto de la lección.',
          resources: {
            // Video y enlaces pueden omitirse si esta lección funciona mejor
            // solo con documentación, capturas o texto.
            videoTitle: 'Video corto en español',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
            documentationLinks: [
              {
                label: 'Recurso oficial 1',
                url: 'https://example.com/docs-1',
              },
              {
                label: 'Recurso oficial 2',
                url: 'https://example.com/docs-2',
              },
            ],
            exampleTitle: 'Ejemplo guiado',
            exampleCode: `# Código de ejemplo
print("Hola desde la plantilla")
`,
            supportNote:
              'Nota breve para orientar antes del reto. Aquí puedes resumir qué debe mirar en el video, en la documentación o en las capturas.',
            // Convención recomendada:
            // guarda las capturas en public/capturas/<curso>/...
            // y luego usa rutas como /capturas/curso-demo/pantallazo-01.png
            bloquesApoyo: [
              {
                id: 'captura-principal',
                tipo: 'imagenTexto',
                disposicion: 'arriba',
                titulo: 'Estado esperado de la interfaz',
                contenido:
                  'Usa este bloque cuando quieras poner un pantallazo arriba y debajo una explicación corta de lo que la persona debería observar.',
                imageUrl: '/capturas/curso-demo/pantallazo-01.png',
                imageAlt: 'Ventana de ejemplo del curso demo',
                leyenda: 'Aquí ya debería verse el botón creado y el título correcto.',
              },
              {
                id: 'detalle-lateral',
                tipo: 'imagenTexto',
                disposicion: 'izquierda',
                titulo: 'Detalle importante',
                contenido:
                  'También puedes poner la captura a la izquierda o a la derecha si quieres compararla con texto, pasos o aclaraciones.',
                puntos: [
                  'Verifica el texto exacto del botón.',
                  'Comprueba que la ventana ya se muestra en pantalla.',
                ],
                imageUrl: '/capturas/curso-demo/pantallazo-02.png',
                imageAlt: 'Detalle lateral del curso demo',
              },
              {
                id: 'recordatorio-sin-captura',
                tipo: 'texto',
                disposicion: 'arriba',
                titulo: 'Bloque solo de texto',
                contenido:
                  'Si esta lección no necesita pantallazo, puedes dejar solo un bloque textual con aclaraciones, checklist o advertencias.',
              },
              {
                id: 'comparacion-doble',
                tipo: 'galeria',
                columnas: 2,
                titulo: 'Comparación visual',
                contenido:
                  'Este tipo de bloque sirve cuando quieres poner dos pantallazos uno al lado del otro y explicarlos con un párrafo arriba.',
                imagenes: [
                  {
                    id: 'pantallazo-a',
                    imageUrl: '/capturas/curso-demo/pantallazo-03.png',
                    imageAlt: 'Primer estado de la interfaz del curso demo',
                    leyenda: 'Antes de conectar el evento.',
                  },
                  {
                    id: 'pantallazo-b',
                    imageUrl: '/capturas/curso-demo/pantallazo-04.png',
                    imageAlt: 'Segundo estado de la interfaz del curso demo',
                    leyenda: 'Después de conectar el evento.',
                  },
                ],
                leyenda: 'Debajo de la galería puedes dejar una aclaración corta o continuar con otro bloque de texto.',
              },
            ],
          },
          instructions: {
            overview: 'Explicación corta del contexto de la lección.',
            steps: [
              'Paso 1 de la lección.',
              'Paso 2 de la lección.',
              'Paso 3 de la lección.',
            ],
            hint: 'Pista corta para ayudar sin revelar la respuesta.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar código',
            title: 'Título del reto',
            prompt: 'Describe con claridad lo que debe resolver la persona.',
            starterCode: `# Código inicial del reto
`,
            editorHeight: '310px',
            expectedKeywords: ['print'],
            successCriteria:
              'Explica qué debe incluir la solución para considerarse correcta.',
            expectedResult: 'Salida esperada exacta o descripción visible del resultado.',
            solutionCode: `# Solución completa del ejercicio
print("Hola desde la plantilla")
`,
            solutionNote:
              'Aclara aquí por qué esta solución es válida y qué debería comparar la persona con su intento.',
            salidaGuiada: 'Salida simulada del reto.',
            executionNote:
              'Aclara si se valida con Python real o con guía estructural.',
            successMessage: 'Mensaje de éxito al completar la lección.',
          },
        },
      ],
    },
  ],
}
