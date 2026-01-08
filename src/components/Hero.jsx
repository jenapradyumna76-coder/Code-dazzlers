import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the navigation tool
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast.js';
import { Shield, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const { toast } = useToast();
  const navigate = useNavigate(); // 2. Initialize the "GPS"

  const handleAction = (action) => {
    // 3. Logic to switch pages
    if (action === 'Sign Up') {
      navigate('/signup');
    } else if (action === 'Login') {
      navigate('/login');
    } else {
      // For the "Learn More" button, we can still show a toast
      toast({
        title: "Information",
        description: `Redirecting to ${action} section...`,
      });
    }
  };

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-3xl" />
      </div>

      <div className="container relative px-4 mx-auto mt-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
              Secure Your Data, <br />
              <span className="text-emerald-600">Protect Your Future</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600">
              Certified e-waste management and military-grade data destruction for 
              forward-thinking enterprises.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Buttons now trigger the handleAction logic */}
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => handleAction('Sign Up')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleAction('Login')}
            >
              Client Login
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Shield, title: "Certified Destruction", desc: "NIST 800-88 compliant erasure" },
              { icon: Lock, title: "Secure Chain", desc: "Full audit trail and reporting" },
              { icon: Zap, title: "Zero Landfill", desc: "100% sustainable recycling" }
            ].map((item, i) => (
              <div key={i} className="p-6 transition-all bg-white shadow-sm rounded-2xl hover:shadow-md">
                <item.icon className="w-10 h-10 mb-4 text-emerald-600" />
                <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;