export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    headerBg: string;
  };
  fonts: {
    main: string;
  };
  spacing: (factor: number) => string;
}

export const lightTheme: Theme = {
  name: "light",
  colors: {
    primary: '#ff4d6d',
    secondary: '#ffd6e0',
    background: '#fff0f5',
    text: '#333',
    accent: '#ff7ba3',
    headerBg: '#ffe5ef',
  },
  fonts: {
    main: '"Poppins", sans-serif',
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    primary: '#ff4d6d',
    secondary: '#ffd6e0',
    background: '#1b1b1b',
    text: '#f2f2f2',
    accent: '#ff8cb3',
    headerBg: '#2a2a2a',
  },
  fonts: {
    main: '"Poppins", sans-serif',
  },
  spacing: (factor: number) => `${factor * 8}px`,
};
