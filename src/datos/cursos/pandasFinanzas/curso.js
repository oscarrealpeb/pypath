// Borrador base para que el equipo construya el curso de Pandas.
// Cuando este listo, registralo en `src/datos/cursos/index.js`.

export const cursoPandasFinanzas = {
  id: 'pandas-finanzas',
  title: 'Pandas para datos y finanzas',
  library: 'Pandas',
  requiredCourseIds: ['python-fundamentals'],
  summary:
    'Aprende a leer datos, limpiar tablas y automatizar reportes usando estructuras que luego sirven para analisis y negocio.',
  difficulty: 'Ideal despues de Fundamentos',
  units: [
    {
      id: 'pandas-arranque',
      title: 'Arranque con tablas y Series',
      summary:
        'Primer contacto con Series y DataFrames para entender la estructura base del curso.',
      lessons: [
        {
          id: 'pandas-primer-dataframe',
          title: 'Mision 01: Crear un DataFrame simple',
          duration: '10 min',
          xp: 130,
          objective:
            'Construir un DataFrame pequeno y mostrarlo en consola para entender filas y columnas.',
          resources: {
            videoTitle: 'Primeros pasos con DataFrames',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
            documentationLinks: [
              {
                label: 'DataFrame en la documentacion oficial',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html',
              },
              {
                label: 'Guia de introduccion a Pandas',
                url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html',
              },
            ],
            exampleTitle: 'Ejemplo guiado',
            exampleCode: `import pandas as pd

datos = {
    "producto": ["A", "B"],
    "ventas": [12, 18],
}

df = pd.DataFrame(datos)
print(df)
`,
            supportNote:
              'Aqui conviene que el ejemplo sea corto y muy visual para que la tabla tenga sentido rapido.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Esta primera leccion debe dejar claro que un DataFrame es la estructura central de Pandas.',
            steps: [
              'Importa pandas con el alias pd.',
              'Crea un diccionario simple con columnas y valores.',
              'Convierte ese diccionario en un DataFrame y muestralo.',
            ],
            hint:
              'Si el DataFrame no aparece, revisa que hayas usado pd.DataFrame(datos) y luego print(df).',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Construye tu primera tabla',
            prompt:
              'Completa el starter para crear un DataFrame a partir de un diccionario y mostrarlo en consola.',
            starterCode: `import pandas as pd

datos = {
    "producto": ["A", "B"],
    "ventas": [12, 18],
}

# Crea df = pd.DataFrame(datos)
# Luego muestralo con print(df)
`,
            expectedKeywords: ['import pandas as pd', 'DataFrame', 'print'],
            successCriteria:
              'La solucion debe crear un DataFrame a partir del diccionario y mostrarlo en consola.',
            expectedResult: 'Se imprime una tabla con las columnas producto y ventas.',
            salidaGuiada: '  producto  ventas\\n0        A      12\\n1        B      18',
            executionNote:
              'Puedes mantener la salida esperada en texto si aun no defines la validacion final del curso.',
            successMessage:
              'Buen inicio. Ya tienes la estructura base para seguir con limpieza, filtros y agrupaciones.',
          },
        },
      ],
    },
  ],
}
