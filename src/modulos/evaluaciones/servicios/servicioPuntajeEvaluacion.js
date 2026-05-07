export function puntuarEvaluacion(assessment, answers) {
  const totalQuestions = assessment.questions.length
  const correctCount = assessment.questions.reduce(
    (count, question) => count + (answers[question.id] === question.correctOptionId ? 1 : 0),
    0,
  )
  const passed = correctCount >= assessment.passingScore

  return {
    totalQuestions,
    correctCount,
    passingScore: assessment.passingScore,
    passed,
    percentage: totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0,
  }
}

