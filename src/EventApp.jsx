import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'

const EventApp = () => {
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  )
}

export default EventApp