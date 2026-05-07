// Plantilla base para el metadato de catalogo de un curso nuevo.
// Debe compartir el mismo id del archivo del curso y de sus evaluaciones.

export const catalogoCursoPlantilla = {
  id: 'curso-demo',
  library: 'Biblioteca',
  requiredCourseIds: ['python-fundamentals'],
  title: 'Nombre del curso',
  description: 'Descripcion corta para home, panel y catalogo.',
  status: 'soon',
  statusLabel: 'Proximamente',
  intensity: 'Media',
  duration: '3 semanas',
  audience: ['Perfil 1', 'Perfil 2'],
  prerequisites: ['Fundamentos de Python'],
  recommendedBefore: ['Fundamentos de Python'],
  nextAfter: ['Siguiente paso 1', 'Siguiente paso 2'],
  personaTags: ['programadores'],
  interestTags: ['bases'],
  experienceTags: ['principiante'],
  pitch: 'Frase corta para explicar por que este curso vale la pena.',
  recommendedOrder: 99,
}
