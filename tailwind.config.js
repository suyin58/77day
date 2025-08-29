/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'star-blue': '#1a1a2e',
        'galaxy-purple': '#16213e',
        'deep-space': '#0f3460',
        'star-gold': '#ffd700',
        'magpie-pink': '#ff69b4',
        'bridge-light': '#87ceeb'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'fly': 'fly 0.3s ease-out',
        'bridge-glow': 'bridge-glow 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        fly: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' }
        },
        'bridge-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(135, 206, 235, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(135, 206, 235, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}
