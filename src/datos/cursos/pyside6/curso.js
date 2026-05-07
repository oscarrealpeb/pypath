export const cursoPySide6 = {
  id: 'pyside6',
  title: 'Apps de escritorio con PySide6',
  library: 'PySide6',
  requiredCourseIds: [
    'python-fundamentals'
  ],
  summary: 'Construye herramientas de escritorio con widgets, señales y layouts. Es una de las primeras bibliotecas de PyPath para crear aplicaciones reales.',
  difficulty: 'Ideal después de Fundamentos',
  units: [
    {
      id: 'boot-sequence',
      title: 'Secuencia de arranque',
      summary: 'Levanta una ventana, conecta un botón y entiende el loop base de la app.',
      lessons: [
        {
          id: 'window-boot',
          title: 'Misión 01: Lanzar una ventana',
          duration: '8 min',
          xp: 120,
          objective: 'Crear una QApplication, una ventana y mostrarla en pantalla.',
          resources: {
            videoTitle: 'Primera ventana con PySide6',
            videoUrl: 'https://www.youtube.com/embed/oMXOQ8WFbm4',
            documentationLinks: [
              {
                label: 'Quickstart oficial de Qt for Python',
                url: 'https://doc.qt.io/qtforpython-6/quickstart.html'
              },
              {
                label: 'QWidget en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QWidget.html'
              }
            ],
            exampleTitle: 'Ventana minima',
            exampleCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Panel inicial")
window.show()
app.exec()
`,
            supportNote: 'El punto de arranque de PySide6 siempre tiene el mismo patron: app, widget visible y event loop.'
          },
          instructions: {
            overview: 'Toda app en PySide6 empieza con un objeto de aplicación y un widget visible.',
            steps: [
              'Importa QApplication y QWidget desde PySide6.QtWidgets.',
              'Crea la instancia de la app y una ventana base.',
              'Define un título, llama a show() y arranca el loop con app.exec().'
            ],
            hint: 'Si la ventana nunca aparece, revisa que window.show() ocurra antes de app.exec().'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Arranca la primera interfaz',
            prompt: 'Completa el starter para que la ventana se muestre y el loop de PySide6 quede corriendo.',
            starterCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Consola PyPath")

# Usa window.show() para mostrar la ventana
# Luego deja app.exec() al final para iniciar el loop

app.exec()
`,
            expectedKeywords: [
              'QApplication',
              'QWidget',
              'show'
            ],
            successCriteria: 'Debes mostrar la ventana creada en window antes de iniciar el loop principal con app.exec().',
            expectedResult: 'La ventana "Consola PyPath" aparece en pantalla y la aplicación queda corriendo.',
            solutionCode: `from PySide6.QtWidgets import QApplication, QWidget

app = QApplication([])
window = QWidget()
window.setWindowTitle("Consola PyPath")
window.show()
app.exec()
`,
            solutionNote:
              'La pieza que faltaba era mostrar la ventana con window.show() antes de dejar app.exec() cerrando el flujo de arranque.',
            salidaGuiada: 'QWidget visible en pantalla. Event loop activo.',
            executionNote: 'Aquí usamos una vista guiada porque PySide6 no puede abrir una ventana de escritorio real dentro del navegador.',
            successMessage: 'Ventana en linea. Ya construiste el cascaron base de la app y lanzaste el event loop.'
          }
        },
        {
          id: 'button-signal',
          title: 'Misión 02: Conectar un botón',
          duration: '10 min',
          xp: 140,
          objective: 'Agregar un botón y conectar su clic con feedback visible.',
          resources: {
            videoTitle: 'Conectar botones en PySide6',
            videoUrl: 'https://www.youtube.com/embed/T2d88mWUng4',
            documentationLinks: [
              {
                label: 'QPushButton en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QPushButton.html'
              },
              {
                label: 'Senales y slots en Qt for Python',
                url: 'https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html'
              }
            ],
            exampleTitle: 'Botón conectado',
            exampleCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Iniciar")

def handle_click():
    button.setText("Activo")

button.clicked.connect(handle_click)
button.show()
app.exec()
`,
            supportNote: 'clicked.connect(...) es una de las líneas más repetidas cuando empiezas a crear herramientas visuales.'
          },
          instructions: {
            overview: 'Los widgets se vuelven útiles cuando reaccionan. Aqui vas a crear un QPushButton y conectar su señal.',
            steps: [
              'Crea un QPushButton y define su texto.',
              'Escribe una función que actualice el botón al presionarlo.',
              'Usa clicked.connect(...) para enlazar la señal con la función.'
            ],
            hint: 'Las señales reciben una referencia a función, asi que conecta con button.clicked.connect(handler).'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Haz que el botón responda',
            prompt: 'Actualiza el starter para que el botón cambie su texto al hacer clic.',
            starterCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Desplegar misión")

# Define un handler que use button.setText(...)
# Conecta ese handler con button.clicked.connect(...)

button.show()
app.exec()
`,
            expectedKeywords: [
              'QPushButton',
              'clicked.connect',
              'setText'
            ],
            successCriteria: 'Debes crear un handler y conectarlo al botón para que cambie su texto al hacer clic.',
            expectedResult: 'El botón se muestra, detecta el clic y cambia su texto después de la interacción.',
            solutionCode: `from PySide6.QtWidgets import QApplication, QPushButton

app = QApplication([])
button = QPushButton("Desplegar misión")

def handle_click():
    button.setText("Misión activa")

button.clicked.connect(handle_click)
button.show()
app.exec()
`,
            solutionNote:
              'La solución completa necesita un handler real y la conexión button.clicked.connect(...) para que el botón reaccione.',
            salidaGuiada: 'Botón renderizado. Clic detectado. Texto actualizado.',
            executionNote: 'Aquí revisamos la estructura porque la señal y el cambio visual pertenecen a una interfaz de escritorio.',
            successMessage: 'Senal enlazada. Tu botón ya reacciona como un control real de UI.'
          }
        }
      ]
    },
    {
      id: 'signal-hub',
      title: 'Centro de señales',
      summary: 'Practica slots, entrada de texto y cambios de estado disparados por eventos.',
      lessons: [
        {
          id: 'title-updater',
          title: 'Misión 03: Actualizar el título',
          duration: '12 min',
          xp: 160,
          objective: 'Usar un clic para llamar un slot personalizado y actualizar el título de la ventana.',
          resources: {
            videoTitle: 'clicked.connect y handlers en PySide6',
            videoUrl: 'https://www.youtube.com/embed/T2d88mWUng4',
            documentationLinks: [
              {
                label: 'Senales y slots',
                url: 'https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html'
              },
              {
                label: 'QWidget y setWindowTitle',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QWidget.html'
              }
            ],
            exampleTitle: 'Slot básico',
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
            supportNote: 'Separar el handler de la configuración del widget mejora mucho la lectura del código.'
          },
          instructions: {
            overview: 'Los slots son funciones normales de Python que reaccionan a señales.',
            steps: [
              'Crea una ventana y un botón.',
              'Define handle_click() y cambia el título dentro del slot.',
              'Conecta el botón con clicked.connect(handle_click).'
            ],
            hint: 'Mantén el handler fuera de la configuración del botón para que la conexión se lea mejor.'
          },
          challenge: {
            exerciseType: 'Deteccion de bug',
            title: 'Convierte clics en estado de UI',
            prompt: 'Agrega un handler que actualice el título de la ventana cuando se presione el botón.',
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
            expectedKeywords: [
              'def handle_click',
              'clicked.connect',
              'setWindowTitle'
            ],
            successCriteria: 'Debes definir un slot llamado handle_click y usarlo para actualizar el título de la ventana al presionar el botón.',
            expectedResult: 'Al hacer clic, la ventana deja "En espera..." y cambia a un nuevo título visible.',
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
            solutionNote:
              'El slot handle_click encapsula el cambio de estado y luego se enlaza al clic del botón para actualizar el título.',
            salidaGuiada: 'Ventana detectada. Evento conectado. Título actualizado a "Activo".',
            executionNote: 'La guía confirma la secuencia importante: evento, handler y cambio visible en la interfaz.',
            successMessage: 'Slot activo. Convertiste un evento de clic en un cambio visible dentro de la app.'
          }
        },
        {
          id: 'line-edit-sync',
          title: 'Misión 04: Sincronizar entrada',
          duration: '12 min',
          xp: 170,
          objective: 'Escuchar entrada de texto y usarla para actualizar la UI en vivo.',
          resources: {
            videoTitle: 'QLineEdit en PySide6',
            videoUrl: 'https://www.youtube.com/embed/4qwkXXAWvHE',
            documentationLinks: [
              {
                label: 'QLineEdit en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html'
              },
              {
                label: 'Más sobre señales de widgets',
                url: 'https://doc.qt.io/qtforpython-6/tutorials/basictutorial/signals_and_slots.html'
              }
            ],
            exampleTitle: 'Entrada reactiva',
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
            supportNote: 'Los formularios y mini herramientas internas se sienten mucho mejor cuando la UI responde al texto de inmediato.'
          },
          instructions: {
            overview: 'Los widgets de texto habilitan interfaces más dinámicas. Aqui aparece QLineEdit.',
            steps: [
              'Crea un QLineEdit y define un placeholder.',
              'Agrega una actualización de etiqueta o ventana dentro de un handler.',
              'Conecta el campo con textChanged.connect(...).'
            ],
            hint: 'El placeholder ayuda mucho en versiones tempranas porque guía sin recargar la interfaz.'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Reflejar el texto escrito',
            prompt: 'Completa el starter para crear un QLineEdit, asignar su placeholder y conectar cambios de texto.',
            starterCode: `from PySide6.QtWidgets import QApplication, QLineEdit, QWidget

app = QApplication([])
window = QWidget()
field = QLineEdit(window)

# Usa field.setPlaceholderText("Escribe tu nombre")
# Luego conecta field.textChanged a un handler

window.show()
app.exec()
`,
            expectedKeywords: [
              'QLineEdit',
              'setPlaceholderText',
              'textChanged.connect'
            ],
            successCriteria: 'Debes agregar un placeholder al campo y conectar textChanged a un handler que responda al texto escrito.',
            expectedResult: 'El campo muestra una ayuda inicial y queda enlazado para reaccionar cuando el usuario escriba.',
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
            solutionNote:
              'Aquí se resuelven las dos partes del reto: el placeholder orienta al usuario y textChanged.connect(...) enlaza el campo con el handler.',
            salidaGuiada: 'Campo detectado. Placeholder aplicado. Cambios de texto enlazados.',
            executionNote: 'La misión se revisa de forma guiada porque el cambio real ocurre dentro de una interfaz PySide6.',
            successMessage: 'Entrada conectada. Ahora puedes reaccionar al texto mientras se escribe.'
          }
        }
      ]
    },
    {
      id: 'layout-lab',
      title: 'Laboratorio de layouts',
      summary: 'Organiza widgets con layouts para que la interfaz escale con orden.',
      lessons: [
        {
          id: 'vertical-layout',
          title: 'Misión 05: Apilar widgets',
          duration: '14 min',
          xp: 180,
          objective: 'Usar QVBoxLayout para ordenar varios widgets en un flujo vertical.',
          resources: {
            videoTitle: 'Layouts para ordenar widgets',
            videoUrl: 'https://www.youtube.com/embed/6vdV-vQcffQ',
            documentationLinks: [
              {
                label: 'QVBoxLayout en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QVBoxLayout.html'
              },
              {
                label: 'Gestión de layouts',
                url: 'https://doc.qt.io/qtforpython-6/overviews/qtwidgets-layout.html'
              }
            ],
            exampleTitle: 'Flujo vertical',
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
            supportNote: 'Los layouts te permiten pensar en jerarquía de UI y no en posiciones sueltas.'
          },
          instructions: {
            overview: 'Los layouts permiten escalar una interfaz sin posicionar todo a mano.',
            steps: [
              'Crea un QVBoxLayout.',
              'Usa addWidget(...) para colocar la etiqueta y el botón.',
              'Adjunta el layout a la ventana con setLayout(...).'
            ],
            hint: 'Si un widget no aparece donde esperabas, revisa si el layout realmente se asigno a la ventana.'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Construir un flujo vertical limpio',
            prompt: 'Organiza los widgets en un QVBoxLayout y conecta ese layout a la ventana.',
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
            expectedKeywords: [
              'QVBoxLayout',
              'addWidget',
              'setLayout'
            ],
            successCriteria: 'Debes añadir la etiqueta y el botón al layout vertical y después asignar ese layout a la ventana.',
            expectedResult: 'La interfaz queda ordenada en vertical con los widgets visibles dentro de la ventana.',
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
            solutionNote:
              'La clave es agregar cada widget al QVBoxLayout y luego asignar ese layout completo a la ventana con setLayout(...).',
            salidaGuiada: 'Layout vertical creado. Widgets agregados. Ventana organizada.',
            executionNote: 'La revisión guiada resume el objetivo visual de la misión: widgets bien apilados y conectados al layout.',
            successMessage: 'Layout estable. Tus widgets ya escalan dentro de una estructura vertical predecible.'
          }
        },
        {
          id: 'toolbar-layout',
          title: 'Misión 06: Construir una mini barra',
          duration: '15 min',
          xp: 210,
          objective: 'Combinar etiquetas y botones dentro de un layout horizontal para una barra compacta.',
          resources: {
            videoTitle: 'Layouts horizontales para barras compactas',
            videoUrl: 'https://www.youtube.com/embed/6vdV-vQcffQ',
            documentationLinks: [
              {
                label: 'QHBoxLayout en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QHBoxLayout.html'
              },
              {
                label: 'QLabel en la documentacion oficial',
                url: 'https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLabel.html'
              }
            ],
            exampleTitle: 'Barra horizontal',
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
            supportNote: 'Las barras compactas son útiles para acciones de panel, filtros y estados rapidos.'
          },
          instructions: {
            overview: 'Los layouts horizontales son ideales para controles compactos, headers y barras de acciones.',
            steps: [
              'Crea un QHBoxLayout para la fila.',
              'Agrega un QLabel y al menos un QPushButton.',
              'Adjunta el layout a la ventana para que la barra se renderice bien.'
            ],
            hint: 'Una barra funciona mejor cuando cada widget tiene un rol claro: estado visible y acciones concretas.'
          },
          challenge: {
            exerciseType: 'Completar código',
            title: 'Ensamblar la barra horizontal',
            prompt: 'Crea una barra horizontal usando una etiqueta y botones, y montala en la ventana.',
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
            expectedKeywords: [
              'QHBoxLayout',
              'QLabel',
              'QPushButton'
            ],
            successCriteria: 'Debes agregar la etiqueta y el botón a un QHBoxLayout y montar esa barra dentro de la ventana.',
            expectedResult: 'La ventana muestra una barra horizontal compacta con una etiqueta y un botón alineados.',
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
            solutionNote:
              'La barra se construye añadiendo ambos widgets al QHBoxLayout y montándolo después sobre la ventana.',
            salidaGuiada: 'Barra horizontal lista. Controles visibles y alineados.',
            executionNote: 'Aquí la vista previa resume el resultado esperado, porque la barra pertenece a una UI de escritorio.',
            successMessage: 'Barra desplegada. Ya tienes patrones base para construir interfaces tipo panel.'
          }
        }
      ]
    }
  ]
}
