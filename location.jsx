import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import Map from '@/components/Map';

const Location = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Serenity Lane, Wellness District, CA 90210'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@examplesite.com'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Our Studio</h2>
          <p className="text-xl text-gray-600">We'd love to welcome you to our peaceful sanctuary</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Map />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;