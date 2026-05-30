// Borrador base para las evaluaciones del curso de Pandas.
// Cuando el curso este listo, registralas en `src/datos/cursos/index.js`.

export const evaluacionesPandasFinanzas = {
  unitAssessments: {
    'pandas-introduccion': {
      id: 'pandas-introduccion-checkpoint',
      title: 'Evaluación de unidad: Introducción a Pandas',
      summary:
        'Verifica que comprendes las estructuras básicas (Series y DataFrames) y la carga de datos.',
      passingScore: 3,
      successMessage:
        'Unidad aprobada. Tienes los fundamentos para empezar a manipular datos.',
      questions: [
        {
          id: 'pandas-arranque-q1',
          prompt: '¿Que estructura de Pandas representa una tabla con filas y columnas?',
          options: [
            { id: 'a', label: 'DataFrame' },
            { id: 'b', label: 'Widget' },
            { id: 'c', label: 'Signal' },
          ],
          correctOptionId: 'a',
          explanation:
            'DataFrame es la estructura tabular principal de Pandas.',
        },
        {
          id: 'pandas-arranque-q2',
          prompt: '¿Cómo se suele importar Pandas por convención?',
          options: [
            { id: 'a', label: 'import pandas as pan' },
            { id: 'b', label: 'import pandas as pd' },
            { id: 'c', label: 'import pd from pandas' },
          ],
          correctOptionId: 'b',
          explanation: 'pd es el alias estándar utilizado por la comunidad.',
        },
        {
          id: 'pandas-arranque-q3',
          prompt: '¿Qué método permite ver las primeras filas de un DataFrame?',
          options: [
            { id: 'a', label: 'df.first()' },
            { id: 'b', label: 'df.head()' },
            { id: 'c', label: 'df.show()' },
          ],
          correctOptionId: 'b',
          explanation: 'head() muestra las primeras 5 filas por defecto.',
        },
        {
          id: 'pandas-arranque-q4',
          prompt: '¿Qué función usarías para leer un archivo separado por comas?',
          options: [
            { id: 'a', label: 'pd.read_csv()' },
            { id: 'b', label: 'pd.open_csv()' },
            { id: 'c', label: 'pd.read_table()' },
          ],
          correctOptionId: 'a',
          explanation: 'read_csv es la función específica para archivos CSV.',
        },
      ],
    },
    'pandas-seleccion-limpieza': {
      id: 'pandas-limpieza-checkpoint',
      title: 'Evaluación de unidad: Selección y Limpieza',
      summary: 'Confirma que sabes filtrar datos y tratar valores nulos o duplicados.',
      passingScore: 2,
      successMessage: 'Unidad aprobada. Estás listo para realizar análisis estadísticos.',
      questions: [
        {
          id: 'pandas-limpieza-q1',
          prompt: '¿Cómo seleccionas las columnas "Nombre" y "Precio" de un DataFrame?',
          options: [
            { id: 'a', label: 'df["Nombre", "Precio"]' },
            { id: 'b', label: 'df[["Nombre", "Precio"]]' },
            { id: 'c', label: 'df.select("Nombre", "Precio")' },
          ],
          correctOptionId: 'b',
          explanation: 'Se debe pasar una lista de nombres de columnas dentro de los corchetes.',
        },
        {
          id: 'pandas-limpieza-q2',
          prompt: '¿Qué método elimina las filas que contienen valores nulos (NaN)?',
          options: [
            { id: 'a', label: 'df.dropna()' },
            { id: 'b', label: 'df.fillna(0)' },
            { id: 'c', label: 'df.remove_nulls()' },
          ],
          correctOptionId: 'a',
          explanation: 'dropna() elimina cualquier fila con al menos un valor faltante.',
        },
        {
          id: 'pandas-limpieza-q3',
          prompt: '¿Para qué sirve el método apply()?',
          options: [
            { id: 'a', label: 'Para guardar el archivo en el disco' },
            { id: 'b', label: 'Para aplicar una función a cada elemento de una columna' },
            { id: 'c', label: 'Para unir dos tablas distintas' },
          ],
          correctOptionId: 'b',
          explanation: 'apply() permite transformar datos usando funciones personalizadas o lambdas.',
        },
      ],
    },
    'pandas-analisis-datos': {
      id: 'pandas-analisis-checkpoint',
      title: 'Evaluación de unidad: Análisis de datos',
      summary:
        'Verifica que ya puedes describir, agrupar y trabajar con columnas de fechas en Pandas.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya puedes pasar a la parte financiera con una base sólida de análisis.',
      questions: [
        {
          id: 'pandas-analisis-q1',
          prompt: '¿Qué método te da estadísticas resumidas como media, mínimo y máximo de un DataFrame?',
          options: [
            { id: 'a', label: 'df.describe()' },
            { id: 'b', label: 'df.summary()' },
            { id: 'c', label: 'df.metrics()' },
          ],
          correctOptionId: 'a',
          explanation: 'describe() resume datos numéricos y otras columnas según el tipo de información.',
        },
        {
          id: 'pandas-analisis-q2',
          prompt: '¿Qué método usas para agrupar registros por una categoría antes de agregarlos?',
          options: [
            { id: 'a', label: 'df.groupby()' },
            { id: 'b', label: 'df.sort_values()' },
            { id: 'c', label: 'df.join()' },
          ],
          correctOptionId: 'a',
          explanation: 'groupby() permite separar los datos en grupos y luego aplicar sumas, medias u otros cálculos.',
        },
        {
          id: 'pandas-analisis-q3',
          prompt: '¿Qué función de Pandas ayuda a convertir una columna de texto en fechas reales?',
          options: [
            { id: 'a', label: 'pd.to_datetime()' },
            { id: 'b', label: 'pd.date_parse()' },
            { id: 'c', label: 'pd.make_date()' },
          ],
          correctOptionId: 'a',
          explanation: 'to_datetime() transforma strings con fechas en objetos de fecha interpretables por Pandas.',
        },
      ],
    },
    'pandas-finanzas-aplicado': {
      id: 'pandas-finanzas-aplicado-checkpoint',
      title: 'Evaluación de unidad: Pandas aplicado a Finanzas',
      summary:
        'Confirma que ya puedes manipular datos financieros, calcular variaciones y preparar reportes.',
      passingScore: 2,
      successMessage:
        'Unidad aprobada. Ya cierras el recorrido práctico de Pandas con foco en análisis financiero.',
      questions: [
        {
          id: 'pandas-finanzas-q1',
          prompt: 'En análisis financiero, ¿qué permite calcular pct_change() sobre una serie de precios?',
          options: [
            { id: 'a', label: 'La variación porcentual entre periodos consecutivos' },
            { id: 'b', label: 'La fecha más antigua de la tabla' },
            { id: 'c', label: 'La moneda de cada activo' },
          ],
          correctOptionId: 'a',
          explanation: 'pct_change() se usa mucho para obtener rendimientos o cambios relativos entre filas consecutivas.',
        },
        {
          id: 'pandas-finanzas-q2',
          prompt: '¿Qué herramienta de Pandas es especialmente útil para resumir ingresos y gastos por categoría o mes?',
          options: [
            { id: 'a', label: 'pivot_table()' },
            { id: 'b', label: 'dropna()' },
            { id: 'c', label: 'head()' },
          ],
          correctOptionId: 'a',
          explanation: 'pivot_table() ayuda a reorganizar y resumir datos para reportes ejecutivos y comparativos.',
        },
        {
          id: 'pandas-finanzas-q3',
          prompt: 'Si quieres entregar un reporte final generado con Pandas, ¿qué acción suele venir al final del flujo?',
          options: [
            { id: 'a', label: 'Exportar el resultado a un archivo como CSV o Excel' },
            { id: 'b', label: 'Eliminar la tabla original del DataFrame' },
            { id: 'c', label: 'Cerrar el intérprete de Python sin guardar' },
          ],
          correctOptionId: 'a',
          explanation: 'Exportar el resultado es un cierre natural cuando preparas reportes reutilizables o compartibles.',
        },
      ],
    },
  },
  finalAssessment: {
    id: 'pandas-finanzas-final',
    title: 'Evaluación final del curso: Pandas para datos y finanzas',
    summary:
      'Confirma que puedes crear, leer y transformar tablas básicas con Pandas.',
    passingScore: 4,
    successMessage:
      'Curso finalizado. Ya tienes una base funcional para trabajar con datos y reportes.',
    questions: [
      {
        id: 'pandas-final-q1',
        prompt: '¿Qué método permite realizar una agrupación de datos por una categoría?',
        options: [
          { id: 'a', label: 'df.aggregate()' },
          { id: 'b', label: 'df.groupby()' },
          { id: 'c', label: 'df.split()' },
        ],
        correctOptionId: 'b',
        explanation:
          'groupby() es el motor para realizar análisis segmentado en Pandas.',
      },
      {
        id: 'pandas-final-q2',
        prompt: 'En finanzas, ¿qué hace el método pct_change()?',
        options: [
          { id: 'a', label: 'Calcula el logaritmo de los precios' },
          { id: 'b', label: 'Calcula la variación porcentual entre elementos consecutivos' },
          { id: 'c', label: 'Cambia el formato de la moneda' },
        ],
        correctOptionId: 'b',
        explanation: 'Es ideal para calcular rendimientos diarios de acciones.',
      },
      {
        id: 'pandas-final-q3',
        prompt: '¿Cómo conviertes una columna de texto a formato de fecha?',
        options: [
          { id: 'a', label: 'pd.to_datetime()' },
          { id: 'b', label: 'df.as_date()' },
          { id: 'c', label: 'pd.parse_time()' },
        ],
        correctOptionId: 'a',
        explanation: 'to_datetime() analiza strings y los convierte en objetos Timestamp.',
      },
      {
        id: 'pandas-final-q4',
        prompt: '¿Qué estructura permite rotar datos para verlos como una matriz de ingresos vs gastos?',
        options: [
          { id: 'a', label: 'df.transpose()' },
          { id: 'b', label: 'df.pivot_table()' },
          { id: 'c', label: 'df.stack()' },
        ],
        correctOptionId: 'b',
        explanation: 'Las tablas dinámicas (pivot) son fundamentales para reportes ejecutivos.',
      },
    ],
  },
}
