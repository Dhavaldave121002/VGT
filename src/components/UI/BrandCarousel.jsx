import React from 'react';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const BrandCarousel = () => {
  // Fetch from localStorage with a fallback to the default set
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await api.fetchAll('brands');
        if (data && data.length > 0) {
          setBrands(data);
        } else {
          // Fallback if API returns empty (optional, but keeps UI safe)
          setBrands([
            { name: "TechNova", icon: "cpu", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { name: "FinStream", icon: "graph-up-arrow", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { name: "CloudScale", icon: "cloud-check", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
            { name: "SecureNet", icon: "shield-lock", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { name: "DataFlow", icon: "diagram-3", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
            { name: "UrbanArch", icon: "buildings", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { name: "HealthPlus", icon: "heart-pulse", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
            { name: "EduVerse", icon: "mortarboard", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
          ]);
        }
      } catch (e) {
        console.error("Failed to load brands", e);
      }
    };
    loadBrands();
  }, []);

  return (
    <section className="py-16 bg-[#030712] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030712] to-[#030712] pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-10 text-center relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 backdrop-blur-md">
          Trusted By Industry Leaders
        </span>
      </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
        {/* Gradient Masks for smooth fade out */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>

        {/* Infinite Scroll Track */}
        <div className="flex gap-8 items-center whitespace-nowrap animate-infinite-scroll w-max hover:pause py-4">
          {/* Quadruple duplication for ultra-smooth infinite scroll on wide screens */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className={`
                                group relative flex items-center gap-4 px-6 py-4 rounded-2xl 
                                bg-[#0f172a]/40 border border-white/5 backdrop-blur-sm
                                transition-all duration-300 hover:scale-105 hover:bg-[#1e293b]/60 cursor-pointer
                                hover:shadow-lg hover:shadow-blue-500/10
                                ${brand.border} hover:border-opacity-50
                            `}
            >
              <div className={`
                                p-2.5 rounded-xl ${brand.bg} ${brand.color} 
                                transition-colors group-hover:scale-110 duration-300
                            `}>
                <i className={`bi bi-${brand.icon} text-xl`}></i>
              </div>
              <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors font-sans tracking-tight">
                {brand.name}
              </span>

              {/* Subtle Glow Effect on Hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-${brand.color.split('-')[1]}-500/5 to-transparent`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
