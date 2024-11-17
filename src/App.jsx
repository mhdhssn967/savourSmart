import React from 'react'
import Header from './components/Header'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RecipeFinder from './pages/RecipeFinder.jsx'
import YourRecipe from './pages/YourRecipe.jsx'


Header
const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/recipefinder' element={<RecipeFinder />}/>
        <Route path='/yourrecipe' element={<YourRecipe />}/>
      </Routes>
    </div>
  )
}

export default App 
