interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  href, 
  onClick, 
  className = '',
  variant = 'primary' 
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-3
    px-8 py-4 rounded-subtle
    font-sans text-label uppercase tracking-wider
    transition-all duration-300
  `;
  
  const variants = {
    primary: 'bg-text-strong text-cream hover:bg-accent hover:shadow-elevated',
    secondary: 'bg-transparent text-text-strong border border-line hover:border-accent hover:text-accent',
  };
  
  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
