import Hero from './components/Hero';
import Model from './components/Model';
import Navbar from './components/Navbar';
import HighLights from './components/HighLights';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <HighLights />
      <Model />
    </main>
  );
};

export default App;
