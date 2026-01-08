import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import About from './components/About';
// Add other component imports here (Navbar, Footer, etc.)

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>EcoSecure | Secure Data Destruction</title>
          <meta name="description" content="Certified data erasure and sustainable e-waste management." />
        </Helmet>
        
        <main>
          <Hero />
          <About />
          {/* Add your other sections here */}
        </main>
      </div>
    </HelmetProvider>
  );
}

export default App;