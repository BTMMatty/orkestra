// src/components/ui/EmptyState.tsx
interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 border-2 border-white/20 rounded-full mb-6 
                    flex items-center justify-center">
        <div className="w-8 h-0.5 bg-white/20 rotate-45" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-70 max-w-md mb-6">{description}</p>
      {action && (
        <button 
          onClick={action.onClick}
          className="bg-white text-black px-6 py-3 font-bold text-sm 
                   hover:scale-105 transition-transform duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}