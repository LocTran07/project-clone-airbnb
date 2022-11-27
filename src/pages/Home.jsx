import React from 'react'
import CarouselHome from '../components/molecules/homes/CarouselHome'
import MenuHome from '../components/molecules/homes/MenuHome'
import SubMenuome from '../components/molecules/homes/SubMenuome'

const Home = () => {
  return (
    <div className='Home'>
      <CarouselHome></CarouselHome>
      <MenuHome></MenuHome>
      <SubMenuome></SubMenuome>
    </div>
  )
}

export default Home