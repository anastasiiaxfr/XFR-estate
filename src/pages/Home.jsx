import Navbar from '../components/navbar/Navbar';
import Hero from '../components/hero/Hero';

const Home = () => {
  return (
    <div>
        <div className="bg" style={{"height": "100vh"}}>
            <Navbar />
            <Hero />
        </div>
      
    </div>
  )
}

export default Home