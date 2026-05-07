export function SelectorIntereses({
  options,
  selectedValues,
  onToggle,
  maxSelections = 4,
  helperText,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? 'border-primary/40 bg-primary/10 text-foam shadow-glow'
                  : 'border-border/80 bg-panel-2/70 text-mute hover:border-primary/20 hover:text-foam'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-mute">
        {helperText ?? `Puedes elegir entre 1 y ${maxSelections} intereses.`} Ahora llevas{' '}
        {selectedValues.length}/{maxSelections}.
      </p>
    </div>
  )
}

