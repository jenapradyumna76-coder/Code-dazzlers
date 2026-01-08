import React from 'react';
import { Wind } from 'lucide-react';

const Footer = ({ sections }) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <div
              className="flex items-center cursor-pointer mb-4"
              onClick={() => scrollToSection('home')}
            >
              <Wind className="w-8 h-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold">Eco Secure</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Find your balance, strength, and inner peace with us.
            </p>
          </div>
          
          <div>
            <span className="font-bold text-lg text-emerald-500 uppercase tracking-wider">Navigate</span>
            <ul className="mt-4 space-y-2">
              {sections.slice(1).map((section) => (
                 <li key={section.id}>
                   <button
                     onClick={() => scrollToSection(section.id)}
                     className="text-gray-300 hover:text-white transition-colors duration-300"
                   >
                     {section.title}
                   </button>
                 </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-lg text-emerald-500 uppercase tracking-wider">Contact</span>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>123 Serenity Lane, CA</li>
              <li>hello@examplesite.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {currentYear} Eco Secure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;