import React from 'react';
import { motion } from 'framer-motion';
// Fixed imports: replaced @/ with relative paths
import { useInView } from '../hooks/useInView'; 
import { Shield, Leaf, Globe, Recycle } from 'lucide-react';

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const stats = [
    { label: 'Data Destroyed', value: '100%', icon: Shield },
    { label: 'E-Waste Recycled', value: '500T+', icon: Recycle },
    { label: 'Carbon Offset', value: '1.2k', icon: Leaf },
    { label: 'Global Clients', value: '200+', icon: Globe },
  ];

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Leading the Way in <span className="text-emerald-600">Secure & Sustainable</span> Technology Disposal
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Eco Secure, we believe that data security and environmental responsibility go hand in hand. 
              Our mission is to provide businesses with a seamless, certified solution for retiring 
              their IT assets while ensuring zero data leakage and minimal environmental impact.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <stat.icon className="w-8 h-8 text-emerald-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" 
              alt="Cybersecurity and Green Tech" 
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-2xl hidden md:block">
              <div className="text-4xl font-bold mb-1">10+</div>
              <div className="text-sm opacity-90">Years of Industry<br/>Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;