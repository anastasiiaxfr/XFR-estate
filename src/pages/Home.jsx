import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/hero/Hero';

const Home = () => {
  return (
    <div>
        <div className="bg">
            <Navbar />
            <Hero />
        </div>
      
    </div>
  )
}

export default Home