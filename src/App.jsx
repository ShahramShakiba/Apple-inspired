import Hero from './components/Hero';
import Navbar from './components/Navbar';
import HighLights from './components/HighLights';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <HighLights />
    </main>
  );
};

export default App;
