import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, FinTech Solutions",
    content: "Vertex Global Tech transformed our legacy infrastructure into a state-of-the-art cloud native platform. The performance gains were immediate and substantial.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, GreenEnergy",
    content: "Their attention to detail in UI/UX design is unmatched. Our conversion rates increased by 40% after the redesign. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Director of Marketing, OmniShop",
    content: "Professional, responsive, and incredibly talented. They delivered our e-commerce application ahead of schedule and under budget.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await api.fetchAll('testimonials');
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(DEFAULT_TESTIMONIALS);
        }
      } catch (e) {
        console.error("Failed to load testimonials", e);
        setItems(DEFAULT_TESTIMONIALS);
      }
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items]);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
        <button onClick={prev} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm border border-white/10">
          <FaChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
        <button onClick={next} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm border border-white/10">
          <FaChevronRight />
        </button>
      </div>

      <div className="overflow-hidden py-12">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 mb-6 rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500">
              <img src={items[index].avatar} alt={items[index].name} className="w-full h-full object-cover rounded-full border-2 border-[#030712]" />
            </div>
            <div className="text-blue-500 text-3xl mb-6 opacity-60">
              <FaQuoteLeft />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-light italic mb-8 max-w-2xl leading-relaxed">
              "{items[index].message}"
            </p>
            <div>
              <h4 className="text-white font-bold text-lg">{items[index].name}</h4>
              <p className="text-blue-400 text-sm font-medium">{items[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
}
