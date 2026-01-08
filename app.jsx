import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PracticeCarousel from '@/components/PracticeCarousel';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const sections = {
    hero: { id: 'home', title: 'Home' },
    about: { id: 'about', title: 'About' },
    services: { id: 'services', title: 'Our Services' }, // Renamed from 'practices' to 'services'
    location: { id: 'location', title: 'Location' },
  };

  return (
    <>
      <Helmet>
        <title>Eco Secure - Data Wipe & E-Waste Management</title> {/* Updated title */}
        <meta name="description" content="Eco Secure provides certified data destruction and responsible e-waste recycling services for businesses and individuals." /> {/* Updated description */}
      </Helmet>
      <div className="min-h-screen bg-white">
        <Header sections={Object.values(sections)} />
        <main>
          <div id={sections.hero.id}>
            <Hero />
          </div>
          <div id={sections.about.id}>
            <About />
          </div>
          <div id={sections.services.id}> {/* Updated id to 'services' */}
            <PracticeCarousel />
          </div>
          <div id={sections.location.id}>
            <Location />
          </div>
        </main>
        <Footer sections={Object.values(sections)} />
        <BackToTopButton />
        <Toaster />
      </div>
    </>
  );
}

export default App;