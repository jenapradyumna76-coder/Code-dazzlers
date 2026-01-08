import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';

const PracticeCarousel = () => {
  const [ref, isInView] = useInView({
    threshold: 0.2
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const services = [ // Renamed from 'practices' to 'services'
    {
      title: 'Certified Data Destruction',
      description: 'Ensure irreversible erasure of sensitive data from all media types, adhering to global compliance standards.',
      image: <img alt="Server racks with glowing lights, symbolizing secure data destruction" src="https://images.unsplash.com/photo-1695668548342-c0c1ad479aee" />
    },
    {
      title: 'IT Asset Disposition (ITAD)',
      description: 'Comprehensive management of your retired IT assets, from secure data wiping to environmentally responsible disposal.',
      image: <img alt="Stack of old hard drives and electronic components" src="https://images.unsplash.com/photo-1677773936795-3f1a28499570" />
    },
    {
      title: 'Electronic Waste Recycling',
      description: 'Environmentally friendly collection, processing, and recycling of all types of electronic waste, minimizing environmental impact.',
      image: <img alt="Workers sorting electronic waste in a recycling facility" src="https://images.unsplash.com/photo-1519352812055-f5c8d1dc1a8d" />
    },
    {
      title: 'On-Site Data Eradication',
      description: 'We perform data wiping services directly at your premises, providing maximum security and transparency for your sensitive data.',
      image: <img alt="Technician working on a laptop in an office setting" src="https://images.unsplash.com/photo-1654593114209-d915f46be333" />
    },
    {
      title: 'Device Sanitization & Re-purposing',
      description: 'Preparing devices for secure reuse or resale after thorough data sanitization, extending their lifecycle responsibly.',
      image: <img alt="Clean, modern electronic devices ready for reuse" src="https://images.unsplash.com/photo-1677773936795-3f1a28499570" />
    }
  ];

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % services.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="services" ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Services</h2> {/* Updated heading */}
          <p className="text-xl text-gray-600">Specialized solutions for data security and environmental responsibility</p> {/* Updated subheading */}
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{
              opacity: 0,
              x: 100
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -100
            }} transition={{
              duration: 0.5
            }} className="relative h-[500px] md:h-[600px]">
                {services[currentIndex].image} {/* Changed from practices to services */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <motion.h3 initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.2
                }} className="text-3xl md:text-4xl font-bold mb-4">
                    {services[currentIndex].title} {/* Changed from practices to services */}
                  </motion.h3>
                  <motion.p initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.3
                }} className="text-lg md:text-xl text-white/90 max-w-2xl">
                    {services[currentIndex].description} {/* Changed from practices to services */}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button onClick={prevSlide} variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg z-10">
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button onClick={nextSlide} variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg z-10">
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-emerald-600 w-8' : 'bg-gray-300'}`} />)} {/* Changed from practices to services */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeCarousel;