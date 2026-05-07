const PYODIDE_VERSION = '0.29.3'
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
const PYODIDE_SCRIPT_URL = `${PYODIDE_BASE_URL}pyodide.js`

let scriptPromise = null
let runtimePromise = null

function loadPyodideScript() {
  if (window.loadPyodide) {
    return Promise.resolve()
  }

  if (scriptPromise) {
    return scriptPromise
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-pypath-pyodide]')

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('No pudimos cargar el runtime de Python.')),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = PYODIDE_SCRIPT_URL
    script.async = true
    script.dataset.pypathPyodide = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No pudimos cargar el runtime de Python.'))
    document.head.append(script)
  })

  return scriptPromise
}

async function getPyodide() {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      await loadPyodideScript()
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE_URL })
      pyodide.setStdin({ error: true })
      return pyodide
    })()
  }

  return runtimePromise
}

function formatRuntimeError(error, stderrBuffer) {
  if (stderrBuffer.length > 0) {
    return stderrBuffer.join('\n')
  }

  return error instanceof Error ? error.message : 'La ejecución falló por un error inesperado.'
}

export async function ejecutarRetoPython(code) {
  const trimmedCode = code.trim()

  if (!trimmedCode) {
    return {
      status: 'idle',
      title: 'Consola en espera',
      output: 'Todavía no hay código para ejecutar.',
      details: 'Escribe tu solución y luego pulsa Ejecutar.',
    }
  }

  let pyodide = null
  const stdoutBuffer = []
  const stderrBuffer = []

  try {
    pyodide = await getPyodide()
    pyodide.setStdout({
      batched: (message) => {
        stdoutBuffer.push(message)
      },
    })
    pyodide.setStderr({
      batched: (message) => {
        stderrBuffer.push(message)
      },
    })

    await pyodide.loadPackagesFromImports(trimmedCode)
    const result = await pyodide.runPythonAsync(trimmedCode)

    let derivedOutput = stdoutBuffer.join('\n').trim()

    if (!derivedOutput && result !== undefined && result !== null) {
      derivedOutput = String(result)
    }

    if (result && typeof result.destroy === 'function') {
      result.destroy()
    }

    return {
      status: 'success',
      title: 'Python ejecutado',
      output: derivedOutput || 'El código se ejecutó sin salida visible.',
      details: 'Esta misión se ejecutó de verdad en el navegador usando Python embebido.',
    }
  } catch (error) {
    return {
      status: 'error',
      title: 'Error de ejecución',
      output: formatRuntimeError(error, stderrBuffer),
      details:
        'Revisa la sintaxis, los nombres de tus variables o si estás intentando usar algo que todavía no fue definido.',
    }
  } finally {
    if (pyodide) {
      pyodide.setStdout()
      pyodide.setStderr()
      pyodide.setStdin({ error: true })
    }
  }
}

