/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Green palette
        'light-green': '#7CB342',
        'medium-green': '#2D5E40', 
        'dark-green': '#1E3A29',
        
        // Earth tones
        'earth-brown': '#8B5A2B',
        'light-earth': '#D2B48C',
        
        // Spiritual/mystical
        'spiritual-purple': '#614385',
        'dark-purple': '#42275a',
        
        // Neutrals
        'cream': '#F5F5DC',
        'light-cream': '#FFFFF0',
        'dark-cream': '#E8E4C9',
      },
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'leaf-sway': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};