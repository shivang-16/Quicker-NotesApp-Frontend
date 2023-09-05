import React, {createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const server = 'https://quicker-notesapp.onrender.com/api/v1'

export const Context = createContext({isAuthenticated: false}) 
const Appwrapper =()=>{
  const [isAuthenticated , setIsAuthenticated] = useState(false)
  const [isLoading , setIsLoading] = useState(false)
  return (
   <Context.Provider value={{ 
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading
  }}>
    <App/>
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>,
)
