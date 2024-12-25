export const content = ['./index.html', './src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
    },
    fontSize: {
      sm: 'var(--font-sm)',
      md: 'var(--font-md)',
      lg: 'var(--font-lg)',
      xl: 'var(--font-xl)',
      sub: 'var(--font-sub)',
      head: 'var(--font-head)',
    },
  },
};
export const plugins = [];
