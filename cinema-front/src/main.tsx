import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { theme } from './assets/styles/theme.tsx'
import { ThemeProvider } from 'styled-components'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>

)
