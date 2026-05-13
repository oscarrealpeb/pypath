// Punto de union del contenido academico.
// Cada carpeta representa un curso y concentra:
// - `curso.js`: unidades, lecciones, recursos y retos
// - `catalogo.js`: como se muestra el curso en home/panel/catalogo
// - `evaluaciones.js`: checkpoints por unidad y evaluacion final
//
// Regla practica para el equipo:
// 1. cada persona trabaja dentro de la carpeta de su curso
// 2. al terminar, registra aqui los imports necesarios
// 3. si el curso aun es borrador, puedes dejar solo su catalogo

import {
  catalogoFundamentosPython,
  cursoFundamentosPython,
  evaluacionesFundamentosPython,
} from './fundamentosPython/index.js'
import {
  catalogoPandasFinanzas,
  cursoPandasFinanzas,
  evaluacionesPandasFinanzas,
} from './pandasFinanzas/index.js'
import { catalogoPygame, cursoPygame, evaluacionesPygame } from './pygame/index.js'
import { catalogoPySide6, cursoPySide6, evaluacionesPySide6 } from './pyside6/index.js'
import { catalogoPythonCiberseguridad } from './pythonCiberseguridad/index.js'

export const cursos = [
  cursoFundamentosPython,
  cursoPySide6,
  cursoPygame,
  cursoPandasFinanzas,
]

export const catalogoCursos = [
  catalogoFundamentosPython,
  catalogoPySide6,
  catalogoPygame,
  catalogoPythonCiberseguridad,
  catalogoPandasFinanzas,
]

export const evaluacionesCursos = {
  'python-fundamentals': evaluacionesFundamentosPython,
  pyside6: evaluacionesPySide6,
  pygame: evaluacionesPygame,
  'pandas-finanzas': evaluacionesPandasFinanzas,
}

export const cursosBorrador = {
}
