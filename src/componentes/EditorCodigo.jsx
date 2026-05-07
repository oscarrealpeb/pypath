import { useSyncExternalStore } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { useEstadoApp } from '../modulos/progreso/contexto/useEstadoApp.js'

const editorExtensions = [python(), EditorView.lineWrapping]

const temaClaroEditor = EditorView.theme(
  {
    '&': {
      backgroundColor: 'transparent',
      color: '#142b23',
    },
    '.cm-content': {
      caretColor: '#00a666',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#00a666',
    },
    '.cm-selectionBackground': {
      backgroundColor: 'rgba(0, 166, 102, 0.18)',
    },
    '.cm-gutters': {
      backgroundColor: 'transparent',
      color: '#6a8077',
      border: 'none',
    },
    '.cm-activeLine, .cm-activeLineGutter': {
      backgroundColor: 'rgba(0, 166, 102, 0.08)',
    },
  },
  { dark: false },
)

const editorSetup = {
  lineNumbers: true,
  foldGutter: false,
  highlightActiveLine: true,
  highlightActiveLineGutter: false,
  dropCursor: false,
  allowMultipleSelections: false,
  indentOnInput: true,
  syntaxHighlighting: true,
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: false,
  searchKeymap: false,
}

export function EditorCodigo({ value, onChange, height = '430px' }) {
  const { themePreference = 'system' } = useEstadoApp()
  const sistemaPrefiereOscuro = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => {}
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', onStoreChange)

      return () => {
        mediaQuery.removeEventListener('change', onStoreChange)
      }
    },
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : true,
    () => true,
  )
  const usaModoOscuro =
    themePreference === 'dark'
      ? true
      : themePreference === 'light'
        ? false
        : sistemaPrefiereOscuro

  return (
    <div className="code-editor-shell overflow-hidden rounded-2xl border border-border bg-panel-2/70">
      <CodeMirror
        value={value}
        height={height}
        theme={usaModoOscuro ? oneDark : temaClaroEditor}
        extensions={editorExtensions}
        basicSetup={editorSetup}
        onChange={(nextValue) => onChange(nextValue)}
      />
    </div>
  )
}

