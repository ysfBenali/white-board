const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}),${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  darkMode: ['class', '[data-mode="dark"]'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
      },
      backgroundColor: {
        fill: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#121212',
        },
        button: {
          muted: withOpacity('--color-button-muted'),
          accent: '#ffffff',
        },
        // input: { DEFAULT: 'var(--color-input)' },
        skin: {},
      },

      textColor: {
        base: {
          light: '#3d3d3d',
          DEFAULT: '#3d3d3d',
          dark: '#b8b8b8',
        },
        muted: {},
        inverted: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#ffffff',
        },
      },

      borderColor: {
        button: {
          muted: withOpacity('--color-button-muted-border'),
        },
        // input: {
        //   DEFAULT: withOpacity('--color-input-border'),
        // },
      },
    },
  },
};
