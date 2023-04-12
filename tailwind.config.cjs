module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  darkMode: ['class', '[data-mode="dark"]'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'true-v': {
          50: '#f0f2fd',
          100: '#e4e8fb',
          200: '#ced4f7',
          300: '#b0b7f1',
          400: '#9093e9',
          500: '#6965db',
          600: '#685ad1',
          700: '#594bb7',
          800: '#493f94',
          900: '#3e3976',
          950: '#252145',
        },
        alto: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d6d6d6',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
          950: '#282828',
        },
      },
      textColor: {
        base: {
          light: '#3d3d3d',
          DEFAULT: '#3d3d3d',
          dark: '#b8b8b8',
        },
      },
    },
  },
};
