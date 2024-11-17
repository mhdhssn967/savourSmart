import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <>
    <div id='headerdiv' className='d-flex px-5 pt-3 justify-content-between align-items-center main' style={{backgroundColor:'black'}}>
        <div className='d-flex align-items-center'>
          <img src={logo} alt="" width={'50px'} className='pb-2'/>
          <h3 className="text-white">Savour Smart</h3>
        </div>
        <div>
            <ul id="headerul" className='d-flex' style={{listStyle:'none',marginRight:'200px',fontWeight:'700',color:'red',}}>
               <Link to={'/'} style={{textDecoration:'none'}}><li id='headerli'>Home</li></Link>
                <Link to={'/recipefinder'} style={{textDecoration:'none'}}><li id='headerli'> Recipie Finder</li></Link>
                <Link to={'/yourrecipe'} style={{textDecoration:'none'}}><li id='headerli'>Your Recipies</li></Link>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Header