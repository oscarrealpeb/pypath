export const cursoPySide6 = {
  id: "pyside6",
  title: "Apps de escritorio con PySide6",
  library: "PySide6",
  requiredCourseIds: ["python-fundamentals"],
  summary: "Construye herramientas de escritorio con widgets, señales y layouts. Es una de las primeras bibliotecas de PyPath para crear aplicaciones reales.",
  difficulty: "Ideal después de Fundamentos",
  units: [
    {
      id: "boot-sequence",
      title: "Secuencia de arranque",
      summary: "Levanta una ventana, conecta un botón y entiende el loop base de la app.",
      lessons: [
        {
          id: "window-boot",
          title: "Misión 01: Lanzar una ventana",
          duration: "8 min",
          xp: 120,
          objective: "Crear una QApplication, una ventana y mostrarla en pantalla.",
          resources: {
            videoTitle: "Primera ventana con PySide6",
            videoUrl: "https://www.youtube.com/embed/oMXOQ8WFbm4",
            documentationLinks: [
              { label: "Quickstart oficial de Qt for Python", url: "https://doc.qt.io/qtforpython-6/quickstart.html" },
              { label: "QWidget en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QWidget.html" }
            ],
            exampleTitle: "Ventana mínima",
            exampleCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Panel inicial")
window.show()
app.exec()
`,
            supportNote: "El punto de arranque de PySide6 siempre tiene el mismo patrón: app, widget visible y event loop."
          },
          instructions: {
            overview: "Toda app en PySide6 comienza con un objeto de aplicación y un widget visible.",
            steps: [
              "Importa QApplication y QWidget desde PySide6.QtWidgets.",
              "Crea la instancia de la app y una ventana base.",
              "Define un título, usa show() y arranca el event loop con app.exec()."
            ],
            hint: "Si la ventana no aparece, revisa que window.show() ocurra antes de app.exec()."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Arranca la primera interfaz",
            prompt: "Completa el starter para que la ventana se muestre y el loop de PySide6 quede corriendo.",
            starterCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Consola PyPath")

# Usa window.show() para mostrar la ventana
# Luego deja app.exec() al final para iniciar el loop

app.exec()
`,
            expectedKeywords: ["QApplication", "QWidget", "show"],
            successCriteria: "Debes mostrar la ventana creada en window antes de iniciar el loop principal con app.exec().",
            expectedResult: "La ventana \"Consola PyPath\" aparece en pantalla y la aplicación queda corriendo.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Consola PyPath")
window.show()
app.exec()
`,
            solutionNote: "La pieza que faltaba era mostrar la ventana con window.show() antes de dejar app.exec().",
            salidaGuiada: "QWidget visible en pantalla. Event loop activo.",
            executionNote: "Aquí usamos una vista guiada porque PySide6 no puede abrir una ventana de escritorio real dentro del navegador.",
            successMessage: "Ventana en línea. Ya construiste el cascarón base de la app y lanzaste el event loop."
          }
        },
        {
          id: "button-signal",
          title: "Misión 02: Conectar un botón",
          duration: "10 min",
          xp: 140,
          objective: "Agregar un botón y conectar su clic con feedback visible.",
          resources: {
            videoTitle: "Conectar botones en PySide6",
            videoUrl: "https://www.youtube.com/embed/T2d88mWUng4",
            documentationLinks: [
              { label: "QPushButton en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QPushButton.html" },
              { label: "Señales y slots en Qt for Python", url: "https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html" }
            ],
            exampleTitle: "Botón conectado",
            exampleCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Iniciar")

def handle_click():
    button.setText("Activo")

button.clicked.connect(handle_click)
button.show()
app.exec()
`,
            supportNote: "clicked.connect(...) es una de las líneas más repetidas cuando empiezas a crear herramientas visuales."
          },
          instructions: {
            overview: "Los widgets se vuelven útiles cuando reaccionan; aquí vas a conectar un botón con un handler.",
            steps: [
              "Crea un QPushButton y define su texto.",
              "Escribe una función que actualice el botón al presionarlo.",
              "Usa clicked.connect(...) para enlazar la señal."
            ],
            hint: "Las señales reciben una referencia a función, así que conecta con button.clicked.connect(handler)."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Haz que el botón responda",
            prompt: "Actualiza el starter para que el botón cambie su texto al hacer clic.",
            starterCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Desplegar misión")

# Define un handler que use button.setText(...)
# Conecta ese handler con button.clicked.connect(...)

button.show()
app.exec()
`,
            expectedKeywords: ["QPushButton", "clicked.connect", "setText"],
            successCriteria: "Debes crear un handler y conectarlo al botón para que cambie su texto al hacer clic.",
            expectedResult: "El botón se muestra, detecta el clic y cambia su texto después de la interacción.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Desplegar misión")

def handle_click():
    button.setText("Misión activa")

button.clicked.connect(handle_click)
button.show()
app.exec()
`,
            solutionNote: "La solución completa necesita un handler real y la conexión button.clicked.connect(...) para que el botón reaccione.",
            salidaGuiada: "Botón renderizado. Clic detectado. Texto actualizado.",
            executionNote: "Aquí revisamos la estructura porque la señal y el cambio visual pertenecen a una interfaz de escritorio.",
            successMessage: "Señal enlazada. Tu botón ya reacciona como un control real de UI."
          }
        }
      ]
    },
    {
      id: "signal-hub",
      title: "Centro de señales",
      summary: "Practica slots, entrada de texto y cambios de estado disparados por eventos.",
      lessons: [
        {
          id: "title-updater",
          title: "Misión 03: Actualizar el título",
          duration: "12 min",
          xp: 160,
          objective: "Usar un clic para llamar un slot personalizado y actualizar el título de la ventana.",
          resources: {
            videoTitle: "clicked.connect y handlers en PySide6",
            videoUrl: "https://www.youtube.com/embed/T2d88mWUng4",
            documentationLinks: [
              { label: "Señales y slots", url: "https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html" },
              { label: "QWidget y setWindowTitle", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QWidget.html" }
            ],
            exampleTitle: "Slot básico",
            exampleCode: `from PySide6.QtWidgets import QApplication, QPushButton, QWidget

app = QApplication([])
window = QWidget()
button = QPushButton("Renombrar ventana", window)

def handle_click():
    window.setWindowTitle("Activo")

button.clicked.connect(handle_click)
window.show()
app.exec()
`,
            supportNote: "Separar el handler de la configuración del widget mejora mucho la lectura del código."
          },
          instructions: {
            overview: "Los slots son funciones normales de Python que reaccionan a señales.",
            steps: [
              "Crea una ventana y un botón.",
              "Define handle_click() y cambia el título dentro del slot.",
              "Conecta el botón con clicked.connect(handle_click)."
            ],
            hint: "Mantén el handler fuera de la configuración del botón para que la conexión se lea mejor."
          },
          challenge: {
            exerciseType: "Detección de bug",
            title: "Convierte clics en estado de UI",
            prompt: "Agrega un handler que actualice el título de la ventana cuando se presione el botón.",
            starterCode: `from PySide6.QtWidgets import QApplication, QPushButton, QWidget

app = QApplication([])
window = QWidget()
button = QPushButton("Renombrar ventana", window)
window.setWindowTitle("En espera...")

# Define handle_click() para cambiar el título de la ventana
# Luego conecta button.clicked.connect(handle_click)

window.show()
app.exec()
`,
            expectedKeywords: ["def handle_click", "clicked.connect", "setWindowTitle"],
            successCriteria: "Debes definir un slot llamado handle_click y usarlo para actualizar el título de la ventana al presionar el botón.",
            expectedResult: "Al hacer clic, la ventana deja \"En espera...\" y cambia a un nuevo título visible.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QPushButton, QWidget

app = QApplication([])
window = QWidget()
button = QPushButton("Renombrar ventana", window)
window.setWindowTitle("En espera...")

def handle_click():
    window.setWindowTitle("Activo")

button.clicked.connect(handle_click)
window.show()
app.exec()
`,
            solutionNote: "El slot handle_click encapsula el cambio de estado y luego se enlaza al clic del botón.",
            salidaGuiada: "Ventana detectada. Evento conectado. Título actualizado a \"Activo\".",
            executionNote: "La guía confirma la secuencia importante: evento, handler y cambio visible en la interfaz.",
            successMessage: "Slot activo. Convertiste un evento de clic en un cambio visible dentro de la app."
          }
        },
        {
          id: "line-edit-sync",
          title: "Misión 04: Sincronizar entrada",
          duration: "12 min",
          xp: 170,
          objective: "Escuchar entrada de texto y usarla para actualizar la UI en vivo.",
          resources: {
            videoTitle: "QLineEdit en PySide6",
            videoUrl: "https://www.youtube.com/embed/4qwkXXAWvHE",
            documentationLinks: [
              { label: "QLineEdit en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html" },
              { label: "Más sobre señales de widgets", url: "https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html" }
            ],
            exampleTitle: "Entrada reactiva",
            exampleCode: `from PySide6.QtWidgets import QApplication, QLineEdit, QWidget

app = QApplication([])
window = QWidget()
field = QLineEdit(window)
field.setPlaceholderText("Escribe tu nombre")

def sync_title(text):
    window.setWindowTitle(text)

field.textChanged.connect(sync_title)
window.show()
app.exec()
`,
            supportNote: "Los formularios y mini herramientas internas se sienten mucho mejor cuando la UI responde al texto de inmediato."
          },
          instructions: {
            overview: "Los widgets de texto habilitan interfaces más dinámicas. Aquí aparece QLineEdit.",
            steps: [
              "Crea un QLineEdit y define un placeholder.",
              "Agrega una actualización de etiqueta o ventana dentro de un handler.",
              "Conecta el campo con textChanged.connect(...)."
            ],
            hint: "El placeholder ayuda mucho en versiones tempranas porque guía sin recargar la interfaz."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Reflejar el texto escrito",
            prompt: "Completa el starter para crear un QLineEdit, asignar su placeholder y conectar cambios de texto.",
            starterCode: `from PySide6.QtWidgets import QApplication, QLineEdit, QWidget

app = QApplication([])
window = QWidget()
field = QLineEdit(window)

# Usa field.setPlaceholderText("Escribe tu nombre")
# Luego conecta field.textChanged a un handler

window.show()
app.exec()
`,
            expectedKeywords: ["QLineEdit", "setPlaceholderText", "textChanged.connect"],
            successCriteria: "Debes agregar un placeholder al campo y conectar textChanged a un handler que responda al texto escrito.",
            expectedResult: "El campo muestra una ayuda inicial y queda enlazado para reaccionar cuando el usuario escriba.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QLineEdit, QWidget

app = QApplication([])
window = QWidget()
field = QLineEdit(window)
field.setPlaceholderText("Escribe tu nombre")

def sync_title(text):
    window.setWindowTitle(text)

field.textChanged.connect(sync_title)
window.show()
app.exec()
`,
            solutionNote: "Aquí se resuelven las dos partes del reto: el placeholder orienta al usuario y textChanged.connect(...) enlaza el campo con el handler.",
            salidaGuiada: "Campo detectado. Placeholder aplicado. Cambios de texto enlazados.",
            executionNote: "La misión se revisa de forma guiada porque el cambio real ocurre dentro de una interfaz PySide6.",
            successMessage: "Entrada conectada. Ahora puedes reaccionar al texto mientras se escribe."
          }
        }
      ]
    },
    {
      id: "layout-lab",
      title: "Laboratorio de layouts",
      summary: "Organiza widgets con layouts para que la interfaz escale con orden.",
      lessons: [
        {
          id: "vertical-layout",
          title: "Misión 05: Apilar widgets",
          duration: "14 min",
          xp: 180,
          objective: "Usar QVBoxLayout para ordenar varios widgets en un flujo vertical.",
          resources: {
            videoTitle: "Layouts para ordenar widgets",
            videoUrl: "https://www.youtube.com/embed/6vdV-vQcffQ",
            documentationLinks: [
              { label: "QVBoxLayout en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QVBoxLayout.html" },
              { label: "Gestión de layouts", url: "https://doc.qt.io/qtforpython-6/overviews/qtwidgets-layout.html" }
            ],
            exampleTitle: "Flujo vertical",
            exampleCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
layout = QVBoxLayout()
layout.addWidget(QLabel("Estado: listo"))
layout.addWidget(QPushButton("Ejecutar"))
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "Los layouts te permiten pensar en jerarquía de UI y no en posiciones sueltas."
          },
          instructions: {
            overview: "Los layouts permiten escalar una interfaz sin posicionar todo a mano.",
            steps: [
              "Crea un QVBoxLayout.",
              "Usa addWidget(...) para colocar la etiqueta y el botón.",
              "Adjunta el layout a la ventana con setLayout(...)."
            ],
            hint: "Si un widget no aparece donde esperabas, revisa si el layout realmente se asignó a la ventana."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Construir un flujo vertical limpio",
            prompt: "Organiza los widgets en un QVBoxLayout y conecta ese layout a la ventana.",
            starterCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Estado: listo")
button = QPushButton("Ejecutar chequeo")
layout = QVBoxLayout()

# Usa layout.addWidget(label) y layout.addWidget(button)
# Luego conecta todo con window.setLayout(layout)

window.show()
app.exec()
`,
            expectedKeywords: ["QVBoxLayout", "addWidget", "setLayout"],
            successCriteria: "Debes añadir la etiqueta y el botón al layout vertical y después asignar ese layout a la ventana.",
            expectedResult: "La interfaz queda ordenada en vertical con los widgets visibles dentro de la ventana.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Estado: listo")
button = QPushButton("Ejecutar chequeo")
layout = QVBoxLayout()

layout.addWidget(label)
layout.addWidget(button)
window.setLayout(layout)

window.show()
app.exec()
`,
            solutionNote: "La clave es agregar cada widget al QVBoxLayout y luego asignar ese layout completo a la ventana con setLayout(...).",
            salidaGuiada: "Layout vertical creado. Widgets agregados. Ventana organizada.",
            executionNote: "La revisión guiada resume el objetivo visual de la misión: widgets bien apilados y conectados al layout.",
            successMessage: "Layout estable. Tus widgets ya escalan dentro de una estructura vertical predecible."
          }
        },
        {
          id: "toolbar-layout",
          title: "Misión 06: Construir una mini barra",
          duration: "15 min",
          xp: 210,
          objective: "Combinar etiquetas y botones dentro de un layout horizontal para una barra compacta.",
          resources: {
            videoTitle: "Layouts horizontales para barras compactas",
            videoUrl: "https://www.youtube.com/embed/6vdV-vQcffQ",
            documentationLinks: [
              { label: "QHBoxLayout en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QHBoxLayout.html" },
              { label: "QLabel en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLabel.html" }
            ],
            exampleTitle: "Barra horizontal",
            exampleCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
layout = QHBoxLayout()
layout.addWidget(QLabel("Centro de misión"))
layout.addWidget(QPushButton("Lanzar"))
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "Las barras compactas son útiles para acciones de panel, filtros y estados rápidos."
          },
          instructions: {
            overview: "Los layouts horizontales son ideales para controles compactos, headers y barras de acciones.",
            steps: [
              "Crea un QHBoxLayout para la fila.",
              "Agrega un QLabel y al menos un QPushButton.",
              "Adjunta el layout a la ventana para que la barra se renderice bien."
            ],
            hint: "Una barra funciona mejor cuando cada widget tiene un rol claro: estado visible y acciones concretas."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Ensamblar la barra horizontal",
            prompt: "Crea una barra horizontal usando una etiqueta y botones, y montala en la ventana.",
            starterCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
title = QLabel("Centro de misión")
launch_button = QPushButton("Lanzar")
layout = QHBoxLayout()

# Usa layout.addWidget(title) y layout.addWidget(launch_button)
# Después conecta ese layout a la ventana con setLayout(...)

window.show()
app.exec()
`,
            expectedKeywords: ["QHBoxLayout", "QLabel", "QPushButton"],
            successCriteria: "Debes añadir la etiqueta y el botón a un QHBoxLayout y montar esa barra dentro de la ventana.",
            expectedResult: "La ventana muestra una barra horizontal compacta con una etiqueta y un botón alineados.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
title = QLabel("Centro de misión")
launch_button = QPushButton("Lanzar")
layout = QHBoxLayout()

layout.addWidget(title)
layout.addWidget(launch_button)
window.setLayout(layout)

window.show()
app.exec()
`,
            solutionNote: "La barra se construye añadiendo ambos widgets al QHBoxLayout y montándolo después sobre la ventana.",
            salidaGuiada: "Barra horizontal lista. Controles visibles y alineados.",
            executionNote: "Aquí la vista previa resume el resultado esperado, porque la barra pertenece a una UI de escritorio.",
            successMessage: "Barra desplegada. Ya tienes patrones base para construir interfaces tipo panel."
          }
        }
      ]
    },
    {
      id: "widget-library",
      title: "Biblioteca de widgets",
      summary: "Conoce widgets comunes como etiquetas, campos y tablas para interfaces completas.",
      lessons: [
        {
          id: "form-widget",
          title: "Misión 07: Formularios simples",
          duration: "14 min",
          xp: 190,
          objective: "Usar QLabel y QLineEdit para diseñar un formulario de entrada básico.",
          resources: {
            videoTitle: "Widgets de formulario en PySide6",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QLabel en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLabel.html" },
              { label: "QLineEdit en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html" }
            ],
            exampleTitle: "Formulario básico",
            exampleCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
layout = QVBoxLayout()
layout.addWidget(QLabel("Nombre:"))
layout.addWidget(QLineEdit())
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "Los formularios son un buen paso intermedio entre un botón y una aplicación real de escritorio."
          },
          instructions: {
            overview: "Aprende a combinar etiquetas y campos de texto para capturar información.",
            steps: [
              "Crea un QLabel y un QLineEdit.",
              "Colócalos dentro de un layout vertical.",
              "Muestra la ventana y comprueba que el formulario se vea alineado."
            ],
            hint: "El orden en el layout define cómo se presenta el formulario."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Armar un formulario",
            prompt: "Crea un formulario con un QLabel y un QLineEdit dentro de un layout.",
            starterCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
layout = QVBoxLayout()

# Agrega el QLabel y el QLineEdit al layout

window.setLayout(layout)
window.show()
app.exec()
`,
            expectedKeywords: ["QLabel", "QLineEdit", "QVBoxLayout"],
            successCriteria: "Debes añadir una etiqueta y un campo de texto al layout, y después asignar el layout a la ventana.",
            expectedResult: "Se presenta un formulario simple con label y campo alineados en vertical.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
layout = QVBoxLayout()
layout.addWidget(QLabel("Nombre:"))
layout.addWidget(QLineEdit())
window.setLayout(layout)
window.show()
app.exec()
`,
            solutionNote: "El formulario básico se vuelve visible cuando el layout y los widgets están correctamente conectados.",
            salidaGuiada: "Formulario alineado. Etiqueta y campo listos para escribir.",
            executionNote: "La revisión comprueba que el formulario sea funcional y visualmente ordenado.",
            successMessage: "Formulario inicial listo. Ya puedes capturar texto en tu interfaz."
          }
        },
        {
          id: "table-widget",
          title: "Misión 08: Vista de datos",
          duration: "16 min",
          xp: 200,
          objective: "Mostrar datos estructurados usando un widget de tabla simple.",
          resources: {
            videoTitle: "Tablas con PySide6",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QTableWidget en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTableWidget.html" },
              { label: "QTableWidgetItem en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTableWidgetItem.html" }
            ],
            exampleTitle: "Tabla simple",
            exampleCode: `from PySide6.QtWidgets import QApplication, QTableWidget, QTableWidgetItem

app = QApplication([])
table = QTableWidget(2, 2)
table.setHorizontalHeaderLabels(["Nombre", "Estado"])
table.setItem(0, 0, QTableWidgetItem("Proyecto"))
table.setItem(0, 1, QTableWidgetItem("Listo"))
table.show()
app.exec()
`,
            supportNote: "Las tablas son útiles para mostrar datos estructurados en herramientas administrativas y paneles."
          },
          instructions: {
            overview: "Aprende a construir una tabla básica y rellenarla con datos.",
            steps: [
              "Crea un QTableWidget con filas y columnas.",
              "Define encabezados y crea QTableWidgetItem para las celdas.",
              "Muestra la tabla en pantalla."
            ],
            hint: "No olvides usar setHorizontalHeaderLabels para que la tabla sea legible."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Mostrar datos en tabla",
            prompt: "Crea una tabla con dos columnas y llena la primera fila con datos de ejemplo.",
            starterCode: `from PySide6.QtWidgets import QApplication, QTableWidget, QTableWidgetItem

app = QApplication([])
table = QTableWidget(2, 2)

# Define encabezados y completa la primera fila con datos

table.show()
app.exec()
`,
            expectedKeywords: ["QTableWidget", "setHorizontalHeaderLabels", "QTableWidgetItem"],
            successCriteria: "Debes crear una tabla con encabezados y una fila de datos visible.",
            expectedResult: "Una tabla aparece con columnas y al menos una fila rellenada.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QTableWidget, QTableWidgetItem

app = QApplication([])
table = QTableWidget(2, 2)
table.setHorizontalHeaderLabels(["Nombre", "Estado"])
table.setItem(0, 0, QTableWidgetItem("Proyecto"))
table.setItem(0, 1, QTableWidgetItem("Listo"))
table.show()
app.exec()
`,
            solutionNote: "La tabla se completa con QTableWidgetItem en cada celda y se muestran los encabezados para claridad.",
            salidaGuiada: "Tabla renderizada. Datos visibles en la primera fila.",
            executionNote: "Esta misión se revisa por la estructura de la tabla y la correcta asignación de valores.",
            successMessage: "Tabla creada. Ya sabes mostrar datos en una interfaz de PySide6."
          }
        }
      ]
    },
    {
      id: "state-management",
      title: "Gestión de estado",
      summary: "Aprende a mantener y compartir el estado dentro de la app de escritorio.",
      lessons: [
        {
          id: "toggle-state",
          title: "Misión 09: Alternar estado",
          duration: "14 min",
          xp: 190,
          objective: "Crear un control que cambie su estado visible y preserve la elección.",
          resources: {
            videoTitle: "Estado en interfaces de escritorio",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QPushButton en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QPushButton.html" },
              { label: "QLabel en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLabel.html" }
            ],
            exampleTitle: "Botón de estado",
            exampleCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Estado: apagado")
button = QPushButton("Cambiar estado")

is_on = False

def toggle():
    global is_on
    is_on = not is_on
    label.setText("Estado: encendido" if is_on else "Estado: apagado")

button.clicked.connect(toggle)
layout = QVBoxLayout()
layout.addWidget(label)
layout.addWidget(button)
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "El estado local se suele almacenar en una variable y actualizar la UI cuando cambia."
          },
          instructions: {
            overview: "Construye un switch interno que actualice texto cuando cambia el estado.",
            steps: [
              "Crea una etiqueta y un botón.",
              "Define una variable de estado y un handler.",
              "Actualiza la etiqueta desde el handler."
            ],
            hint: "El estado puede ser booleano y la etiqueta debe reflejar los cambios."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Crear un toggle de estado",
            prompt: "Agrega un handler que cambie una etiqueta entre \"encendido\" y \"apagado\" al hacer clic.",
            starterCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Estado: apagado")
button = QPushButton("Cambiar estado")

# Define la variable de estado y un handler

button.clicked.connect(toggle)
layout = QVBoxLayout()
layout.addWidget(label)
layout.addWidget(button)
window.setLayout(layout)
window.show()
app.exec()
`,
            expectedKeywords: ["label.setText", "clicked.connect", "toggle"],
            successCriteria: "Debes alternar el texto de la etiqueta cada vez que el usuario presiona el botón.",
            expectedResult: "El botón cambia el estado visible entre \"encendido\" y \"apagado\".",
            solutionCode: `from PySide6.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Estado: apagado")
button = QPushButton("Cambiar estado")

is_on = False

def toggle():
    global is_on
    is_on = not is_on
    label.setText("Estado: encendido" if is_on else "Estado: apagado")

button.clicked.connect(toggle)
layout = QVBoxLayout()
layout.addWidget(label)
layout.addWidget(button)
window.setLayout(layout)
window.show()
app.exec()
`,
            solutionNote: "La clave es mantener una variable de estado y actualizar la etiqueta desde el handler.",
            salidaGuiada: "Mensaje de estado alternado. Clic detectado y texto actualizado.",
            executionNote: "Esta lección se enfoca en la gestión simple de estado dentro de la UI.",
            successMessage: "Estado alternado. Ya sabes cómo hacer que tu app reaccione a cambios internos."
          }
        },
        {
          id: "shared-state",
          title: "Misión 10: Compartir estado",
          duration: "16 min",
          xp: 210,
          objective: "Sincronizar contenido entre dos controles en la misma ventana.",
          resources: {
            videoTitle: "Compartir estado entre widgets",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QLineEdit en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html" },
              { label: "QLabel en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLabel.html" }
            ],
            exampleTitle: "Sincronizar controles",
            exampleCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Escribe algo")
input_field = QLineEdit()

def update_label(text):
    label.setText(text)

input_field.textChanged.connect(update_label)
layout = QVBoxLayout()
layout.addWidget(input_field)
layout.addWidget(label)
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "Compartir estado entre widgets es fundamental para interfaces coherentes."
          },
          instructions: {
            overview: "Muestra cómo un cambio en un widget actualiza otro widget en vivo.",
            steps: [
              "Crea un QLineEdit y un QLabel.",
              "Define un handler que copie el texto del campo a la etiqueta.",
              "Conecta textChanged con el handler."
            ],
            hint: "textChanged te permite reaccionar a cada caracter ingresado."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Sincronizar dos widgets",
            prompt: "Conecta un QLineEdit y un QLabel para que el texto del campo se vea reflejado en la etiqueta.",
            starterCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Escribe algo")
input_field = QLineEdit()

# Define update_label

input_field.textChanged.connect(update_label)
layout = QVBoxLayout()
layout.addWidget(input_field)
layout.addWidget(label)
window.setLayout(layout)
window.show()
app.exec()
`,
            expectedKeywords: ["textChanged.connect", "update_label", "setText"],
            successCriteria: "Debes reflejar el texto ingresado en el campo dentro de la etiqueta en tiempo real.",
            expectedResult: "La etiqueta cambia a medida que escribes en el campo de texto.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QLabel, QLineEdit, QVBoxLayout, QWidget

app = QApplication([])
window = QWidget()
label = QLabel("Escribe algo")
input_field = QLineEdit()

def update_label(text):
    label.setText(text)

input_field.textChanged.connect(update_label)
layout = QVBoxLayout()
layout.addWidget(input_field)
layout.addWidget(label)
window.setLayout(layout)
window.show()
app.exec()
`,
            solutionNote: "La sincronización en vivo permite interfaces más fluidas y amigables para el usuario.",
            salidaGuiada: "Texto reflejado en la etiqueta. Sincronización activa.",
            executionNote: "Esta lección consolida la idea de estado compartido en una sola ventana.",
            successMessage: "Estado compartido. Ya sabes conectar widgets para mantener la UI coherente."
          }
        }
      ]
    },
    {
      id: "dialogs-notifications",
      title: "Diálogos y notificaciones",
      summary: "Agrega ventanas modales, mensajes de confirmación y alertas al flujo de tu app.",
      lessons: [
        {
          id: "message-dialog",
          title: "Misión 11: Ventana de mensaje",
          duration: "15 min",
          xp: 220,
          objective: "Mostrar un diálogo de información usando QMessageBox.",
          resources: {
            videoTitle: "Diálogos con PySide6",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QMessageBox en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QMessageBox.html" }
            ],
            exampleTitle: "Dialogo informativo",
            exampleCode: `from PySide6.QtWidgets import QApplication, QMessageBox

app = QApplication([])
msg = QMessageBox()
msg.setText("Operación completada")
msg.exec()
`,
            supportNote: "Los diálogos son ideales para dar feedback inmediato sin cambiar la ventana principal."
          },
          instructions: {
            overview: "Aprende a generar un mensaje modal para informar al usuario.",
            steps: [
              "Crea una instancia de QMessageBox.",
              "Define el texto del mensaje.",
              "Ejecuta el diálogo con exec()."
            ],
            hint: "Los mensajes modales detienen el flujo hasta que el usuario cierra el diálogo."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Mostrar un diálogo de información",
            prompt: "Completa el código para mostrar un QMessageBox con un mensaje de éxito.",
            starterCode: `from PySide6.QtWidgets import QApplication, QMessageBox

app = QApplication([])
msg = QMessageBox()

# Define el texto del mensaje

msg.exec()
`,
            expectedKeywords: ["QMessageBox", "setText", "exec"],
            successCriteria: "Debes mostrar un diálogo modal con un texto visible.",
            expectedResult: "Aparece un mensaje modal con el texto definido y cierra al pulsar aceptar.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QMessageBox

app = QApplication([])
msg = QMessageBox()
msg.setText("Operación completada")
msg.exec()
`,
            solutionNote: "El diálogo se muestra correctamente cuando se define el texto y se ejecuta exec().",
            salidaGuiada: "Diálogo abierto. Usuario lo cierra manualmente.",
            executionNote: "Esta lección se enfoca en notificaciones modales, no en widgets persistentes.",
            successMessage: "Diálogo mostrado. Ya sabes cómo informar al usuario con QMessageBox."
          }
        },
        {
          id: "progress-dialog",
          title: "Misión 12: Barra de progreso",
          duration: "16 min",
          xp: 230,
          objective: "Mostrar una barra de progreso que simule una tarea en curso.",
          resources: {
            videoTitle: "Progreso y estado en la UI",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "QProgressBar en la documentacion oficial", url: "https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QProgressBar.html" }
            ],
            exampleTitle: "Barra de progreso",
            exampleCode: `from PySide6.QtWidgets import QApplication, QProgressBar, QWidget, QVBoxLayout

app = QApplication([])
window = QWidget()
progress = QProgressBar()
progress.setValue(50)
layout = QVBoxLayout()
layout.addWidget(progress)
window.setLayout(layout)
window.show()
app.exec()
`,
            supportNote: "Las barras de progreso mejoran la percepción de calidad y control de la aplicación."
          },
          instructions: {
            overview: "Usa QProgressBar para mostrar un estado parcial de una tarea.",
            steps: [
              "Crea un QProgressBar.",
              "Asigna un valor numérico con setValue().", 
              "Muestra el widget dentro de una ventana."
            ],
            hint: "Un valor entre 0 y 100 es suficiente para simular progreso."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Mostrar progreso parcial",
            prompt: "Crea una ventana con una QProgressBar al 70% de avance.",
            starterCode: `from PySide6.QtWidgets import QApplication, QProgressBar, QWidget, QVBoxLayout

app = QApplication([])
window = QWidget()
progress = QProgressBar()

# Asigna un valor de progreso y muestra la ventana

window.show()
app.exec()
`,
            expectedKeywords: ["QProgressBar", "setValue", "QVBoxLayout"],
            successCriteria: "Debes presentar una barra de progreso visible con un valor intermedio.",
            expectedResult: "La ventana muestra una barra de progreso cargada al 70%.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QProgressBar, QWidget, QVBoxLayout

app = QApplication([])
window = QWidget()
progress = QProgressBar()
progress.setValue(70)
layout = QVBoxLayout()
layout.addWidget(progress)
window.setLayout(layout)
window.show()
app.exec()
`,
            solutionNote: "El progreso se define con setValue() y se muestra en un layout estándar.",
            salidaGuiada: "Barra de progreso visible al 70%.",
            executionNote: "La misión comprueba la presentación de estado activo en la UI.",
            successMessage: "Progreso mostrado. Ya sabes indicar estados intermedios al usuario."
          }
        }
      ]
    },
    {
      id: "advanced-ux",
      title: "UX avanzada",
      summary: "Mejora la experiencia con estilos, agrupación de controles y manejo de iconos.",
      lessons: [
        {
          id: "custom-styles",
          title: "Misión 13: Estilos personalizados",
          duration: "15 min",
          xp: 220,
          objective: "Aplicar estilos a widgets con setStyleSheet para mejorar la apariencia.",
          resources: {
            videoTitle: "Estilos en PySide6",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "Qt Style Sheets", url: "https://doc.qt.io/qtforpython/overviews/stylesheet.html" }
            ],
            exampleTitle: "Estilo con setStyleSheet",
            exampleCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Acción")
button.setStyleSheet("background-color: #5B8DEF; color: white; padding: 10px;")
button.show()
app.exec()
`,
            supportNote: "Los estilos CSS simples pueden transformar la apariencia sin cambiar la lógica."
          },
          instructions: {
            overview: "Usa setStyleSheet para aplicar colores y márgenes a widgets simples.",
            steps: [
              "Crea un widget que quieras estilizar.",
              "Define una cadena CSS corta.",
              "Aplica el estilo con setStyleSheet()."
            ],
            hint: "Puedes aplicar color de fondo y padding para distinguir botones."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Dale estilo a tu botón",
            prompt: "Agrega un setStyleSheet que haga el botón más atractivo visualmente.",
            starterCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Listo")

# Aplica estilos con setStyleSheet

button.show()
app.exec()
`,
            expectedKeywords: ["setStyleSheet", "background-color", "padding"],
            successCriteria: "Debes aplicar estilos de color y espaciado visibles en el botón.",
            expectedResult: "El botón muestra un estilo personalizado y más moderno.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Listo")
button.setStyleSheet("background-color: #5B8DEF; color: white; padding: 12px; border-radius: 8px;")
button.show()
app.exec()
`,
            solutionNote: "Los estilos CSS permiten una apariencia más limpia y profesional sin cambiar la lógica del widget.",
            salidaGuiada: "Botón estilizado y más visible.",
            executionNote: "Esta misión se enfoca en UX visual más que en comportamiento funcional.",
            successMessage: "Botón estilizado. Ya conoces cómo mejorar la apariencia de tus widgets."
          }
        },
        {
          id: "responsive-layout",
          title: "Misión 14: Layouts flexibles",
          duration: "17 min",
          xp: 240,
          objective: "Combinar layouts verticales y horizontales para crear una interfaz más flexible.",
          resources: {
            videoTitle: "Layouts flexibles en PySide6",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "Layouts anidados", url: "https://doc.qt.io/qtforpython-6/topics/layouts.html" }
            ],
            exampleTitle: "Interfaz mixta",
            exampleCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QVBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
main_layout = QVBoxLayout()
row = QHBoxLayout()
row.addWidget(QLabel("Usuario:"))
row.addWidget(QPushButton("Editar"))
main_layout.addLayout(row)
window.setLayout(main_layout)
window.show()
app.exec()
`,
            supportNote: "Los layouts anidados son la base de interfaces complejas pero bien organizadas."
          },
          instructions: {
            overview: "Crea una estructura de layout que combine filas y columnas para una UI más rica.",
            steps: [
              "Crea un layout vertical principal.",
              "Anida un layout horizontal dentro de él.",
              "Agrega widgets a ambos niveles y muestra la ventana."
            ],
            hint: "Un layout horizontal dentro de uno vertical te da mayor control de diseño."
          },
          challenge: {
            exerciseType: "Completar código",
            title: "Anidar layouts",
            prompt: "Construye una UI con un layout vertical principal y una fila horizontal dentro.",
            starterCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QVBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
main_layout = QVBoxLayout()
row = QHBoxLayout()

# agrega widgets a row y anida row dentro de main_layout

window.setLayout(main_layout)
window.show()
app.exec()
`,
            expectedKeywords: ["QHBoxLayout", "QVBoxLayout", "addLayout"],
            successCriteria: "Debes anidar correctamente un layout horizontal dentro de un layout vertical.",
            expectedResult: "La interfaz muestra una fila de widgets dentro de una columna principal.",
            solutionCode: `from PySide6.QtWidgets import QApplication, QHBoxLayout, QVBoxLayout, QLabel, QPushButton, QWidget

app = QApplication([])
window = QWidget()
main_layout = QVBoxLayout()
row = QHBoxLayout()
row.addWidget(QLabel("Usuario:"))
row.addWidget(QPushButton("Editar"))
main_layout.addLayout(row)
window.setLayout(main_layout)
window.show()
app.exec()
`,
            solutionNote: "Los layouts anidados permiten construir interfaces adaptables y más profesionales.",
            salidaGuiada: "Fila dentro de columna creada. Layouts anidados correctos.",
            executionNote: "Esta misión solidifica el uso combinado de varios layouts.",
            successMessage: "Layout flexible listo. Ya sabes combinar filas y columnas en PySide6."
          }
        }
      ]
    },
    {
      id: "deployment-tools",
      title: "Cierre del proyecto",
      summary: "Empaqueta tu aplicación y revisa buenas prácticas para entregar un proyecto robusto.",
      lessons: [
        {
          id: "app-packaging",
          title: "Misión 15: Empaquetar la app",
          duration: "16 min",
          xp: 250,
          objective: "Revisar las opciones para distribuir una app PySide6 como ejecutable.",
          resources: {
            videoTitle: "Empaquetado de aplicaciones Python",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "PyInstaller en la documentacion oficial", url: "https://pyinstaller.org/en/stable/" }
            ],
            exampleTitle: "Empaquetado básico",
            exampleCode: `# Ejemplo de comando
pyinstaller --onefile main.py
`,
            supportNote: "Este paso es más de consolidación de aprendizaje: cómo llevar la app a usuarios reales."
          },
          instructions: {
            overview: "Conoce el proceso de generar un ejecutable a partir de tu proyecto PySide6.",
            steps: [
              "Revisa las dependencias necesarias para PySide6.",
              "Elige una herramienta de empaquetado como PyInstaller.",
              "Prepara el script principal y ejecuta el comando de empaquetado."
            ],
            hint: "El archivo principal debe importarse sin errores antes de generar el ejecutable."
          },
          challenge: {
            exerciseType: "Lectura guiada",
            title: "Revisa el empaquetado",
            prompt: "Describe qué comando usarías para generar un ejecutable de una aplicación PySide6.",
            starterCode: "",
            expectedKeywords: ["pyinstaller", "--onefile", "main.py"],
            successCriteria: "Debes mencionar al menos PyInstaller y el flag --onefile.",
            expectedResult: "Identificas el comando correcto para empaquetar la app.",
            solutionCode: "",
            solutionNote: "PyInstaller es una herramienta común para convertir scripts PySide6 en ejecutables.",
            salidaGuiada: "Comando correcto con --onefile y el script principal.",
            executionNote: "Esta misión se lee como teoría práctica, no como código ejecutable dentro del navegador.",
            successMessage: "Concepto de empaquetado claro. Sabes cómo llevar tu app a usuarios."
          }
        },
        {
          id: "build-automation",
          title: "Misión 16: Automatizar el flujo",
          duration: "18 min",
          xp: 260,
          objective: "Definir un checklist de lanzamiento para pruebas, empaquetado y documentación.",
          resources: {
            videoTitle: "Buenas prácticas de entrega",
            videoUrl: "https://www.youtube.com/embed/dummy",
            documentationLinks: [
              { label: "Checklist de lanzamiento", url: "https://www.jetbrains.com/help/pycharm/deploying-applications.html" }
            ],
            exampleTitle: "Checklist de entrega",
            exampleCode: `# Ejemplo de checklist
# 1. Probar funcionalidades
# 2. Empaquetar con PyInstaller
# 3. Documentar las dependencias
`,
            supportNote: "Un buen cierre de curso muestra cómo poner en producción lo aprendido."
          },
          instructions: {
            overview: "Piensa en los pasos necesarios para publicar una app de escritorio usable.",
            steps: [
              "Define pruebas básicas para la app.",
              "Incluye el proceso de empaquetado.",
              "Prepara la documentación de instalación."
            ],
            hint: "Un checklist breve suele ser más efectivo que uno demasiado detallado."
          },
          challenge: {
            exerciseType: "Lectura guiada",
            title: "Define tu cierre de curso",
            prompt: "Escribe los tres pasos principales para lanzar una app PySide6.",
            starterCode: "",
            expectedKeywords: ["probar", "empaquetar", "documentar"],
            successCriteria: "Debes identificar pruebas, empaquetado y documentación como pasos clave.",
            expectedResult: "Tienes un esquema claro para cerrar y lanzar el proyecto.",
            solutionCode: "",
            solutionNote: "El cierre del curso no es solo código: también es preparar una entrega profesional.",
            salidaGuiada: "Checklist con pruebas, empaquetado y documentación.",
            executionNote: "Esta misión es de consolidación conceptual más que de código.",
            successMessage: "Cierre listo. Ya tienes un plan para entregar la app."
          }
        }
      ]
    }
  ]
}
