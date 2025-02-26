import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EventApp from './EventApp.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <EventApp/>
    </Provider>
  </StrictMode>,
)
