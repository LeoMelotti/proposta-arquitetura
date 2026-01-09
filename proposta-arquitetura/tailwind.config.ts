import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette
        cream: '#EAE5DF',
        taupe: '#B2A695',
        card: '#CFC5B8',
        line: '#C6B6A7',
        accent: '#9F8A75',
        'text-secondary': '#695E54',
        'text-strong': '#231F19',
        
        // Semantic
        surface: '#F5F2EE',
        background: '#EAE5DF',
      },
      
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        // Display
        'display': ['clamp(2.25rem, 5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '0.25em' }],
        
        // Headings
        'h1': ['clamp(1.5rem, 3vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '0.15em' }],
        'h2': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0.12em' }],
        
        // Body
        'body': ['0.9375rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        
        // Labels
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      
      letterSpacing: {
        'tighter': '-0.01em',
        'tight': '0',
        'normal': '0.01em',
        'wide': '0.08em',
        'wider': '0.12em',
        'widest': '0.25em',
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      
      borderRadius: {
        'subtle': '2px',
        'soft': '4px',
      },
      
      boxShadow: {
        'subtle': '0 1px 3px rgba(35, 31, 25, 0.04)',
        'card': '0 2px 8px rgba(35, 31, 25, 0.06)',
        'elevated': '0 4px 16px rgba(35, 31, 25, 0.08)',
      },
      
      maxWidth: {
        'proposal': '680px',
        'wide': '800px',
      },
    },
  },
  plugins: [],
}

export default config
