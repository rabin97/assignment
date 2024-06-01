import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ReduxProvider from './Redux/Provider.tsx'
import { MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
