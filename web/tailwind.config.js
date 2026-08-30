/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// Custom brand colors
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a'
				},
				secondary: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d'
				},
				accent: {
					50: '#fefce8',
					100: '#fef9c3',
					200: '#fef08a',
					300: '#fde047',
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12'
				}
			},
			// Custom spacing scale
			spacing: {
				18: '4.5rem',
				88: '22rem',
				112: '28rem',
				128: '32rem'
			},
			// Custom font sizes
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '0.75rem' }],
				'3xs': ['0.5rem', { lineHeight: '0.625rem' }]
			},
			// Custom animations
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'slide-left': 'slideLeft 0.5s ease-out',
				'slide-right': 'slideRight 0.5s ease-out',
				'scale-in': 'scaleIn 0.5s ease-out',
				'bounce-in': 'bounceIn 0.6s ease-out',
				float: 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(1rem)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-1rem)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideLeft: {
					'0%': { transform: 'translateX(1rem)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				slideRight: {
					'0%': { transform: 'translateX(-1rem)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				bounceIn: {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			// Custom box shadows
			boxShadow: {
				soft: '0 2px 15px rgba(0, 0, 0, 0.08)',
				medium: '0 4px 25px rgba(0, 0, 0, 0.12)',
				large: '0 8px 40px rgba(0, 0, 0, 0.16)',
				glow: '0 0 20px rgba(59, 130, 246, 0.5)'
			},
			// Custom border radius
			borderRadius: {
				'4xl': '2rem'
			}
		}
	},
	plugins: [
		// Custom utilities
		function ({ addUtilities }) {
			addUtilities({
				'.text-gradient': {
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'background-clip': 'text'
				},
				'.bg-gradient-primary': {
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
				},
				'.bg-gradient-secondary': {
					background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
				},
				'.backdrop-blur-glass': {
					'backdrop-filter': 'blur(16px) saturate(180%)',
					'-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
					'background-color': 'rgba(255, 255, 255, 0.75)'
				},
				'.scroll-smooth': {
					'scroll-behavior': 'smooth'
				}
			});
		}
	],
	darkMode: 'class'
};
