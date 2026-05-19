export const evaluacionesPySide6 = {
  unitAssessments: {
    "boot-sequence": {
      id: "pyside6-boot-checkpoint",
      title: "Evaluación de unidad: Secuencia de arranque",
      summary: "Cierra esta unidad comprobando que ya entiendes la ventana inicial, el botón y el event loop.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya puedes entrar a la parte de señales y entrada de texto en PySide6.",
      questions: [
        {
          id: "pyside-boot-q1",
          prompt: "¿Qué objeto prepara el event loop en PySide6?",
          options: [
            { id: "a", label: "QApplication" },
            { id: "b", label: "QWidget" },
            { id: "c", label: "QPushButton" }
          ],
          correctOptionId: "a",
          explanation: "QApplication es el objeto que controla el event loop."
        },
        {
          id: "pyside-boot-q2",
          prompt: "¿Qué método hace visible un widget?",
          options: [
            { id: "a", label: "show()" },
            { id: "b", label: "exec()" },
            { id: "c", label: "connect()" }
          ],
          correctOptionId: "a",
          explanation: "show() muestra el widget en pantalla."
        },
        {
          id: "pyside-boot-q3",
          prompt: "¿Qué hace app.exec()?",
          options: [
            { id: "a", label: "Inicia el event loop" },
            { id: "b", label: "Cierra la ventana" },
            { id: "c", label: "Carga un layout" }
          ],
          correctOptionId: "a",
          explanation: "app.exec() inicia el ciclo de eventos que mantiene la app activa."
        }
      ]
    },
    "signal-hub": {
      id: "pyside6-signals-checkpoint",
      title: "Evaluación de unidad: Centro de señales",
      summary: "Demuestra que ya puedes reaccionar a clics y cambios de entrada dentro de la interfaz.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya puedes pasar a la etapa de layouts y organización visual.",
      questions: [
        {
          id: "pyside-signal-q1",
          prompt: "En PySide6, ¿qué es un slot?",
          options: [
            { id: "a", label: "Una función que responde a una señal" },
            { id: "b", label: "Un tipo de layout" },
            { id: "c", label: "Una ventana secundaria" }
          ],
          correctOptionId: "a",
          explanation: "Un slot responde a una señal emitida por un widget."
        },
        {
          id: "pyside-signal-q2",
          prompt: "¿Qué señal usa QLineEdit para cambios de texto?",
          options: [
            { id: "a", label: "clicked" },
            { id: "b", label: "textChanged" },
            { id: "c", label: "valueChanged" }
          ],
          correctOptionId: "b",
          explanation: "textChanged se dispara cuando el texto del campo cambia."
        },
        {
          id: "pyside-signal-q3",
          prompt: "¿Qué método actualiza el título de la ventana?",
          options: [
            { id: "a", label: "setWindowTitle" },
            { id: "b", label: "setTitle" },
            { id: "c", label: "setText" }
          ],
          correctOptionId: "a",
          explanation: "setWindowTitle cambia el título de la ventana."
        }
      ]
    },
    "layout-lab": {
      id: "pyside6-layout-checkpoint",
      title: "Evaluación de unidad: Laboratorio de layouts",
      summary: "Comprueba que ya sabes organizar widgets en vertical y horizontal con una estructura limpia.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya cerraste la parte de layouts y estás listo para avanzar.",
      questions: [
        {
          id: "pyside-layout-q1",
          prompt: "¿Qué layout apila widgets en una columna?",
          options: [
            { id: "a", label: "QHBoxLayout" },
            { id: "b", label: "QVBoxLayout" },
            { id: "c", label: "QGridLayout" }
          ],
          correctOptionId: "b",
          explanation: "QVBoxLayout organiza widgets de forma vertical."
        },
        {
          id: "pyside-layout-q2",
          prompt: "¿Qué método usa un layout para añadir widgets?",
          options: [
            { id: "a", label: "setText" },
            { id: "b", label: "addWidget" },
            { id: "c", label: "appendWidget" }
          ],
          correctOptionId: "b",
          explanation: "addWidget añade widgets al layout."
        },
        {
          id: "pyside-layout-q3",
          prompt: "¿Cómo se asigna un layout a una ventana?",
          options: [
            { id: "a", label: "setLayout" },
            { id: "b", label: "applyLayout" },
            { id: "c", label: "showLayout" }
          ],
          correctOptionId: "a",
          explanation: "setLayout conecta el layout al widget contenedor."
        }
      ]
    },
    "widget-library": {
      id: "pyside6-widgets-checkpoint",
      title: "Evaluación de unidad: Biblioteca de widgets",
      summary: "Comprueba que ya sabes usar etiquetas, campos y tablas para interfaces completas.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya puedes construir formularios y vistas de datos.",
      questions: [
        {
          id: "pyside-widget-q1",
          prompt: "¿Qué widget sirve para texto editable corto?",
          options: [
            { id: "a", label: "QLabel" },
            { id: "b", label: "QLineEdit" },
            { id: "c", label: "QPushButton" }
          ],
          correctOptionId: "b",
          explanation: "QLineEdit es el widget de entrada de texto corto."
        },
        {
          id: "pyside-widget-q2",
          prompt: "¿Qué widget ayuda a mostrar datos en filas y columnas?",
          options: [
            { id: "a", label: "QTableWidget" },
            { id: "b", label: "QLabel" },
            { id: "c", label: "QLineEdit" }
          ],
          correctOptionId: "a",
          explanation: "QTableWidget sirve para mostrar datos tabulares."
        },
        {
          id: "pyside-widget-q3",
          prompt: "¿Qué widget sirve para mostrar texto estático?",
          options: [
            { id: "a", label: "QLabel" },
            { id: "b", label: "QPushButton" },
            { id: "c", label: "QLineEdit" }
          ],
          correctOptionId: "a",
          explanation: "QLabel muestra texto estático en la UI."
        }
      ]
    },
    "state-management": {
      id: "pyside6-state-checkpoint",
      title: "Evaluación de unidad: Gestión de estado",
      summary: "Verifica que manejas cambios de estado locales y sincronización entre widgets.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya sabes mantener estados en tu aplicación.",
      questions: [
        {
          id: "pyside-state-q1",
          prompt: "¿Qué técnica permite que un botón actualice una etiqueta?",
          options: [
            { id: "a", label: "Crear un slot que actualice el texto" },
            { id: "b", label: "Usar setLayout" },
            { id: "c", label: "Llamar a app.exec()" }
          ],
          correctOptionId: "a",
          explanation: "Un slot puede actualizar el texto de la etiqueta cuando se dispara."
        },
        {
          id: "pyside-state-q2",
          prompt: "¿Cuál es el evento correcto para detectar cambios en un QLineEdit?",
          options: [
            { id: "a", label: "clicked" },
            { id: "b", label: "textChanged" },
            { id: "c", label: "valueChanged" }
          ],
          correctOptionId: "b",
          explanation: "textChanged se usa para cambios de texto en QLineEdit."
        },
        {
          id: "pyside-state-q3",
          prompt: "¿Qué método actualiza el texto de un QLabel?",
          options: [
            { id: "a", label: "setText" },
            { id: "b", label: "setWindowTitle" },
            { id: "c", label: "show" }
          ],
          correctOptionId: "a",
          explanation: "setText actualiza el contenido visible del QLabel."
        }
      ]
    },
    "dialogs-notifications": {
      id: "pyside6-dialogs-checkpoint",
      title: "Evaluación de unidad: Diálogos y notificaciones",
      summary: "Asegura que sabes mostrar mensajes y elementos de estado al usuario.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya puedes agregar diálogo y feedback visual en tu aplicación.",
      questions: [
        {
          id: "pyside-dialog-q1",
          prompt: "¿Qué widget se usa para mensajes modales simples?",
          options: [
            { id: "a", label: "QMessageBox" },
            { id: "b", label: "QLineEdit" },
            { id: "c", label: "QTableWidget" }
          ],
          correctOptionId: "a",
          explanation: "QMessageBox muestra mensajes modales al usuario."
        },
        {
          id: "pyside-dialog-q2",
          prompt: "¿Qué método activa el diálogo para que el usuario lo vea?",
          options: [
            { id: "a", label: "exec()" },
            { id: "b", label: "show()" },
            { id: "c", label: "open()" }
          ],
          correctOptionId: "a",
          explanation: "exec() muestra el diálogo de forma modal y espera respuesta."
        },
        {
          id: "pyside-dialog-q3",
          prompt: "¿Qué widget sirve para mostrar un progreso en porcentaje?",
          options: [
            { id: "a", label: "QProgressBar" },
            { id: "b", label: "QLabel" },
            { id: "c", label: "QPushButton" }
          ],
          correctOptionId: "a",
          explanation: "QProgressBar muestra visualmente el avance o porcentaje."
        }
      ]
    },
    "advanced-ux": {
      id: "pyside6-ux-checkpoint",
      title: "Evaluación de unidad: UX avanzada",
      summary: "Comprueba que puedes mejorar la experiencia con estilos y layouts combinados.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya dominas ajustes visuales y diseño de UI.",
      questions: [
        {
          id: "pyside-ux-q1",
          prompt: "¿Qué método aplica estilo CSS a un widget?",
          options: [
            { id: "a", label: "setStyleSheet" },
            { id: "b", label: "setStyle" },
            { id: "c", label: "setText" }
          ],
          correctOptionId: "a",
          explanation: "setStyleSheet aplica estilos tipo CSS al widget."
        },
        {
          id: "pyside-ux-q2",
          prompt: "¿Qué layout sirve para colocar widgets en una fila?",
          options: [
            { id: "a", label: "QHBoxLayout" },
            { id: "b", label: "QVBoxLayout" },
            { id: "c", label: "QGridLayout" }
          ],
          correctOptionId: "a",
          explanation: "QHBoxLayout organiza widgets en una fila horizontal."
        },
        {
          id: "pyside-ux-q3",
          prompt: "¿Por qué anidar layouts?",
          options: [
            { id: "a", label: "Para crear interfaces más flexibles y ordenadas" },
            { id: "b", label: "Para mejorar el rendimiento" },
            { id: "c", label: "Para evitar usar widgets" }
          ],
          correctOptionId: "a",
          explanation: "Los layouts anidados permiten estructuras de UI más ricas y adaptables."
        }
      ]
    },
    "deployment-tools": {
      id: "pyside6-deploy-checkpoint",
      title: "Evaluación de unidad: Cierre del proyecto",
      summary: "Verifica que sabes preparar la app para distribución y entregar un proyecto profesional.",
      passingScore: 2,
      successMessage: "Unidad aprobada. Ya entiendes el flujo completo hasta el lanzamiento.",
      questions: [
        {
          id: "pyside-deploy-q1",
          prompt: "¿Qué herramienta se usa comúnmente para empaquetar apps Python?",
          options: [
            { id: "a", label: "PyInstaller" },
            { id: "b", label: "QApplication" },
            { id: "c", label: "QMessageBox" }
          ],
          correctOptionId: "a",
          explanation: "PyInstaller convierte scripts Python en ejecutables."
        },
        {
          id: "pyside-deploy-q2",
          prompt: "¿Qué paso es clave antes de empaquetar la app?",
          options: [
            { id: "a", label: "Probar la aplicación" },
            { id: "b", label: "Cambiar el nombre del archivo" },
            { id: "c", label: "Eliminar los layouts" }
          ],
          correctOptionId: "a",
          explanation: "Probar la app asegura que el ejecutable funcione correctamente."
        },
        {
          id: "pyside-deploy-q3",
          prompt: "¿Qué documento ayuda a instalar la aplicación?",
          options: [
            { id: "a", label: "Guía de instalación" },
            { id: "b", label: "Archivo de prueba" },
            { id: "c", label: "Nota de estilo" }
          ],
          correctOptionId: "a",
          explanation: "Una guía de instalación es útil para que otros usen el software."
        }
      ]
    }
  },
  finalAssessment: {
    id: "pyside6-final",
    title: "Evaluación final del curso: PySide6",
    summary: "Valida que dominas widgets, señales, layouts, estado y entrega de apps de escritorio.",
    passingScore: 7,
    successMessage: "Curso finalizado. Ya completaste el curso de PySide6 con evaluación final aprobada.",
    questions: [
      {
        id: "pyside-final-q1",
        prompt: "¿Qué trío define el arranque básico de una app con PySide6?",
        options: [
          { id: "a", label: "QApplication, widget visible y app.exec()" },
          { id: "b", label: "QLineEdit, while y print" },
          { id: "c", label: "QVBoxLayout, dict y return" }
        ],
        correctOptionId: "a",
        explanation: "La app necesita QApplication, un widget visible y el event loop."
      },
      {
        id: "pyside-final-q2",
        prompt: "¿Qué objetivo cumple clicked.connect(handle_click)?",
        options: [
          { id: "a", label: "Cambiar el idioma del editor" },
          { id: "b", label: "Vincular un evento con una función" },
          { id: "c", label: "Crear un widget oculto" }
        ],
        correctOptionId: "b",
        explanation: "Conecta la señal al handler que se ejecuta al hacer clic."
      },
      {
        id: "pyside-final-q3",
        prompt: "¿Cuál es una buena razón para usar layouts?",
        options: [
          { id: "a", label: "Organizar widgets sin posicionarlos manualmente" },
          { id: "b", label: "Evitar usar show()" },
          { id: "c", label: "Quitar señales de los botones" }
        ],
        correctOptionId: "a",
        explanation: "Los layouts mantienen la UI ordenada y adaptable."
      },
      {
        id: "pyside-final-q4",
        prompt: "¿Qué widget es adecuado para entrada de texto simple?",
        options: [
          { id: "a", label: "QPushButton" },
          { id: "b", label: "QLineEdit" },
          { id: "c", label: "QHBoxLayout" }
        ],
        correctOptionId: "b",
        explanation: "QLineEdit es el widget para texto corto editable."
      },
      {
        id: "pyside-final-q5",
        prompt: "¿Qué widget muestra texto estático?",
        options: [
          { id: "a", label: "QLabel" },
          { id: "b", label: "QLineEdit" },
          { id: "c", label: "QPushButton" }
        ],
        correctOptionId: "a",
        explanation: "QLabel se usa para texto estático."
      },
      {
        id: "pyside-final-q6",
        prompt: "¿Qué método asigna un layout a un widget?",
        options: [
          { id: "a", label: "setLayout" },
          { id: "b", label: "setText" },
          { id: "c", label: "addWidget" }
        ],
        correctOptionId: "a",
        explanation: "setLayout conecta el layout al widget contenedor."
      },
      {
        id: "pyside-final-q7",
        prompt: "¿Qué widget se usa para mostrar progreso en porcentaje?",
        options: [
          { id: "a", label: "QProgressBar" },
          { id: "b", label: "QLabel" },
          { id: "c", label: "QPushButton" }
        ],
        correctOptionId: "a",
        explanation: "QProgressBar muestra visualmente el avance."
      },
      {
        id: "pyside-final-q8",
        prompt: "¿Qué widget sirve para mostrar una tabla de datos?",
        options: [
          { id: "a", label: "QTableWidget" },
          { id: "b", label: "QLabel" },
          { id: "c", label: "QLineEdit" }
        ],
        correctOptionId: "a",
        explanation: "QTableWidget es el widget para datos tabulares."
      },
      {
        id: "pyside-final-q9",
        prompt: "¿Qué método aplica un estilo CSS a un widget?",
        options: [
          { id: "a", label: "setStyleSheet" },
          { id: "b", label: "setStyle" },
          { id: "c", label: "setText" }
        ],
        correctOptionId: "a",
        explanation: "setStyleSheet aplica estilos visuales a widgets."
      },
      {
        id: "pyside-final-q10",
        prompt: "¿Qué comando usarías para empaquetar tu aplicación con PyInstaller?",
        options: [
          { id: "a", label: "pyinstaller --onefile main.py" },
          { id: "b", label: "python main.py" },
          { id: "c", label: "npm run build" }
        ],
        correctOptionId: "a",
        explanation: "pyinstaller --onefile main.py empaqueta el script en un solo ejecutable."
      }
    ]
  }
}
