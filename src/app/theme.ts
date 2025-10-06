export const theme = {
  colors: {
    primary: '#ff4d6d',
    secondary: '#ffd6e0',
    background: '#fff0f5',
    text: '#333',
  },
  fonts: {
    main: '"Poppins", sans-serif',
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export const lightTheme = {
  name: "light",
  colors: {
    background: "#fff",
    text: "#222",
    accent: "#ff7ba3",
    headerBg: "#ffe5ef",
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
};

export const darkTheme = {
  name: "dark",
  colors: {
    background: "#1b1b1b",
    text: "#f2f2f2",
    accent: "#ff8cb3",
    headerBg: "#2a2a2a",
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
};
