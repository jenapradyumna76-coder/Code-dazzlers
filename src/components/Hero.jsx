import React from 'react';
import { motion } from 'framer-motion';
// Fixed imports: replaced @ with ./
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Hero = () => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: "Feature coming soon",
      description: `🚧 The ${action} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          alt="Secure data center server room representing data security and management" 
          src="https://images.unsplash.com/photo-1567516847971-81df16eefa90" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Secure Data Destruction & <br/> Responsible E-Waste Recycling
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-3xl mx-auto"
        >
          Protect your sensitive information and the environment. We provide certified data erasure and sustainable electronic waste management solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            onClick={() => handleAction('Sign Up')} 
            size="lg" 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Now
          </Button>
          <Button 
            onClick={() => handleAction('Login')} 
            size="lg" 
            variant="outline"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/50 hover:border-white px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;