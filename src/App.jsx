import Hero from './components/Hero';
import Model from './components/Model';
import Navbar from './components/Navbar';
import HighLights from './components/HighLights';
import * as Sentry from '@sentry/react';

const App = () => {
  return <button onClick={() => methodDoesNotExist()}>Break the world</button>;
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <HighLights />
      <Model />
    </main>
  );
};

export default Sentry.withProfiler(App);
