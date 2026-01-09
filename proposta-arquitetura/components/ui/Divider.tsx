interface DividerProps {
  className?: string;
  variant?: 'short' | 'full';
}

export function Divider({ className = '', variant = 'full' }: DividerProps) {
  const widthClass = variant === 'short' ? 'w-16 mx-auto' : 'w-full';
  
  return (
    <div className={`h-px bg-line ${widthClass} ${className}`} />
  );
}
