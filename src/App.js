import React from 'react';
import List from './components/List'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
`;

const theme = {
  colors: {
    primary: "#EC7100",
    secondary: "#097BBA",
    mainBg: "#222",
    contrastText: "#fff",
    wrong: "#FF5722",
    success: "#4CAF50"
  }
}

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <List />
      </ThemeProvider>
    </>
  );
}

export default App;
