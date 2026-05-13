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
      id: 'pandas-introduccion',
      title: 'Introducción a Pandas y estructuras de datos',
      summary:
        'Primer contacto con Pandas, instalación, importación y estructuras básicas de datos.',
      lessons: [
        {
          id: 'pandas-introduccion-basica',
          title: 'Misión 01: ¿Qué es Pandas?',
          duration: '12 min',
          xp: 150,
          objective:
            'Entender qué es Pandas, su instalación y cómo importarlo correctamente.',
          resources: {
            videoTitle: 'Introducción a Pandas - ¿Qué es y por qué usarlo?',
            videoUrl: 'https://www.youtube.com/embed/ZUliS6Y8oeM?end=225',
            documentationLinks: [
              {
                label: 'Documentación oficial de Pandas',
                url: 'https://pandas.pydata.org/docs/getting_started/index.html',
              },
              {
                label: 'Instalación de Pandas',
                url: 'https://pandas.pydata.org/docs/getting_started/install.html',
              },
            ],
            exampleTitle: 'Instalación y primera importación',
            exampleCode: `# Instalar pandas (en terminal)
# pip install pandas

# Importar pandas
import pandas as pd

print("Pandas importado correctamente")
print(f"Versión de Pandas: {pd.__version__}")
`,
            supportNote:
              'Pandas es la librería más popular de Python para análisis de datos. Se instala con pip y se importa como pd.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Pandas es la herramienta fundamental para trabajar con datos tabulares en Python. Antes de usar cualquier función, necesitas saber instalarlo e importarlo.',
            steps: [
              'Instala pandas usando pip install pandas',
              'Importa pandas con el alias pd',
              'Verifica que se importó correctamente imprimiendo la versión',
            ],
            hint:
              'Si obtienes un error de importación, asegúrate de que pandas esté instalado en tu entorno.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Instala e importa Pandas',
            prompt:
              'Completa el código para importar pandas y mostrar su versión.',
            starterCode: `# 1. Importa la librería pandas con el alias pd

# 2. Muestra en pantalla la versión de la librería usando la propiedad __version__
`,
            expectedKeywords: ['import pandas as pd', 'pd.__version__', 'print'],
            successCriteria:
              'El código debe importar pandas correctamente y mostrar su versión.',
            expectedResult: 'Versión de Pandas: x.x.x',
            salidaGuiada: 'Versión de Pandas: 2.2.1',
            executionNote:
              'La versión puede variar, pero debe mostrarse sin errores.',
            successMessage:
              '¡Excelente! Pandas está listo para trabajar con datos.',
          },
        },
        {
          id: 'pandas-series-dataframes',
          title: 'Misión 02: Series y DataFrames',
          duration: '15 min',
          xp: 180,
          objective:
            'Crear y entender las estructuras básicas de Pandas: Series y DataFrames.',
          resources: {
            videoTitle: 'Series y DataFrames - Las estructuras básicas de Pandas',
            videoUrl: 'https://www.youtube.com/embed/ZUliS6Y8oeM?start=225',
            documentationLinks: [
              {
                label: 'Intro to data structures',
                url: 'https://pandas.pydata.org/docs/user_guide/dsintro.html',
              },
              {
                label: 'Series documentation',
                url: 'https://pandas.pydata.org/docs/reference/series.html',
              },
              {
                label: 'DataFrame documentation',
                url: 'https://pandas.pydata.org/docs/reference/frame.html',
              },
            ],
            exampleTitle: 'Creando Series y DataFrames',
            exampleCode: `import pandas as pd

# Crear una Serie
ventas = pd.Series([100, 150, 200, 250])
print("Serie de ventas:")
print(ventas)
print()

# Crear un DataFrame
datos = {
    'Producto': ['A', 'B', 'C', 'D'],
    'Precio': [10.5, 15.2, 8.9, 22.0],
    'Stock': [50, 30, 75, 20]
}

df = pd.DataFrame(datos)
print("DataFrame de productos:")
print(df)
`,
            supportNote:
              'Una Serie es como una columna de datos, mientras que un DataFrame es como una tabla completa con filas y columnas.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Las Series y DataFrames son las estructuras de datos fundamentales de Pandas. Una Serie es unidimensional, mientras que un DataFrame es bidimensional.',
            steps: [
              'Crea una Serie con datos numéricos',
              'Crea un DataFrame a partir de un diccionario',
              'Muestra ambos en consola para ver su estructura',
            ],
            hint:
              'Usa pd.Series() para crear series y pd.DataFrame() para dataframes.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Crea tus primeras estructuras de datos',
            prompt:
              'Completa el código para crear una Serie de precios y un DataFrame de productos.',
            starterCode: `import pandas as pd

# 1. Crea una Serie llamada 'precios' con los valores: 25.50, 15.99, 8.75

# 2. Crea un diccionario 'productos_data' con las claves: 'nombre', 'precio' (usa la serie) y 'categoria'

# 3. Convierte el diccionario en un DataFrame llamado 'df_productos'

# 4. Muestra en pantalla la Serie y el DataFrame
`,
            expectedKeywords: ['pd.Series', 'pd.DataFrame', 'print'],
            successCriteria:
              'Debe crear una Serie y un DataFrame correctamente y mostrarlos.',
            expectedResult: 'Precios:\n0    25.50\n1    15.99\n2     8.75\ndtype: float64\n\nProductos:\n   nombre  precio   categoria\n0  Laptop   25.50  Electrónica\n1   Mouse   15.99   Accesorio\n2 Teclado    8.75   Accesorio',
            salidaGuiada: 'Precios:\n0    25.50\n1    15.99\n2     8.75\ndtype: float64\n\nProductos:\n   nombre  precio   categoria\n0  Laptop   25.50  Electrónica\n1   Mouse   15.99   Accesorio\n2 Teclado    8.75   Accesorio',
            executionNote:
              'La salida debe mostrar tanto la Serie como el DataFrame con la estructura correcta.',
            successMessage:
              '¡Perfecto! Ya sabes crear las estructuras básicas de Pandas.',
          },
        },
        {
          id: 'pandas-lectura-archivos',
          title: 'Misión 03: Lectura de archivos',
          duration: '18 min',
          xp: 200,
          objective:
            'Aprender a leer archivos CSV y Excel, y usar funciones básicas de exploración.',
          resources: {
            videoTitle: 'Leyendo datos desde archivos con Pandas',
            videoUrl: 'https://www.youtube.com/embed/2OETEkJVV0E',
            documentationLinks: [
              {
                label: 'IO tools documentation',
                url: 'https://pandas.pydata.org/docs/user_guide/io.html',
              },
              {
                label: 'CSV reading',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html',
              },
              {
                label: 'Excel reading',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html',
              },
            ],
            exampleTitle: 'Leyendo archivos y explorando datos',
            exampleCode: `import pandas as pd

# Leer archivo CSV
# df = pd.read_csv('datos.csv')

# Leer archivo Excel
# df = pd.read_excel('datos.xlsx')

# Para este ejemplo, creamos datos de ejemplo
datos = {
    'Producto': ['A', 'B', 'C', 'D', 'E'],
    'Ventas': [100, 150, 200, 250, 300],
    'Precio': [10.5, 15.2, 8.9, 22.0, 12.5]
}

df = pd.DataFrame(datos)

print("Primeras 3 filas:")
print(df.head(3))
print()

print("Últimas 2 filas:")
print(df.tail(2))
print()

print("Información del DataFrame:")
print(df.info())
print()

print("Estadísticas descriptivas:")
print(df.describe())
`,
            supportNote:
              'Para esta misión utilizaremos el archivo "ventas_mensuales.csv". Puedes ver su contenido exacto en el bloque de apoyo "Archivo CSV" aquí abajo. Este es el archivo que cargarás en tu código.',
            bloquesApoyo: [
              {
                id: 'csv-preview',
                tipo: 'texto',
                titulo: 'Archivo CSV: ventas_mensuales.csv',
                contenido: 'Este es el archivo que usaremos para el ejemplo y el reto. Contiene el registro de ventas y clientes del primer semestre.',
                puntos: [
                  'Mes,Ventas,Clientes',
                  'Enero,12000,120',
                  'Febrero,15000,135',
                  'Marzo,18000,150',
                  'Abril,22000,180',
                  'Mayo,20000,160',
                  'Junio,24000,220'
                ]
              }
            ]
          },
          instructions: {
            overview:
              'El primer paso de cualquier análisis es cargar los datos. Usaremos el archivo "ventas_mensuales.csv" que ves en la pantalla para aprender a importar información y explorar su estructura técnica y estadística.',
            steps: [
              'Importa pandas con el alias pd.',
              'Carga el archivo "ventas_mensuales.csv" (el que se muestra en los recursos) usando pd.read_csv().',
              'Muestra las primeras 3 filas con head(3).',
              'Imprime la información técnica con info().',
              'Muestra el resumen estadístico con describe().'
            ],
            hint:
              'Usa df = pd.read_csv("ventas_mensuales.csv") para importar los datos.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Explora un conjunto de datos',
            prompt:
              'Utiliza el archivo "ventas_mensuales.csv" mostrado en la sección de recursos para realizar una exploración completa: carga los datos, muestra el inicio, la info técnica y las estadísticas.',
            starterCode: `import pandas as pd

# --- Configuración del Entorno (No modificar) ---
csv_data = "Mes,Ventas,Clientes\nEnero,12000,120\nFebrero,15000,135\nMarzo,18000,150\nAbril,22000,180\nMayo,20000,160\nJunio,24000,220"
with open('ventas_mensuales.csv', 'w') as f: f.write(csv_data)

# 1. Lee el archivo "ventas_mensuales.csv" y guárdalo en la variable 'df'

# 2. Imprime "Primer trimestre:" y muestra las primeras 3 filas usando head()

# 3. Imprime "\nInformación del DataFrame:" e invoca el método info() sobre 'df'

# 4. Imprime "\nEstadísticas:" e invoca el método describe() sobre 'df'
`,
            expectedKeywords: ['read_csv', 'head', 'info', 'describe'],
            successCriteria:
              'Debe cargar ventas_mensuales.csv, mostrar las primeras 3 filas, la info del DF y las estadísticas descriptivas.',
            expectedResult: 'Primer trimestre:\nMes  Ventas  Clientes\n0    Enero   12000       120\n1  Febrero   15000       135\n2    Marzo   18000       150\n\nInformación del DataFrame:\n<class \'pandas.core.frame.DataFrame\'>\nRangeIndex: 6 entries, 0 to 5\nData columns (total 3 columns):\n#   Column    Non-Null Count  Dtype\n---  ------    --------------  -----\n0   Mes       6 non-null      object\n1   Ventas    6 non-null      int64\n2   Clientes  6 non-null      int64\ndtypes: int64(2), object(1)\nmemory usage: 192.0+ bytes\nNone\n\nEstadísticas:\n             Ventas    Clientes\ncount      6.000000    6.000000\nmean   18500.000000  160.833333\nstd     4460.941605   35.555122\nmin    12000.000000  120.000000\n25%    15750.000000  138.750000\n50%    19000.000000  155.000000\n75%    21500.000000  175.000000\nmax    24000.000000  220.000000',
            solutionCode: `import pandas as pd

# Creamos el archivo para que el simulador lo encuentre
data = "Mes,Ventas,Clientes\nEnero,12000,120\nFebrero,15000,135\nMarzo,18000,150\nAbril,22000,180\nMayo,20000,160\nJunio,24000,220"
with open('ventas_mensuales.csv', 'w') as f:
    f.write(data)

df = pd.read_csv('ventas_mensuales.csv')

print("Primer trimestre:")
print(df.head(3))

print("\nInformación del DataFrame:")
print(df.info())

print("\nEstadísticas:")
print(df.describe())`,
            solutionNote: 'Cargamos el archivo específico "ventas_mensuales.csv" y aplicamos los métodos de exploración para obtener la salida exacta esperada.',
            salidaGuiada: 'Primer trimestre:\nMes  Ventas  Clientes\n0    Enero   12000       120\n1  Febrero   15000       135\n2    Marzo   18000       150\n\nInformación del DataFrame:\n<class \'pandas.core.frame.DataFrame\'>\n...\nNone\n\nEstadísticas:\n             Ventas    Clientes\ncount      6.000000    6.000000\nmean   18500.000000  160.833333\n...',
            executionNote:
              'La salida debe incluir head(), info() y describe() del DataFrame.',
            successMessage:
              '¡Excelente! Ya sabes explorar datos con Pandas.',
          },
        },
      ],
    },
    {
      id: 'pandas-seleccion-limpieza',
      title: 'Selección y limpieza de datos',
      summary:
        'Aprender a seleccionar datos específicos, filtrar y limpiar datasets.',
      lessons: [
        {
          id: 'pandas-seleccion-filtrado',
          title: 'Misión 04: Selección y filtrado',
          duration: '20 min',
          xp: 220,
          objective:
            'Dominar la selección de columnas y filas, y el uso de filtros condicionales.',
          resources: {
            videoTitle: 'Seleccionando y filtrando datos en Pandas',
            videoUrl: 'https://www.youtube.com/embed/0MEoGE1Cd04?start=210',
            documentationLinks: [
              {
                label: 'Indexing and selecting data',
                url: 'https://pandas.pydata.org/docs/user_guide/indexing.html',
              },
              {
                label: 'Boolean indexing',
                url: 'https://pandas.pydata.org/docs/user_guide/indexing.html#boolean-indexing',
              },
            ],
            exampleTitle: 'Selección y filtrado de datos',
            exampleCode: `import pandas as pd

datos = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio': [1200, 25, 75, 300, 150],
    'Stock': [10, 50, 30, 15, 8],
    'Categoria': ['Electrónica', 'Accesorio', 'Accesorio', 'Electrónica', 'Oficina']
}

df = pd.DataFrame(datos)

# Seleccionar una columna
print("Columna Precio:")
print(df['Precio'])
print()

# Seleccionar múltiples columnas
print("Producto y Precio:")
print(df[['Producto', 'Precio']])
print()

# Filtrar productos caros (> 100)
productos_caros = df[df['Precio'] > 100]
print("Productos caros:")
print(productos_caros)
print()

# Filtrar por categoría
electronica = df[df['Categoria'] == 'Electrónica']
print("Productos de electrónica:")
print(electronica)
`,
            supportNote:
              'Usa corchetes [] para seleccionar columnas. Para filtros condicionales, pon la condición dentro de los corchetes.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'La selección y filtrado son operaciones fundamentales. Puedes seleccionar columnas específicas o filtrar filas basadas en condiciones.',
            steps: [
              'Selecciona una columna específica usando df["columna"]',
              'Selecciona múltiples columnas usando df[["col1", "col2"]]',
              'Filtra filas con condiciones como df[df["columna"] > valor]',
              'Combina múltiples condiciones con & (and) o | (or)',
            ],
            hint:
              'Para condiciones múltiples, usa paréntesis: (cond1) & (cond2)',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Selecciona y filtra productos',
            prompt:
              'Completa el código para seleccionar productos electrónicos con precio menor a 500.',
            starterCode: `import pandas as pd

productos = {
    'Nombre': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora', 'Tablet'],
    'Precio': [1200, 25, 75, 400, 200, 350],
    'Categoria': ['Electrónica', 'Accesorio', 'Accesorio', 'Electrónica', 'Oficina', 'Electrónica']
}

# 1. Crea el DataFrame 'df' a partir del diccionario 'productos'

# 2. Filtra los productos de la categoría 'Electrónica' e imprime el resultado

# 3. Filtra productos electrónicos cuyo precio sea menor a 500 e imprime el resultado

# 4. Selecciona solo las columnas 'Nombre' y 'Precio' de productos con precio mayor a 100 e imprime
`,
            expectedKeywords: ['df[', 'Categoria', 'Precio', 'Nombre'],
            successCriteria:
              'Debe filtrar productos electrónicos económicos y mostrar información específica.',
            expectedResult: 'Productos electrónicos:\n     Nombre   Precio       Categoria\n0   Laptop      1200  Electrónica\n3  Monitor       400  Electrónica\n5   Tablet       350  Electrónica\n\nElectrónicos económicos:\n     Nombre   Precio       Categoria\n3  Monitor       400  Electrónica\n5   Tablet       350  Electrónica\n\nNombre y precio de productos caros:\n     Nombre  Precio\n0   Laptop    1200\n3  Monitor     400\n4 Impresora    200\n5   Tablet     350',
            solutionCode: `import pandas as pd

productos = {
    'Nombre': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora', 'Tablet'],
    'Precio': [1200, 25, 75, 400, 200, 350],
    'Categoria': ['Electrónica', 'Accesorio', 'Accesorio', 'Electrónica', 'Oficina', 'Electrónica']
}

df = pd.DataFrame(productos)

print("Productos electrónicos:")
print(df[df['Categoria'] == 'Electrónica'])

print("\nElectrónicos económicos:")
print(df[(df['Categoria'] == 'Electrónica') & (df['Precio'] < 500)])

print("\nNombre y precio de productos caros:")
print(df[df['Precio'] > 100][['Nombre', 'Precio']])`,
            solutionNote: 'Usamos filtros booleanos para la categoría y combinamos condiciones con el operador &.',
            salidaGuiada: 'Productos electrónicos:\n     Nombre   Precio       Categoria\n0   Laptop      1200  Electrónica\n3  Monitor       400  Electrónica\n5   Tablet       350  Electrónica\n\nElectrónicos económicos:\n     Nombre   Precio       Categoria\n3  Monitor       400  Electrónica\n5   Tablet       350  Electrónica\n\nNombre y precio de productos caros:\n     Nombre  Precio\n0   Laptop    1200\n3  Monitor     400\n4 Impresora    200\n5   Tablet     350',
            executionNote:
              'Debe mostrar los productos electrónicos con precio menor a 500.',
            successMessage:
              '¡Muy bien! Ya sabes seleccionar y filtrar datos efectivamente.',
          },
        },
        {
          id: 'pandas-limpieza-datos',
          title: 'Misión 05: Limpieza de datos',
          duration: '22 min',
          xp: 240,
          objective:
            'Aprender a manejar valores nulos, eliminar duplicados y convertir tipos de datos.',
          resources: {
            videoTitle: 'Limpiando datos con Pandas',
            videoUrl: 'https://www.youtube.com/embed/s7InlH4HLYw',
            documentationLinks: [
              {
                label: 'Working with missing data',
                url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
              },
              {
                label: 'Duplicate data',
                url: 'https://pandas.pydata.org/docs/user_guide/duplicates.html',
              },
            ],
            exampleTitle: 'Manejando datos faltantes y duplicados',
            exampleCode: `import pandas as pd
import numpy as np

# Crear DataFrame con datos faltantes
datos = {
    'Producto': ['A', 'B', 'C', 'D', 'A'],
    'Precio': [100, np.nan, 150, 200, 100],  # np.nan representa valores faltantes
    'Stock': [10, 20, np.nan, 40, 10]
}

df = pd.DataFrame(datos)
print("DataFrame original:")
print(df)
print()

# Verificar valores nulos
print("Valores nulos por columna:")
print(df.isnull().sum())
print()

# Eliminar filas con valores nulos
df_sin_nulos = df.dropna()
print("Después de eliminar nulos:")
print(df_sin_nulos)
print()

# Rellenar valores nulos
df_rellenado = df.fillna({'Precio': df['Precio'].mean(), 'Stock': 0})
print("Después de rellenar nulos:")
print(df_rellenado)
print()

# Eliminar duplicados
df_sin_duplicados = df.drop_duplicates()
print("Después de eliminar duplicados:")
print(df_sin_duplicados)
`,
            supportNote:
              'isnull() identifica valores nulos, dropna() los elimina, fillna() los rellena, y drop_duplicates() elimina filas duplicadas.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Los datos reales suelen tener valores faltantes o duplicados. Pandas ofrece herramientas poderosas para limpiarlos.',
            steps: [
              'Usa isnull() para identificar valores faltantes',
              'Usa dropna() para eliminar filas con valores nulos',
              'Usa fillna() para rellenar valores nulos con un valor específico',
              'Usa drop_duplicates() para eliminar filas duplicadas',
            ],
            hint:
              'Para rellenar con la media, usa fillna(df["columna"].mean()).',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Limpia un dataset de ventas',
            prompt:
              'Completa el código para limpiar un dataset con valores nulos y duplicados.',
            starterCode: `import pandas as pd
import numpy as np

datos = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Laptop', 'Monitor'],
    'Precio': [1200.0, np.nan, 75.0, 1200.0, 300.0],
    'Cantidad': [1.0, 2.0, 1.0, 1.0, np.nan],
    'Cliente': ['Ana', 'Juan', 'Ana', 'Ana', 'Pedro']
}

# 1. Crea el DataFrame 'df', imprime "Valores nulos:" y muestra el conteo de nulos por columna usando isnull().sum()

# 2. Rellena los valores nulos: Precio con la mediana y Cantidad con el valor 1

# 3. Elimina las filas duplicadas del DataFrame usando drop_duplicates()

# 4. Imprime "\nDataset limpio:" y el DataFrame resultante
`,
            expectedKeywords: ['fillna', 'drop_duplicates', 'isnull'],
            successCriteria:
              'Debe rellenar valores nulos y eliminar duplicados correctamente.',
            expectedResult: 'Valores nulos:\nProducto    0\nPrecio      1\nCantidad    1\nCliente     0\ndtype: int64\n\nDataset limpio:\n   Producto  Precio  Cantidad Cliente\n0   Laptop    1200.0      1.0     Ana\n1    Mouse     750.0      2.0    Juan\n2  Teclado     75.0      1.0     Ana\n4  Monitor    300.0      1.0   Pedro\n\nTotal productos únicos: 4\nTotal ventas: 5',
            solutionCode: `import pandas as pd
import numpy as np

datos = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Laptop', 'Monitor'],
    'Precio': [1200.0, np.nan, 75.0, 1200.0, 300.0],
    'Cantidad': [1.0, 2.0, 1.0, 1.0, np.nan],
    'Cliente': ['Ana', 'Juan', 'Ana', 'Ana', 'Pedro']
}
df = pd.DataFrame(datos)

print("Valores nulos:")
print(df.isnull().sum())

df['Precio'] = df['Precio'].fillna(df['Precio'].median())
df['Cantidad'] = df['Cantidad'].fillna(1)
df = df.drop_duplicates()

print("\nDataset limpio:")
print(df)

print(f"\nTotal productos únicos: {df['Producto'].nunique()}")
print(f"Total ventas: {int(df['Cantidad'].sum())}")`,
            solutionNote: 'Calculamos la mediana para el precio y un valor fijo para cantidad antes de limpiar duplicados.',
            salidaGuiada: 'Valores nulos:\nProducto    0\nPrecio      1\n...\nDataset limpio:\n   Producto  Precio  Cantidad Cliente\n0   Laptop    1200.0      1.0     Ana\n...',
            executionNote:
              'Debe mostrar el proceso de limpieza y el resultado final.',
            successMessage:
              '¡Excelente trabajo! Los datos están limpios y listos para análisis.',
          },
        },
        {
          id: 'pandas-manipulacion-columnas',
          title: 'Misión 06: Manipulación de columnas',
          duration: '18 min',
          xp: 200,
          objective:
            'Aprender a crear nuevas columnas, aplicar funciones y ordenar datos.',
          resources: {
            videoTitle: 'Manipulando columnas y aplicando funciones en Pandas',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
            documentationLinks: [
              {
                label: 'Function application',
                url: 'https://pandas.pydata.org/docs/user_guide/basics.html#function-application',
              },
              {
                label: 'Sorting',
                url: 'https://pandas.pydata.org/docs/user_guide/basics.html#sorting',
              },
            ],
            exampleTitle: 'Creando columnas y aplicando funciones',
            exampleCode: `import pandas as pd

ventas = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor'],
    'Precio': [1200, 25, 75, 300],
    'Cantidad': [2, 5, 3, 1]
}

df = pd.DataFrame(ventas)

# Crear columna calculada
df['Total'] = df['Precio'] * df['Cantidad']
print("Con columna Total:")
print(df)
print()

# Aplicar función a una columna
def categorizar_precio(precio):
    if precio > 500:
        return 'Caro'
    elif precio > 100:
        return 'Medio'
    else:
        return 'Barato'

df['Categoria_Precio'] = df['Precio'].apply(categorizar_precio)
print("Con categoría de precio:")
print(df)
print()

# Usar lambda para columna de descuento
df['Precio_Con_Descuento'] = df['Precio'].apply(lambda x: x * 0.9)
print("Con descuento aplicado:")
print(df)
print()

# Ordenar por precio descendente
df_ordenado = df.sort_values('Precio', ascending=False)
print("Ordenado por precio (descendente):")
print(df_ordenado)
`,
            supportNote:
              'Puedes crear nuevas columnas asignando operaciones. apply() permite aplicar funciones a columnas, y sort_values() ordena el DataFrame.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Crear columnas calculadas y aplicar funciones transforma los datos para análisis más profundos.',
            steps: [
              'Crea columnas calculadas multiplicando o sumando columnas existentes',
              'Usa apply() con funciones definidas para transformar datos',
              'Usa apply() con lambda para operaciones simples',
              'Ordena el DataFrame con sort_values()',
            ],
            hint:
              'Para funciones simples, lambda es más conciso: df["nueva_col"] = df["col"].apply(lambda x: x * 2)',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza ventas y crea métricas',
            prompt:
              'Completa el código para calcular totales de venta, márgenes y categorizar productos.',
            starterCode: `import pandas as pd

datos = {
    'Nombre': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio_Venta': [1200, 25, 75, 400, 200],
    'Costo': [1000, 15, 45, 300, 120],
    'Ventas_Mes': [5, 20, 15, 8, 3]
}

# 1. Crea el DataFrame 'df' y calcula Ganancia_Unitaria, Ganancia_Mensual y Margen_Porcentual (redondeado a 1 decimal)

# 2. Crea una función 'categorizar' por unidades (>= 15: 'Alto', >= 5: 'Medio', resto: 'Bajo')

# 3. Aplica la función a la columna Categoria_Ventas y ordena por Ganancia_Mensual (descendente)

# 4. Imprime "Análisis completo de productos:" y el DataFrame
`,
            expectedKeywords: ['apply', 'sort_values', 'lambda'],
            successCriteria:
              'Debe calcular ganancias, márgenes y categorizar productos correctamente.',
            expectedResult: 'Análisis completo de productos:\n     Nombre  Precio_Venta  Costo  Ventas_Mes  Ganancia_Unitaria  Ganancia_Mensual  Margen_Porcentual Categoria_Ventas\n0   Laptop          1200   1000           5                200              1000               16.7            Medio\n1    Mouse            25     15          20                 10               200               40.0             Alto\n2  Teclado            75     45          15                 30               450               40.0             Alto\n3  Monitor           400    300           8                100               800               25.0            Medio\n4 Impresora          200    120           3                 80               240               40.0             Bajo\n\nProductos ordenados por ganancia mensual:\n     Nombre  Ganancia_Mensual Categoria_Ventas\n0   Laptop              1000            Medio\n3  Monitor               800            Medio\n2  Teclado               450             Alto\n4 Impresora               240             Bajo\n1    Mouse               200             Alto',
            solutionCode: `import pandas as pd

datos = {
    'Nombre': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio_Venta': [1200, 25, 75, 400, 200],
    'Costo': [1000, 15, 45, 300, 120],
    'Ventas_Mes': [5, 20, 15, 8, 3]
}
df = pd.DataFrame(datos)

df['Ganancia_Unitaria'] = df['Precio_Venta'] - df['Costo']
df['Ganancia_Mensual'] = df['Ganancia_Unitaria'] * df['Ventas_Mes']
df['Margen_Porcentual'] = (df['Ganancia_Unitaria'] / df['Precio_Venta'] * 100).round(1)

def categorizar(unidades):
    if unidades >= 15: return 'Alto'
    elif unidades >= 5: return 'Medio'
    return 'Bajo'

df['Categoria_Ventas'] = df['Ventas_Mes'].apply(categorizar)
df_ordenado = df.sort_values('Ganancia_Mensual', ascending=False)

print("Análisis completo de productos:")
print(df)
print("\nProductos ordenados por ganancia mensual:")
print(df_ordenado[['Nombre', 'Ganancia_Mensual', 'Categoria_Ventas']])`,
            solutionNote: 'Calculamos las métricas por fila y usamos apply para categorizar según el volumen de ventas.',
            salidaGuiada: 'Análisis completo de productos:\n     Nombre  Precio_Venta  Costo  Ventas_Mes  Ganancia_Unitaria  Ganancia_Mensual  ...',
            executionNote:
              'Debe mostrar todas las columnas calculadas y el ordenamiento final.',
            successMessage:
              '¡Fantástico! Ya sabes manipular datos y crear análisis avanzados.',
          },
        },
      ],
    },
    {
      id: 'pandas-analisis-datos',
      title: 'Análisis de datos',
      summary:
        'Estadística descriptiva, agrupación y análisis de datos temporales.',
      lessons: [
        {
          id: 'pandas-estadistica-descriptiva',
          title: 'Misión 07: Estadística descriptiva',
          duration: '16 min',
          xp: 190,
          objective:
            'Calcular estadísticas descriptivas básicas y avanzadas en Pandas.',
          resources: {
            videoTitle: 'Estadística descriptiva con Pandas',
            videoUrl: 'https://www.youtube.com/embed/nmIBewM3XA8',
            documentationLinks: [
              {
                label: 'Descriptive statistics',
                url: 'https://pandas.pydata.org/docs/user_guide/basics.html#descriptive-statistics',
              },
              {
                label: 'Essential basic functionality',
                url: 'https://pandas.pydata.org/docs/user_guide/basics.html',
              },
            ],
            exampleTitle: 'Calculando estadísticas descriptivas',
            exampleCode: `import pandas as pd

ventas = {
    'Producto': ['A', 'B', 'C', 'D', 'E'],
    'Ventas_Q1': [100, 150, 200, 250, 300],
    'Ventas_Q2': [120, 160, 180, 270, 320],
    'Ventas_Q3': [110, 140, 210, 260, 310],
    'Ventas_Q4': [130, 170, 190, 280, 330]
}

df = pd.DataFrame(ventas)

print("DataFrame de ventas:")
print(df)
print()

# Estadísticas descriptivas generales
print("Estadísticas descriptivas:")
print(df.describe())
print()

# Estadísticas por columna específica
print("Estadísticas de Ventas_Q1:")
print(f"Media: {df['Ventas_Q1'].mean():.1f}")
print(f"Mediana: {df['Ventas_Q1'].median():.1f}")
print(f"Desviación estándar: {df['Ventas_Q1'].std():.1f}")
print(f"Mínimo: {df['Ventas_Q1'].min()}")
print(f"Máximo: {df['Ventas_Q1'].max()}")
print(f"Suma total: {df['Ventas_Q1'].sum()}")
print()

# Contar valores
print("Conteo de productos:")
print(df['Producto'].value_counts())
print()

# Calcular total anual
df['Total_Anual'] = df[['Ventas_Q1', 'Ventas_Q2', 'Ventas_Q3', 'Ventas_Q4']].sum(axis=1)
print("Con total anual:")
print(df[['Producto', 'Total_Anual']])
`,
            supportNote:
              'describe() da un resumen completo, mientras que métodos individuales como mean(), median(), std() permiten estadísticas específicas.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Las estadísticas descriptivas resumen y describen los datos principales. Son fundamentales para entender datasets.',
            steps: [
              'Usa describe() para obtener estadísticas generales',
              'Calcula media, mediana y desviación estándar individualmente',
              'Usa value_counts() para contar categorías',
              'Suma columnas con sum() o suma por filas con axis=1',
            ],
            hint:
              'Para estadísticas de columnas numéricas específicas, usa df["columna"].mean(), etc.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza estadísticas de un negocio',
            prompt:
              'Completa el código para calcular estadísticas de rendimiento de productos.',
            starterCode: `import pandas as pd

datos = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio': [1200, 25, 75, 400, 200],
    'Unidades_Vendidas': [45, 120, 85, 35, 25],
    'Rating': [4.5, 4.2, 4.0, 4.3, 3.8]
}

# 1. Crea el DataFrame 'df'. Imprime "Datos de productos:" y el DataFrame

# 2. Imprime "\nEstadísticas generales:" y usa describe() sobre 'df'

# 3. Crea la columna 'Ingresos' (Precio * Unidades_Vendidas). Muestra el promedio, la suma total, el nombre del producto top ventas y el mejor rating.
`,
            expectedKeywords: ['describe', 'mean', 'sum', 'max', 'min', 'std'],
            successCriteria:
              'Debe calcular estadísticas descriptivas completas de productos e ingresos.',
            expectedResult: 'Datos de productos:\n     Producto  Precio  Unidades_Vendidas  Rating\n0     Laptop    1200                 45     4.5\n1      Mouse      25                120     4.2\n2    Teclado      75                 85     4.0\n3    Monitor     400                 35     4.3\n4  Impresora     200                 25     3.8\n\nEstadísticas generales:\n       Precio  Unidades_Vendidas  Rating\ncount    5.00               5.00    5.00\nmean   380.00              62.00    4.16\nstd    480.69              39.62    0.27\nmin     25.00              25.00    3.80\n25%     75.00              35.00    4.00\n50%    200.00              45.00    4.20\n75%    400.00              85.00    4.30\nmax   1200.00             120.00    4.50\n\nEstadísticas de ingresos:\nIngreso promedio: $16,475\nIngreso total: $82,375\nProducto más vendido: Mouse\nMejor rating: 4.5 (Laptop)\n\nDistribución de precios:\nPrecio más bajo: $25\nPrecio más alto: $1200\nRango de precios: $1175\nDesviación estándar de precios: $481',
            solutionCode: `import pandas as pd

datos = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio': [1200, 25, 75, 400, 200],
    'Unidades_Vendidas': [45, 120, 85, 35, 25],
    'Rating': [4.5, 4.2, 4.0, 4.3, 3.8]
}
df = pd.DataFrame(datos)

print("Datos de productos:")
print(df)

print("\nEstadísticas generales:")
stats = df[['Precio', 'Unidades_Vendidas', 'Rating']].describe()
print(stats.round(2))

df['Ingresos'] = df['Precio'] * df['Unidades_Vendidas']

print("\nEstadísticas de ingresos:")
print("Ingreso promedio: $", df["Ingresos"].mean())
print("Ingreso total: $", df["Ingresos"].sum())
print("Producto más vendido:", df.loc[df["Unidades_Vendidas"].idxmax(), "Producto"])
print("Mejor rating:", df["Rating"].max(), "(", df.loc[df["Rating"].idxmax(), "Producto"], ")")

print("\nDistribución de precios:")
print("Precio más bajo: $", df["Precio"].min())
print("Precio más alto: $", df["Precio"].max())
print("Rango de precios: $", df["Precio"].max() - df["Precio"].min())
print("Desviación estándar de precios: $", df["Precio"].std())`,
            solutionNote: 'Usamos idxmax para encontrar productos específicos y f-strings para formatear la moneda con comas.',
            salidaGuiada: 'Datos de productos:\n     Producto  Precio  Unidades_Vendidas  Rating\n0     Laptop    1200                 45     4.5\n1      Mouse      25                120     4.2\n2    Teclado      75                 85     4.0\n3    Monitor     400                 35     4.3\n4  Impresora     200                 25     3.8\n\nEstadísticas generales:\n       Precio  Unidades_Vendidas  Rating\ncount    5.00               5.00    5.00\nmean   380.00              62.00    4.16\nstd    480.69              39.62    0.27\nmin     25.00              25.00    3.80\n25%     75.00              35.00    4.00\n50%    200.00              45.00    4.20\n75%    400.00              85.00    4.30\nmax   1200.00             120.00    4.50\n\nEstadísticas de ingresos:\nIngreso promedio: $16,475\nIngreso total: $82,375\nProducto más vendido: Mouse\nMejor rating: 4.5 (Laptop)\n\nDistribución de precios:\nPrecio más bajo: $25\nPrecio más alto: $1200\nRango de precios: $1175\nDesviación estándar de precios: $481',
            executionNote:
              'Debe mostrar estadísticas descriptivas y métricas calculadas.',
            successMessage:
              '¡Excelente análisis! Las estadísticas te dan insights valiosos sobre el negocio.',
          },
        },
        {
          id: 'pandas-agrupacion-analisis',
          title: 'Misión 08: Agrupación y análisis',
          duration: '20 min',
          xp: 230,
          objective:
            'Aprender a agrupar datos y crear análisis por categorías usando groupby().',
          resources: {
            videoTitle: 'Agrupando datos con groupby en Pandas',
            videoUrl: 'https://www.youtube.com/embed/IW9C5ClCOFU?start=140',
            documentationLinks: [
              {
                label: 'Group by: split-apply-combine',
                url: 'https://pandas.pydata.org/docs/user_guide/groupby.html',
              },
              {
                label: 'Grouping operations',
                url: 'https://pandas.pydata.org/docs/user_guide/groupby.html#aggregation',
              },
            ],
            exampleTitle: 'Agrupando y analizando datos por categorías',
            exampleCode: `import pandas as pd

ventas = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Laptop', 'Mouse', 'Monitor', 'Teclado', 'Laptop'],
    'Categoria': ['Electrónica', 'Accesorio', 'Accesorio', 'Electrónica', 'Accesorio', 'Electrónica', 'Accesorio', 'Electrónica'],
    'Precio': [1200, 25, 75, 1200, 25, 400, 75, 1200],
    'Cantidad': [1, 2, 1, 2, 3, 1, 2, 1],
    'Mes': ['Enero', 'Enero', 'Enero', 'Febrero', 'Febrero', 'Febrero', 'Marzo', 'Marzo']
}

df = pd.DataFrame(ventas)

print("Datos de ventas:")
print(df)
print()

# Agrupar por categoría y calcular totales
ventas_por_categoria = df.groupby('Categoria').agg({
    'Cantidad': 'sum',
    'Precio': 'mean'
}).round(2)

print("Ventas por categoría:")
print(ventas_por_categoria)
print()

# Agrupar por producto y sumar cantidades
ventas_por_producto = df.groupby('Producto')['Cantidad'].sum()
print("Unidades vendidas por producto:")
print(ventas_por_producto)
print()

# Agrupar por mes y calcular ingresos
df['Ingreso'] = df['Precio'] * df['Cantidad']
ingresos_por_mes = df.groupby('Mes')['Ingreso'].sum()
print("Ingresos por mes:")
print(ingresos_por_mes)
print()

# Análisis múltiple: promedio de precio por categoría y mes
analisis_completo = df.groupby(['Categoria', 'Mes']).agg({
    'Cantidad': 'sum',
    'Ingreso': 'sum',
    'Precio': 'mean'
}).round(2)

print("Análisis completo por categoría y mes:")
print(analisis_completo)
`,
            supportNote:
              'groupby() agrupa datos por una o más columnas, luego puedes aplicar funciones de agregación como sum(), mean(), count(), etc.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'El agrupamiento permite analizar datos por categorías, creando resúmenes y patrones importantes.',
            steps: [
              'Usa groupby() para agrupar por una columna',
              'Aplica funciones de agregación como sum(), mean(), count()',
              'Agrupa por múltiples columnas para análisis más detallados',
              'Usa agg() para aplicar diferentes funciones a diferentes columnas',
            ],
            hint:
              'Después de groupby(), puedes encadenar .sum(), .mean(), etc., o usar .agg() para múltiples operaciones.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza ventas por categorías',
            prompt:
              'Completa el código para agrupar ventas por categoría y región, calculando métricas importantes.',
            starterCode: `import pandas as pd

datos = {
    'Region': ['Centro', 'Norte', 'Sur', 'Centro', 'Norte', 'Sur', 'Norte'],
    'Categoria': ['Accesorio', 'Accesorio', 'Accesorio', 'Electrónica', 'Electrónica', 'Electrónica', 'Oficina'],
    'Precio': [25, 50, 60, 1200, 1200, 400, 200],
    'Unidades': [8, 10, 5, 4, 3, 2, 1]
}

# 1. Crea 'df' y la columna 'Ingreso'. Agrupa por 'Categoria' calculando suma de Unidades e Ingreso, y el promedio de Precio.

# 2. Agrupa por 'Region' calculando suma de Unidades e Ingreso.

# 3. Agrupa por ['Categoria', 'Region'] para un análisis cruzado.

# 4. Encuentra la categoría con mayor ingreso total e imprímela.
`,
            expectedKeywords: ['groupby', 'agg', 'sum', 'mean'],
            successCriteria:
              'Debe agrupar datos por categoría y región, calculando unidades e ingresos.',
            expectedResult: 'Resumen por categoría:\n            Unidades  Ingreso  Precio\nCategoria                          \nAccesorio          23     1000   45.00\nElectrónica         9     9200  933.33\nOficina             1      200  200.00\n\nVentas por región:\n        Unidades  Ingreso\nRegion                  \nCentro         12     5000\nNorte          14     4300\nSur             7     1100\n\nAnálisis por categoría y región:\n                Unidades  Ingreso\nCategoria    Region              \nAccesorio    Centro        8     200\n             Norte        10     500\n             Sur           5     300\nElectrónica  Centro        4    4800\n             Norte        3    3600\n             Sur           2     800\nOficina      Norte         1     200\n\nCategoría más rentable: Electrónica ($9200.0)',
            solutionCode: `import pandas as pd

datos = {
    'Region': ['Centro', 'Norte', 'Sur', 'Centro', 'Norte', 'Sur', 'Norte'],
    'Categoria': ['Accesorio', 'Accesorio', 'Accesorio', 'Electrónica', 'Electrónica', 'Electrónica', 'Oficina'],
    'Precio': [25, 50, 60, 1200, 1200, 400, 200],
    'Unidades': [8, 10, 5, 4, 3, 2, 1]
}
df = pd.DataFrame(datos)
df['Ingreso'] = df['Precio'] * df['Unidades']

resumen_cat = df.groupby('Categoria').agg({
    'Unidades': 'sum',
    'Ingreso': 'sum',
    'Precio': 'mean'
}).round(2)
print("Resumen por categoría:")
print(resumen_cat)

resumen_reg = df.groupby('Region').agg({'Unidades': 'sum', 'Ingreso': 'sum'})
print("\nVentas por región:")
print(resumen_reg)

cruzado = df.groupby(['Categoria', 'Region']).agg({'Unidades': 'sum', 'Ingreso': 'sum'})
print("\nAnálisis por categoría y región:")
print(cruzado)

top_cat = df.groupby('Categoria')['Ingreso'].sum().idxmax()
total_top = df.groupby('Categoria')['Ingreso'].sum().max()
print(f"\\nCategoría más rentable: {top_cat} (\${float(total_top):.1f})")`,
            solutionNote: 'Utilizamos groupby con listas para el análisis cruzado y agg para aplicar múltiples funciones.',
            salidaGuiada: 'Resumen por categoría:\nUnidades  Ingreso  Precio\nCategoria\nAccesorio          23     1000   45.00\nElectrónica         9     9200  933.33\nOficina             1      200  200.00\n\nVentas por región:\nUnidades  Ingreso\nRegion\nCentro         12     5000\nNorte          14     4300\nSur             7     1100\n\nAnálisis por categoría y región:\nUnidades  Ingreso\nCategoria    Region\nAccesorio    Centro        8     200\nNorte        10     500\nSur           5     300\nElectrónica  Centro        4    4800\nNorte        3    3600\nSur           2     800\nOficina      Norte         1     200\n\nCategoría más rentable: Electrónica ($9200.0)',
            executionNote:
              'Debe mostrar agrupaciones por categoría, región y análisis cruzado.',
            successMessage:
              '¡Excelente agrupamiento! Ahora puedes analizar datos por segmentos.',
          },
        },
        {
          id: 'pandas-manejo-fechas',
          title: 'Misión 09: Manejo de fechas',
          duration: '18 min',
          xp: 210,
          objective:
            'Aprender a trabajar con fechas en Pandas y crear análisis temporales básicos.',
          resources: {
            videoTitle: 'Trabajando con fechas en Pandas',
            videoUrl: 'https://www.youtube.com/embed/tIKPx_uhXgQ',
            documentationLinks: [
              {
                label: 'Time series / date functionality',
                url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html',
              },
              {
                label: 'Converting to timestamps',
                url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html#converting-to-timestamps',
              },
            ],
            exampleTitle: 'Trabajando con fechas y series temporales',
            exampleCode: `import pandas as pd

# Crear DataFrame con fechas como strings
ventas_data = {
    'Fecha': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-04-05', '2024-05-12'],
    'Producto': ['A', 'B', 'A', 'C', 'B'],
    'Ventas': [100, 150, 120, 200, 180]
}

df = pd.DataFrame(ventas_data)

print("DataFrame original:")
print(df)
print(f"Tipos de datos: {df.dtypes}")
print()

# Convertir columna Fecha a datetime
df['Fecha'] = pd.to_datetime(df['Fecha'])
print("Después de convertir a datetime:")
print(df)
print(f"Tipos de datos: {df.dtypes}")
print()

# Extraer componentes de fecha
df['Año'] = df['Fecha'].dt.year
df['Mes'] = df['Fecha'].dt.month
df['Dia'] = df['Fecha'].dt.day
df['Dia_Semana'] = df['Fecha'].dt.day_name()

print("Con componentes de fecha extraídos:")
print(df[['Fecha', 'Año', 'Mes', 'Dia', 'Dia_Semana']])
print()

# Filtrar por mes
ventas_febrero = df[df['Fecha'].dt.month == 2]
print("Ventas de febrero:")
print(ventas_febrero)
print()

# Agrupar por mes
ventas_por_mes = df.groupby(df['Fecha'].dt.month)['Ventas'].sum()
print("Ventas por mes:")
print(ventas_por_mes)
print()

# Crear rango de fechas
fechas = pd.date_range(start='2024-01-01', end='2024-12-31', freq='M')
print("Rango de fechas (último día de cada mes):")
print(fechas)
`,
            supportNote:
              'pd.to_datetime() convierte strings a fechas. El accessor .dt permite extraer componentes como year, month, day.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Trabajar con fechas es crucial en análisis financiero. Pandas tiene poderosas herramientas para manejo de fechas.',
            steps: [
              'Convierte strings a datetime con pd.to_datetime()',
              'Extrae componentes de fecha con .dt.year, .dt.month, etc.',
              'Filtra datos por fechas específicas',
              'Agrupa datos por períodos temporales',
              'Crea rangos de fechas con pd.date_range()',
            ],
            hint:
              'Después de convertir a datetime, puedes usar df["fecha"].dt.month == 1 para filtrar enero.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza ventas por períodos temporales',
            prompt:
              'Completa el código para analizar ventas mensuales y tendencias temporales.',
            starterCode: `import pandas as pd

ventas_data = {
    'Fecha': ['2024-01-15', '2024-01-28', '2024-02-10', '2024-02-25', '2024-03-05', '2024-03-20'],
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Laptop', 'Monitor', 'Mouse'],
    'Precio': [1200, 25, 75, 1200, 400, 25],
    'Cantidad': [2, 5, 3, 1, 1, 4]
}

# 1. Crea 'df'. Convierte 'Fecha' a datetime, calcula 'Ingreso' (Precio * Cantidad) y extrae el 'Mes' usando .dt.month.

# 2. Agrupa por 'Mes' sumando Cantidad e Ingreso.

# 3. Filtra el DataFrame para ver solo las ventas de febrero y calcula el ingreso promedio de los meses.

# 4. Para cada mes, identifica el producto con mayor cantidad vendida.
`,
            expectedKeywords: ['pd.to_datetime', '.dt.month', 'groupby'],
            successCriteria:
              'Debe convertir fechas, extraer componentes y analizar ventas por períodos.',
            expectedResult: 'Datos procesados:\nFecha    Producto  Precio  Cantidad  Ingreso\n0 2024-01-15    Laptop    1200        2     2400\n1 2024-01-28     Mouse      25        5      125\n2 2024-02-10   Teclado      75        3      225\n3 2024-02-25    Laptop    1200        1     1200\n4 2024-03-05   Monitor     400        1      400\n5 2024-03-20     Mouse      25        4      100\n\nResumen mensual:\nCantidad  Ingreso\nMes\n1         7     2525\n2         4     1425\n3         5      500\n\nVentas de febrero:\nProducto  Cantidad  Ingreso\n2  Teclado        3      225\n3   Laptop        1     1200\n\nIngreso promedio por mes:\nMes\n1    1262.5\n2     712.5\n3     250.0\nName: Ingreso, dtype: float64\n\nProducto más vendido por mes:\nMes 1: Mouse\nMes 2: Laptop\nMes 3: Mouse',
            solutionCode: `import pandas as pd

ventas_data = {
    'Fecha': ['2024-01-15', '2024-01-28', '2024-02-10', '2024-02-25', '2024-03-05', '2024-03-20'],
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Laptop', 'Monitor', 'Mouse'],
    'Precio': [1200, 25, 75, 1200, 400, 25],
    'Cantidad': [2, 5, 3, 1, 1, 4]
}
df = pd.DataFrame(ventas_data)
df['Fecha'] = pd.to_datetime(df['Fecha'])
df['Ingreso'] = df['Precio'] * df['Cantidad']
df['Mes'] = df['Fecha'].dt.month

print("Datos procesados:")
print(df[['Fecha', 'Producto', 'Precio', 'Cantidad', 'Ingreso']])

resumen = df.groupby('Mes').agg({'Cantidad': 'sum', 'Ingreso': 'sum'})
print("\nResumen mensual:")
print(resumen)

print("\nVentas de febrero:")
print(df[df['Mes'] == 2][['Producto', 'Cantidad', 'Ingreso']])

promedio = df.groupby('Mes')['Ingreso'].mean()
print("\nIngreso promedio por mes:")
print(promedio)

print("\nProducto más vendido por mes:")
for mes in df['Mes'].unique():
    prod = df[df['Mes'] == mes].groupby('Producto')['Cantidad'].sum().idxmax()
    print(f"Mes {mes}: {prod}")`,
            solutionNote: 'Convertimos a datetime para usar el accessor .dt y extraer el mes para la agrupación.',
            salidaGuiada: 'Datos procesados:\nFecha    Producto  Precio  Cantidad  Ingreso\n0 2024-01-15    Laptop    1200        2     2400\n1 2024-01-28     Mouse      25        5      125\n2 2024-02-10   Teclado      75        3      225\n3 2024-02-25    Laptop    1200        1     1200\n4 2024-03-05   Monitor     400        1      400\n5 2024-03-20     Mouse      25        4      100\n\nResumen mensual:\nCantidad  Ingreso\nMes\n1         7     2525\n2         4     1425\n3         5      500\n\nVentas de febrero:\nProducto  Cantidad  Ingreso\n2  Teclado        3      225\n3   Laptop        1     1200\n\nIngreso promedio por mes:\nMes\n1    1262.5\n2     712.5\n3     250.0\nName: Ingreso, dtype: float64\n\nProducto más vendido por mes:\nMes 1: Mouse\nMes 2: Laptop\nMes 3: Mouse',
            executionNote:
              'Debe mostrar análisis por meses con cantidades e ingresos.',
            successMessage:
              '¡Perfecto! Ahora puedes analizar datos a través del tiempo.',
          },
        },
      ],
    },
    {
      id: 'pandas-finanzas-aplicado',
      title: 'Pandas aplicado a Finanzas',
      summary:
        'Aplicación específica de Pandas para análisis financiero y reporting.',
      lessons: [
        {
          id: 'pandas-datos-financieros',
          title: 'Misión 10: Datos financieros',
          duration: '20 min',
          xp: 240,
          objective:
            'Importar y procesar datos financieros, calcular variaciones porcentuales y rendimientos.',
          resources: {
            videoTitle: 'Procesando datos financieros con Pandas',
            videoUrl: 'https://www.youtube.com/embed/gnW5G35kKn4',
            documentationLinks: [
              {
                label: 'pct_change() method',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pct_change.html',
              },
              {
                label: 'Time series operations',
                url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html',
              },
            ],
            exampleTitle: 'Análisis de precios y rendimientos financieros',
            exampleCode: `import pandas as pd

# Datos de precios de acciones (ejemplo simplificado)
precios = {
    'Fecha': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
    'AAPL': [180.50, 182.30, 179.80, 185.20, 187.50],
    'GOOGL': [140.20, 142.50, 141.80, 145.30, 147.90],
    'MSFT': [380.10, 382.40, 378.90, 385.60, 388.20]
}

df = pd.DataFrame(precios)
df['Fecha'] = pd.to_datetime(df['Fecha'])
df = df.set_index('Fecha')

print("Precios de acciones:")
print(df)
print()

# Calcular variaciones porcentuales diarias
rendimientos_diarios = df.pct_change() * 100
print("Rendimientos diarios (%):")
print(rendimientos_diarios.round(2))
print()

# Calcular rendimiento acumulado
rendimiento_acumulado = (1 + df.pct_change()).cumprod() - 1
print("Rendimiento acumulado:")
print((rendimiento_acumulado * 100).round(2))
print()

# Estadísticas de rendimientos
print("Estadísticas de rendimientos AAPL:")
print(rendimientos_diarios['AAPL'].describe().round(4))
print()

# Calcular volatilidad (desviación estándar anualizada)
volatilidad_anual = rendimientos_diarios.std() * (252 ** 0.5)  # 252 días de trading al año
print("Volatilidad anualizada (%):")
print((volatilidad_anual * 100).round(2))
print()

# Mejor y peor día para cada acción
mejor_dia = rendimientos_diarios.idxmax()
peor_dia = rendimientos_diarios.idxmin()

print("Mejor día de rendimiento:")
for accion, fecha in mejor_dia.items():
    rendimiento = rendimientos_diarios.loc[fecha, accion]
    print(f"{accion}: {fecha.strftime('%Y-%m-%d')} ({rendimiento:.2f}%)")
`,
            supportNote:
              'pct_change() calcula variaciones porcentuales. Es fundamental para análisis de rendimientos financieros.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'En finanzas, pct_change() es esencial para calcular rendimientos. Los datos temporales requieren indexación por fecha.',
            steps: [
              'Importa datos con fechas y precios',
              'Convierte fechas y establece como índice',
              'Calcula rendimientos diarios con pct_change()',
              'Calcula rendimientos acumulados',
              'Analiza volatilidad y estadísticas de riesgo',
            ],
            hint:
              'Para datos financieros, establece la fecha como índice con set_index("Fecha").',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza rendimientos de un portafolio',
            prompt:
              'Completa el código para analizar rendimientos y riesgo de un portafolio de acciones.',
            starterCode: `import pandas as pd

datos = {
    'Fecha': ['2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12'],
    'Tesla': [245.50, 248.30, 252.80, 249.20, 255.60],
    'Amazon': [155.20, 157.80, 156.40, 159.50, 162.30],
    'Netflix': [485.10, 488.50, 492.20, 487.80, 495.40]
}

# 1. Crea 'df'. Convierte 'Fecha' a datetime y establécela como índice del DataFrame.

# 2. Calcula rendimientos diarios porcentuales usando pct_change(). Muestra el promedio y la volatilidad (std) de estos.

# 3. Calcula el rendimiento total acumulado del período e identifica qué acción rindió más.
`,
            expectedKeywords: ['pct_change', 'set_index', 'std', 'mean'],
            successCriteria:
              'Debe calcular rendimientos, volatilidad y analizar el portafolio completo.',
            expectedResult: 'Precios del portafolio:\n            Tesla   Amazon  Netflix\nFecha                          \n2024-01-08  245.50  155.20   485.10\n2024-01-09  248.30  157.80   488.50\n2024-01-10  252.80  156.40   492.20\n2024-01-11  249.20  159.50   487.80\n2024-01-12  255.60  162.30   495.40\n\nRendimientos diarios (%):\n            Tesla  Amazon  Netflix\nFecha                          \n2024-01-08    NaN     NaN      NaN\n2024-01-09   1.14   1.67     0.70\n2024-01-10   1.81  -0.89     0.76\n2024-01-11  -1.41   1.98    -0.89\n2024-01-12   2.56   1.76     1.56\n\nRendimiento promedio diario (%):\nTesla       1.02\nAmazon      1.13\nNetflix     0.53\ndtype: float64\n\nVolatilidad diaria (%):\nTesla       1.70\nAmazon      1.47\nNetflix     0.98\ndtype: float64\n\nMejor rendimiento diario (%):\nTesla       2.56\nAmazon      1.98\nNetflix     1.56\ndtype: float64\n\nRendimiento total del período (%):\nTesla       4.11\nAmazon      4.57\nNetflix     2.12\ndtype: float64\n\nAcción con mejor rendimiento: Amazon (4.57%)',
            solutionCode: `import pandas as pd

datos = {
    'Fecha': ['2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12'],
    'Tesla': [245.50, 248.30, 252.80, 249.20, 255.60],
    'Amazon': [155.20, 157.80, 156.40, 159.50, 162.30],
    'Netflix': [485.10, 488.50, 492.20, 487.80, 495.40]
}
df = pd.DataFrame(datos)
df['Fecha'] = pd.to_datetime(df['Fecha'])
df = df.set_index('Fecha')

print("Precios del portafolio:")
print(df)

rendimientos = df.pct_change() * 100
print("\nRendimientos diarios (%):")
print(rendimientos.round(2))

print("\nRendimiento promedio diario (%):")
print(rendimientos.mean().round(2))

print("\nVolatilidad diaria (%):")
print(rendimientos.std().round(2))

print("\nMejor rendimiento diario (%):")
print(rendimientos.max().round(2))

total = ((df.iloc[-1] / df.iloc[0]) - 1) * 100
print("\nRendimiento total del período (%):") 
print(total.round(2))

mejor = total.idxmax()
print(f"\nAcción con mejor rendimiento: {mejor} ({total[mejor]:.2f}%)")`,
            solutionNote: 'Establecer la fecha como índice es crucial para que pct_change alinee correctamente los períodos.',
            salidaGuiada: 'Precios del portafolio:\nTesla   Amazon  Netflix\nFecha\n2024-01-08  245.50  155.20   485.10\n2024-01-09  248.30  157.80   488.50\n2024-01-10  252.80  156.40   492.20\n2024-01-11  249.20  159.50   487.80\n2024-01-12  255.60  162.30   495.40\n\nRendimientos diarios (%):\nTesla  Amazon  Netflix\nFecha\n2024-01-08    NaN     NaN      NaN\n2024-01-09   1.14   1.67     0.70\n2024-01-10   1.81  -0.89     0.76\n2024-01-11  -1.41   1.98    -0.89\n2024-01-12   2.56   1.76     1.56\n\nRendimiento promedio diario (%):\nTesla       1.02\nAmazon      1.13\nNetflix     0.53\ndtype: float64\n\nVolatilidad diaria (%):\nTesla       1.70\nAmazon      1.47\nNetflix     0.98\ndtype: float64\n\nMejor rendimiento diario (%):\nTesla       2.56\nAmazon      1.98\nNetflix     1.56\ndtype: float64\n\nRendimiento total del período (%):\nTesla       4.11\nAmazon      4.57\nNetflix     2.12\ndtype: float64\n\nAcción con mejor rendimiento: Amazon (4.57%)',
            executionNote:
              'Debe mostrar rendimientos diarios, promedios y volatilidad.',
            successMessage:
              '¡Excelente análisis financiero! Ya puedes evaluar portafolios.',
          },
        },
        {
          id: 'pandas-analisis-financiero',
          title: 'Misión 11: Análisis financiero básico',
          duration: '22 min',
          xp: 250,
          objective:
            'Crear análisis de ingresos/gastos, flujo de caja y KPIs financieros básicos.',
          resources: {
            videoTitle: 'Análisis financiero básico con Pandas',
            videoUrl: 'https://www.youtube.com/embed/5MxPgLpKVgY?start=2060',
            documentationLinks: [
              {
                label: 'GroupBy operations',
                url: 'https://pandas.pydata.org/docs/user_guide/groupby.html',
              },
              {
                label: 'Pivot tables',
                url: 'https://pandas.pydata.org/docs/user_guide/reshaping.html#pivot-tables',
              },
            ],
            exampleTitle: 'Análisis de estados financieros y KPIs',
            exampleCode: `import pandas as pd

# Datos de transacciones financieras
transacciones = {
    'Fecha': ['2024-01-15', '2024-01-20', '2024-02-05', '2024-02-18', '2024-03-10'],
    'Tipo': ['Ingreso', 'Gasto', 'Ingreso', 'Gasto', 'Ingreso'],
    'Categoria': ['Ventas', 'Sueldos', 'Ventas', 'Alquiler', 'Servicios'],
    'Monto': [5000, 2500, 7200, 1200, 1800],
    'Cuenta': ['Principal', 'Principal', 'Secundaria', 'Principal', 'Principal']
}

df = pd.DataFrame(transacciones)
df['Fecha'] = pd.to_datetime(df['Fecha'])

print("Transacciones financieras:")
print(df)
print()

# Separar ingresos y gastos
ingresos = df[df['Tipo'] == 'Ingreso']
gastos = df[df['Tipo'] == 'Gasto']

print("Resumen de ingresos:")
print(ingresos.groupby('Categoria')['Monto'].sum())
print()

print("Resumen de gastos:")
print(gastos.groupby('Categoria')['Monto'].sum())
print()

# Calcular flujo de caja neto
flujo_neto = ingresos['Monto'].sum() - gastos['Monto'].sum()
print(f"Flujo de caja neto: \${flujo_neto}")
print()

# Análisis por mes
df['Mes'] = df['Fecha'].dt.month
analisis_mensual = df.pivot_table(
    values='Monto',
    index='Mes',
    columns='Tipo',
    aggfunc='sum',
    fill_value=0
)

print("Análisis mensual:")
print(analisis_mensual)
print()

# Calcular KPIs
total_ingresos = ingresos['Monto'].sum()
total_gastos = gastos['Monto'].sum()
margen_beneficio = ((total_ingresos - total_gastos) / total_ingresos * 100)

print("KPIs financieros:")
print(f"Total ingresos: \${total_ingresos}")
print(f"Total gastos: \${total_gastos}")
print(f"Margen de beneficio: {margen_beneficio:.1f}%")
print(f"Gasto promedio: \${gastos['Monto'].mean():.0f}")
print(f"Ingreso promedio: \${ingresos['Monto'].mean():.0f}")
`,
            supportNote:
              'pivot_table() es excelente para análisis financieros, permitiendo ver ingresos vs gastos por períodos.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'El análisis financiero requiere separar ingresos de gastos, calcular flujos de caja y crear KPIs importantes.',
            steps: [
              'Separa transacciones en ingresos y gastos',
              'Agrupa por categorías para análisis detallado',
              'Usa pivot_table para análisis mensual',
              'Calcula KPIs como margen de beneficio y promedios',
            ],
            hint:
              'Para pivot tables, especifica values, index, columns y aggfunc.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Analiza el estado financiero de una empresa',
            prompt:
              'Completa el código para analizar ingresos, gastos y calcular KPIs financieros.',
            starterCode: `import pandas as pd

datos = {
    'Mes': ['Enero', 'Enero', 'Febrero', 'Febrero', 'Marzo', 'Marzo'],
    'Tipo': ['Ingreso', 'Gasto', 'Ingreso', 'Gasto', 'Ingreso', 'Gasto'],
    'Categoria': ['Ventas', 'Operativos', 'Ventas', 'Operativos', 'Ventas', 'Operativos'],
    'Monto': [15000, 8000, 18000, 8500, 22000, 9000]
}

# 1. Crea 'df'. Calcula el total de ingresos, gastos y el beneficio neto total.

# 2. Genera una pivot_table con 'Mes' como índice y 'Tipo' como columnas para sumar los montos mensuales.

# 3. Calcula el 'Beneficio_Neto' y el 'Margen' por cada mes en la tabla resultante. Muestra los KPIs de margen promedio y gastos.
`,
            expectedKeywords: ['pivot_table', 'sum', 'mean'],
            successCriteria:
              'Debe analizar ingresos vs gastos y calcular KPIs financieros por mes.',
            expectedResult: 'Estado financiero:\n      Mes      Tipo  Categoria   Monto\n0  Enero   Ingreso     Ventas   15000\n1  Enero     Gasto Operativos    8000\n2 Febrero  Ingreso     Ventas   18000\n3 Febrero    Gasto Operativos    8500\n4  Marzo   Ingreso     Ventas   22000\n5  Marzo     Gasto Operativos    9000\n\nResumen financiero:\nTotal ingresos: $55000\nTotal gastos: $25500\nBeneficio neto: $29500\n\nAnálisis mensual:\nTipo     Gasto  Ingreso\nMes                     \nEnero     8000    15000\nFebrero   8500    18000\nMarzo     9000    22000\n\nCon márgenes calculados:\nTipo      Gasto  Ingreso  Beneficio_Neto  Margen\nMes                                           \nEnero      8000    15000            7000     46.7\nFebrero    8500    18000            9500     52.8\nMarzo      9000    22000           13000     59.1\n\nKPIs clave:\nMargen promedio: 52.9%\nMes con mayor beneficio: Marzo\nIngreso promedio mensual: $18333\nGasto promedio mensual: $8500',
            solutionCode: `import pandas as pd

datos = {
    'Mes': ['Enero', 'Enero', 'Febrero', 'Febrero', 'Marzo', 'Marzo'],
    'Tipo': ['Ingreso', 'Gasto', 'Ingreso', 'Gasto', 'Ingreso', 'Gasto'],
    'Categoria': ['Ventas', 'Operativos', 'Ventas', 'Operativos', 'Ventas', 'Operativos'],
    'Monto': [15000, 8000, 18000, 8500, 22000, 9000]
}
df = pd.DataFrame(datos)

print("Estado financiero:")
print(df)

total_ing = df[df['Tipo'] == 'Ingreso']['Monto'].sum()
total_gas = df[df['Tipo'] == 'Gasto']['Monto'].sum()
print(f"\nResumen financiero:\nTotal ingresos: \${total_ing}\nTotal gastos: \${total_gas}\nBeneficio neto: \${total_ing - total_gas}")

pivot = df.pivot_table(index='Mes', columns='Tipo', values='Monto', aggfunc='sum')
print("\nAnálisis mensual:")
print(pivot)

pivot['Beneficio_Neto'] = pivot['Ingreso'] - pivot['Gasto']
pivot['Margen'] = ((pivot['Ingreso'] - pivot['Gasto']) / pivot['Ingreso'] * 100).round(1)

print("\nCon márgenes calculados:")
print(pivot)

print(f"\nMargen promedio: {pivot['Margen'].mean():.1f}%")
print(f"Mes con mayor beneficio: {pivot['Beneficio_Neto'].idxmax()}")
print(f"Ingreso promedio mensual: \${pivot['Ingreso'].mean():.0f}")
print(f"Gasto promedio mensual: \${pivot['Gasto'].mean():.0f}")`,
            solutionNote: 'Calculamos ingresos y gastos por mes, el beneficio neto y el margen para obtener KPIs financieros claros.',
            salidaGuiada:
              'Estado financiero:\n      Mes      Tipo  Categoria   Monto\n0  Enero   Ingreso     Ventas   15000\n1  Enero     Gasto Operativos    8000\n2 Febrero  Ingreso     Ventas   18000\n3 Febrero    Gasto Operativos    8500\n4  Marzo   Ingreso     Ventas   22000\n5  Marzo     Gasto Operativos    9000\n\nResumen financiero:\nTotal ingresos: $55000\nTotal gastos: $25500\nBeneficio neto: $29500\n\nAnálisis mensual:\nTipo     Gasto  Ingreso\nMes                     \nEnero     8000    15000\nFebrero   8500    18000\nMarzo     9000    22000\n\nCon márgenes calculados:\nTipo      Gasto  Ingreso  Beneficio_Neto  Margen\nMes                                           \nEnero      8000    15000            7000     46.7\nFebrero    8500    18000            9500     52.8\nMarzo      9000    22000           13000     59.1\n\nKPIs clave:\nMargen promedio: 52.9%\nMes con mayor beneficio: Marzo\nIngreso promedio mensual: $18333\nGasto promedio mensual: $8500',
            executionNote:
              'Debe calcular los resultados financieros por mes y mostrar KPIs de margen, ingreso y gasto.',
            successMessage:
              '¡Perfecto! Ya sabes generar KPIs financieros a partir de datos de Pandas.',
          },
        },
        {
          id: 'pandas-exportacion-reportes',
          title: 'Misión 12: Exportación y proyecto final',
          duration: '25 min',
          xp: 280,
          objective:
            'Aprender a exportar datos y crear reportes automáticos con Pandas.',
          resources: {
            videoTitle: 'Exportando datos y creando reportes con Pandas',
            videoUrl: 'https://www.youtube.com/embed/rrAuN0god_g',
            documentationLinks: [
              {
                label: 'to_csv() method',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html',
              },
              {
                label: 'to_excel() method',
                url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_excel.html',
              },
            ],
            exampleTitle: 'Exportando datos y generando reportes',
            exampleCode: `import pandas as pd

# Crear dataset de análisis de ventas
ventas = {
    'Producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora'],
    'Precio_Venta': [1200, 25, 75, 400, 200],
    'Costo': [1000, 15, 45, 300, 120],
    'Unidades_Vendidas': [45, 120, 85, 35, 25],
    'Categoria': ['Electrónica', 'Accesorio', 'Accesorio', 'Electrónica', 'Oficina']
}

df = pd.DataFrame(ventas)

# Calcular métricas
df['Ganancia_Unitaria'] = df['Precio_Venta'] - df['Costo']
df['Ganancia_Total'] = df['Ganancia_Unitaria'] * df['Unidades_Vendidas']
df['Margen_Ganancia'] = (df['Ganancia_Unitaria'] / df['Precio_Venta'] * 100).round(1)

print("Análisis completo de productos:")
print(df)
print()

# Exportar a CSV
# df.to_csv('analisis_productos.csv', index=False)
print("Datos exportados a CSV (simulado)")

# Crear resumen por categoría
resumen_categoria = df.groupby('Categoria').agg({
    'Unidades_Vendidas': 'sum',
    'Ganancia_Total': 'sum',
    'Precio_Venta': 'mean'
}).round(2)

print("Resumen por categoría:")
print(resumen_categoria)
print()

# Exportar resumen
# resumen_categoria.to_csv('resumen_categoria.csv')
print("Resumen exportado a CSV (simulado)")

# Crear reporte de productos top
productos_top = df.nlargest(3, 'Ganancia_Total')[['Producto', 'Ganancia_Total', 'Margen_Ganancia']]
print("Top 3 productos por ganancia:")
print(productos_top)
print()

# Simular exportación a Excel con múltiples hojas
print("Exportando a Excel con múltiples hojas...")
print("- Hoja 'Datos_Completos': Dataset completo")
print("- Hoja 'Resumen_Categoria': Agrupado por categoría")
print("- Hoja 'Top_Productos': Los 3 mejores productos")

# Crear métricas generales para el reporte
metricas_generales = {
    'Total_Productos': len(df),
    'Total_Unidades': df['Unidades_Vendidas'].sum(),
    'Ingreso_Total': (df['Precio_Venta'] * df['Unidades_Vendidas']).sum(),
    'Ganancia_Total': df['Ganancia_Total'].sum(),
    'Margen_Promedio': df['Margen_Ganancia'].mean(),
    'Producto_Mas_Vendido': df.loc[df['Unidades_Vendidas'].idxmax(), 'Producto'],
    'Producto_Mas_Rentable': df.loc[df['Ganancia_Total'].idxmax(), 'Producto']
}

print("Métricas generales del reporte:")
for metrica, valor in metricas_generales.items():
    if isinstance(valor, float):
        print(f"{metrica}: {valor:.1f}")
    else:
        print(f"{metrica}: {valor}")
`,
            supportNote:
              'to_csv() y to_excel() permiten exportar datos. Es útil crear múltiples dataframes para diferentes hojas de Excel.',
            imageUrl: '',
          },
          instructions: {
            overview:
              'Exportar datos es crucial para compartir análisis. Pandas permite exportar a CSV, Excel y otros formatos.',
            steps: [
              'Usa to_csv() para exportar a CSV',
              'Usa to_excel() para exportar a Excel con múltiples hojas',
              'Crea resúmenes y métricas antes de exportar',
              'Organiza el reporte con diferentes secciones',
            ],
            hint:
              'Para Excel con múltiples hojas, usa pd.ExcelWriter() y especifica sheet_name.',
          },
          challenge: {
            runtimeMode: 'python',
            exerciseType: 'Completar codigo',
            title: 'Crea y exporta un reporte financiero completo',
            prompt:
              'Completa el código para crear un análisis completo y simular su exportación.',
            starterCode: `import pandas as pd

datos = {
    'Producto': ['Laptop Pro', 'Mouse Gamer', 'Teclado Mecánico', 'Monitor 4K', 'Impresora Laser'],
    'Q1_Ventas': [25, 80, 45, 15, 10],
    'Precio_Promedio': [1500, 35, 120, 450, 250],
    'Costo_Promedio': [1200, 20, 80, 350, 150]
}

# 1. Crea 'df'. Calcula Ingreso_Q1, Costo_Q1, Ganancia_Q1 y Margen_Q1 (%).

# 2. Crea un diccionario 'resumen' con los KPIs totales solicitados.

# 3. Ordena los productos por ganancia e imprime la confirmación de exportación de los 3 archivos CSV.
`,
            expectedKeywords: ['to_csv', 'sum', 'mean', 'idxmax'],
            successCriteria:
              'Debe crear análisis completo y simular exportación de múltiples archivos.',
            expectedResult: 'Análisis financiero Q1:\n        Producto  Q1_Ventas  Precio_Promedio  Costo_Promedio  Ingreso_Q1  Costo_Q1  Ganancia_Q1  Margen_Q1\n0  Laptop Pro           25            1500            1200       37500    30000         7500        20.0\n1 Mouse Gamer           80              35              20        2800     1600         1200        42.9\n2 Teclado Mecánico      45             120              80        5400     3600         1800        33.3\n3   Monitor 4K           15             450             350        6750     5250         1500        22.2\n4 Impresora Laser       10             250             150        2500     1500         1000        40.0\n\nResumen ejecutivo Q1:\nTotal_Ingresos: $54,950\nTotal_Costos: $41,950\nTotal_Ganancias: $13,000\nMargen_Promedio: 31.7%\nProducto_Top_Ventas: Mouse Gamer\nProducto_Top_Ganancia: Laptop Pro\n\nProductos ordenados por ganancia:\n        Producto  Ganancia_Q1\n0  Laptop Pro          7500\n2 Teclado Mecánico    1800\n3   Monitor 4K        1500\n1 Mouse Gamer         1200\n4 Impresora Laser     1000\n\n✓ Exportaciones completadas:\n- datos_completos.csv\n- productos_ordenados.csv\n- metricas_ejecutivas.csv',
            solutionCode: `import pandas as pd

datos = {
    'Producto': ['Laptop Pro', 'Mouse Gamer', 'Teclado Mecánico', 'Monitor 4K', 'Impresora Laser'],
    'Q1_Ventas': [25, 80, 45, 15, 10],
    'Precio_Promedio': [1500, 35, 120, 450, 250],
    'Costo_Promedio': [1200, 20, 80, 350, 150]
}
df = pd.DataFrame(datos)

df['Ingreso_Q1'] = df['Q1_Ventas'] * df['Precio_Promedio']
df['Costo_Q1'] = df['Q1_Ventas'] * df['Costo_Promedio']
df['Ganancia_Q1'] = df['Ingreso_Q1'] - df['Costo_Q1']
df['Margen_Q1'] = (df['Ganancia_Q1'] / df['Ingreso_Q1'] * 100).round(1)

print("Análisis financiero Q1:")
print(df)

resumen = {
    'Total_Ingresos': "$" + str(df['Ingreso_Q1'].sum()),
    'Total_Costos': "$" + str(df['Costo_Q1'].sum()),
    'Total_Ganancias': "$" + str(df['Ganancia_Q1'].sum()),
    'Margen_Promedio': str(round(df['Margen_Q1'].mean(), 1)) + "%",
    'Producto_Top_Ventas': df.loc[df['Q1_Ventas'].idxmax(), 'Producto'],
    'Producto_Top_Ganancia': df.loc[df['Ganancia_Q1'].idxmax(), 'Producto']
}

print("\nResumen ejecutivo Q1:")
for k, v in resumen.items(): print(f"{k}: {v}")

print("\nProductos ordenados por ganancia:")
print(df.sort_values('Ganancia_Q1', ascending=False)[['Producto', 'Ganancia_Q1']])

print("\n✓ Exportaciones completadas:")
print("- datos_completos.csv\n- productos_ordenados.csv\n- metricas_ejecutivas.csv")`,
            solutionNote: 'Este ejercicio final integra cálculos, agregaciones y simulación de exportación para un reporte completo.',
            salidaGuiada: 'Análisis financiero Q1:\n        Producto  Q1_Ventas  Precio_Promedio  Costo_Promedio  Ingreso_Q1  Costo_Q1  Ganancia_Q1  Margen_Q1\n0  Laptop Pro           25            1500            1200       37500    30000         7500        20.0\n1 Mouse Gamer           80              35              20        2800     1600         1200        42.9\n2 Teclado Mecánico      45             120              80        5400     3600         1800        33.3\n3   Monitor 4K           15             450             350        6750     5250         1500        22.2\n4 Impresora Laser       10             250             150        2500     1500         1000        40.0\n\nResumen ejecutivo Q1:\nTotal_Ingresos: $54,950\nTotal_Costos: $41,950\nTotal_Ganancias: $13,000\nMargen_Promedio: 31.7%\nProducto_Top_Ventas: Mouse Gamer\nProducto_Top_Ganancia: Laptop Pro\n\nProductos ordenados por ganancia:\n        Producto  Ganancia_Q1\n0  Laptop Pro          7500\n2 Teclado Mecánico    1800\n3   Monitor 4K        1500\n1 Mouse Gamer         1200\n4 Impresora Laser     1000\n\n✓ Exportaciones completadas:\n- datos_completos.csv\n- productos_ordenados.csv\n- metricas_ejecutivas.csv',
            executionNote:
              'Debe mostrar análisis financiero completo y simular exportaciones.',
            successMessage:
              '¡Reporte financiero completo creado! Ahora puedes automatizar análisis y reportes.',
          },
        },
      ],
    },
  ],
}
