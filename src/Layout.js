import React from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import AddNote from './components/AddNote'
const Layout = () => {
  return (
    <BrowserRouter>
        <Navigation/>
        <Routes>
            <Route path="/" element={<AddNote/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Layout