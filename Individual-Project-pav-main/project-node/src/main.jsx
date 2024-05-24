import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Headers from './Headers'
import Footer from './Footer'
import Content from './Content'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Headers />

    <Footer/>
  </React.StrictMode>,
)
