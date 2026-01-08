import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { HardDrive, Recycle, ShieldCheck } from 'lucide-react'; // Updated icons

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const features = [
    {
      icon: ShieldCheck, // Changed icon
      title: 'Secure Data Wiping', // Changed title
      description: 'We ensure complete and irreversible erasure of sensitive data from all devices, protecting your privacy and compliance.' // Changed description
    },
    {
      icon: Recycle, // Changed icon
      title: 'Responsible E-Waste Recycling', // Changed title
      description: 'Environmentally friendly disposal and recycling of electronic waste, minimizing ecological impact and promoting sustainability.' // Changed description
    },
    {
      icon: HardDrive, // Changed icon
      title: 'Comprehensive Device Management', // Changed title
      description: 'From initial assessment to certified destruction, we provide end-to-end solutions for all your IT asset disposition needs.' // Changed description
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Eco Secure</h2> {/* Changed text */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over a decade, Eco Secure has been a trusted leader in data wipe and e-waste management services. 
            We provide secure, compliant, and environmentally responsible solutions for businesses and individuals
            looking to protect their data and dispose of electronic assets ethically.
          </p> {/* Changed text */}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;