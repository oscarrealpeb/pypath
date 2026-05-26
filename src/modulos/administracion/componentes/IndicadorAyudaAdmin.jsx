export function IndicadorAyudaAdmin({
  title,
  children,
  align = 'left',
  side = 'bottom',
}) {
  const horizontalPosition = align === 'right' ? 'right-0' : 'left-0'
  const verticalPosition =
    side === 'top'
      ? 'bottom-[calc(100%+0.65rem)] origin-bottom-right'
      : 'top-[calc(100%+0.65rem)] origin-top-right'
  const bubblePosition =
    align === 'right'
      ? `${horizontalPosition} ${verticalPosition}`
      : `${horizontalPosition} ${
          side === 'top'
            ? 'bottom-[calc(100%+0.65rem)] origin-bottom-left'
            : 'top-[calc(100%+0.65rem)] origin-top-left'
        }`

  return (
    <span className="group relative inline-flex items-center">
      <span
        tabIndex={0}
        className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase text-primary outline-none transition group-hover:border-primary/50 group-hover:bg-primary/15 group-focus-within:border-primary/50 group-focus-within:bg-primary/15"
        aria-label={title}
      >
        i
      </span>
      <span
        className={`pointer-events-none absolute z-50 hidden w-72 rounded-2xl border border-border/80 bg-panel px-4 py-3 text-xs leading-6 text-mute shadow-2xl group-hover:block group-focus-within:block ${bubblePosition}`}
        role="tooltip"
      >
        <strong className="block text-sm font-semibold text-foam">{title}</strong>
        <span className="mt-2 block">{children}</span>
      </span>
    </span>
  )
}
