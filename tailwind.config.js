/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '7px', 
        'md': '0.375rem',
        'lg': '0.9rem',
        'full': '9999px',
        'large': '12px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      fontSize: {
        'xs': '0.75rem',     
        'sm': '0.85rem',     
        'base': '1rem',      
        'lg': '1.125rem',     
        'xl': '1.25rem',      
        '2xl': '1.5rem',     
        '3xl': '1.875rem',    
        '4xl': '2.25rem',     
        '5xl': '3rem',        
        '6xl': '3.75rem',     
        '7xl': '4.5rem',      
        '8xl': '6rem',        
        '9xl': '8rem',       
        'huge': '10rem',      
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
    },
  },
  plugins: [],
}

