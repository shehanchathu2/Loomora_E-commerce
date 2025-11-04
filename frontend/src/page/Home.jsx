import React from 'react'
import Hero from '../components/Hero';
import LatestColection from '../components/LatestColection';
import TopProducts from '../components/TopProducts';
import FeaturesSection from '../components/FeaturesSection';
import NewsletterBox from '../components/NewsletterBox';
import Footer from '../components/Footer';

const Home = () => {
  const items = Array(8).fill(0); // Show 8 placeholders
  return (
     <div className='mt-14'>
      <Hero />
      <LatestColection />
      <TopProducts />
      <FeaturesSection />
      <NewsletterBox />

    </div>
  )
}

export default Home
