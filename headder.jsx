import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wind } from 'lucide-react';

const Header = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <Wind className={`w-8 h-8 transition-colors duration-300 ${isScrolled ? 'text-emerald-600' : 'text-white'}`} />
              <span className={`ml-2 text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Eco Secure
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {sections.slice(1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-base font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden"
          >
            <div className="pt-24 px-4 flex flex-col items-center space-y-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-2xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;