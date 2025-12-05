import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'


// import providers
import { LocalContextProvider } from './contextapi/local_context'
import { ElectionProvider } from './contextapi/elec_context'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <LocalContextProvider>
        <ElectionProvider>
          <App />
        </ElectionProvider>
      </LocalContextProvider>
    </BrowserRouter>
 
  
)
