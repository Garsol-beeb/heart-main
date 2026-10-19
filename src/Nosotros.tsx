import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface NosotrosProps {
  onBack: () => void;
}

export default function Nosotros({ onBack }: NosotrosProps) {
  const fotos = [
    { src: '/Primera_foto.jpeg', alt: 'Momento 1' },
    { src: '/Segunda_foto.jpeg', alt: 'Momento 2' },
    { src: '/Tercera_foto.jpeg', alt: 'Momento 3' },
    { src: '/Cuarta_foto.jpeg', alt: 'Momento 4' },
    { src: '/Quinta_foto.jpeg', alt: 'Momento 5' },
    { src: '/Sexta_foto.jpeg', alt: 'Momento 6' },
    { src: '/Septima_foto.jpeg', alt: 'Momento 7' },
    { src: '/Octava_foto.jpeg', alt: 'Momento 8' },
    { src: '/Novena_foto.jpeg', alt: 'Momento 9' },
    { src: '/Foto_10.jpeg', alt: 'Momento 10' },
    { src: '/Foto_11.jpeg', alt: 'Momento 11' },
    { src: '/Foto_12.jpeg', alt: 'Momento 12' },
    { src: '/Foto_13.jpeg', alt: 'Momento 13' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#050505] text-white font-mono p-6 md:p-12 flex flex-col items-center relative z-20 overflow-y-auto selection:bg-pink-deep/30"
    >
      <div className="scanline" />

      {/* Botón de regresar con el estilo terminal */}
      <div className="w-full max-w-5xl flex justify-start mb-8">
        <button
          onClick={onBack}
          className="group flex items-center justify-between gap-3 px-6 py-3 border border-pink-deep/30 bg-pink-deep/5 hover:bg-pink-deep/10 text-pink-soft transition-all duration-300 pointer-events-auto cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="transition-transform font-mono tracking-widest uppercase text-sm">Regresar</span>
          <span className="terminal-cursor" />
        </button>
      </div>

      <h1 className="text-xl md:text-2xl font-mono tracking-widest text-pink-200 uppercase mb-8 text-center">
        Todo es más hermoso a tu lado mi vida, mi ley❤ 
        
      </h1>

      {/* Galería de fotos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {fotos.map((foto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="border border-pink-500/40 rounded-xl overflow-hidden bg-black/60 backdrop-blur-xs p-2 shadow-lg"
          >
            <img 
              src={foto.src} 
              alt={foto.alt} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}