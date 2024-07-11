import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './global/styles/themes/default'
import { GlobalStyle } from './global/styles/global'
import { Router } from './routes/Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
