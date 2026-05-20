import { useEffect } from 'react'
import { combinarClases } from '../utilidades/combinarClases.js'

const sizeClasses = {
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
}
let activeModalCount = 0
let originalBodyOverflow = ''

export function Modal({ open, onClose, children, size = 'lg' }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    if (activeModalCount === 0) {
      originalBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    activeModalCount += 1

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      activeModalCount = Math.max(0, activeModalCount - 1)

      if (activeModalCount === 0) {
        document.body.style.overflow = originalBodyOverflow
      }

      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/80 px-4 py-6 backdrop-blur-sm sm:py-8"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          className={combinarClases(
            'panel my-auto w-full max-h-[calc(100vh-3rem)] overflow-y-auto overscroll-contain',
            sizeClasses[size] ?? sizeClasses.lg,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

