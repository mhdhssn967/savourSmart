import React, { useEffect, useState } from 'react'
import FeaturedCards from '../components/FeaturedCards'
import Landing from '../components/Landing'


const Home = () => {

  return (
    <>
    <Landing/>
    <h1 style={{color:'red', fontWeight:'100',fontSize:'60px',margin:'30px'}}>Featured Recipes</h1>
    <FeaturedCards />   
    </>
  )
}

export default Home