import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lock, Heart as HeartIcon, Sparkles } from 'lucide-react';
import TextHeart from './components/TextHeart';
import Nosotros from './Nosotros';


const Typewriter = ({ text, delay = 50, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span className="font-mono">{currentText}</span>;
};

export default function App() {
  const [stage, setStage] = useState<'console' | 'reveal'>('console');
  const [showAnswer, setShowAnswer] = useState(false);
  const [consoleFinished, setConsoleFinished] = useState(false);
  const [page, setPage] = useState<'main' | 'nosotros'>('main');
  const [audio] = useState(() => {
    
    const a = new Audio('public_musica/Quizás, Porque.mp3'); 
    a.loop = true; 
    a.volume = 1; 
    return a;
  });

  // Función para iniciar la música y pasar a la pantalla principal
  const handleStartWithMusic = () => {
    audio.play().catch(e => console.log("Error de reproducción de audio:", e));
    setStage('reveal');
  };
  const handleReveal = useCallback(() => {
    if (stage === 'console' && consoleFinished) {
      audio.play().catch(e => console.log("Error de audio:", e));
      setStage('reveal');
    }
  }, [stage, consoleFinished]);
  
  if (page === 'nosotros') {
    return <Nosotros onBack={() => setPage('main')} />;
  }

  return (
    <div 
      onClick={handleReveal}
      className={`relative min-h-screen w-full flex items-center justify-center bg-[#050505] selection:bg-pink-deep/30 ${stage === 'console' && consoleFinished ? 'cursor-pointer' : ''}`}
    >
      <div className="scanline" />
      
      <AnimatePresence mode="wait">
        {stage === 'console' ? (
          <motion.div
            key="console"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl p-8 font-mono text-sm md:text-base text-white/80"
          >
            <div className="space-y-2">
              <div className="flex gap-2 font-mono text-purple-300">
                <Typewriter 
                  text="Tengo Algo para ti mi bizcochito" 
                  delay={30} 
                  onComplete={() => setConsoleFinished(true)}
                />
              </div>
              
              <div className="flex gap-2 h-6">
               <span className="text-pink-200 font-mono">
                  <Typewriter 
                    text="Para ti mi amor"
                    delay={60}
                    onComplete={() => setConsoleFinished(true)}
                   />
                </span>
              </div>

              {consoleFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 flex flex-col items-start gap-6 animate-pulse-8"
                >
                  
                  
                  <button
                    id="decrypt-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartWithMusic();
                    }}
                    className="group flex items-center gap-3 px-6 py-3 border border-pink-deep/30 bg-pink-deep/5 hover:bg-pink-deep/10 text-pink-soft transition-all duration-300 pointer-events-auto"
                  >
                    <Lock size={16} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-mono tracking-widest uppercase text-xs">Muak</span>
                    <span className="terminal-cursor" />
                  </button>
                  
                  <p className="text-[10px] text-white/20 ">
                    (Dale click amor)
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full min-h-screen md:h-screen flex flex-col items-center justify-start md:justify-center overflow-y-auto md:overflow-hidden p-4 md:p-0 z-10"
          >
            <TextHeart />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3, duration: 3 }}
              className="z-20 text-center my-4 md:my-0"
            >
             
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setStage('console');
                }}
                className="text-white/20 hover:text-white/60 transition-colors uppercase text-[10px] tracking-widest font-mono"
              >
                Re-encrypt
              </motion.button>
            </motion.div>

            {/* Subtle tech overlays */}
            
            <motion.div 
            initial={{ opacity: 1}}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative md:absolute md:top-8 md:left-6 w-full max-w-sm text-center md:text-left text-sm font-mono text-white/80 tracking-wider whitespace-pre-line leading-relaxed z-20 my-4 md:my-0 bg-black/40 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none p-4 md:p-0 rounded-xl border border-white/10 md:border-none"
>
             <Typewriter 
            text={"♡Eres la mejor novia de todo el mundo mi amor,\nestoy tan feliz de ya tener 6 mesesotes a tu lado mi vida,\nde verdad que te amo con toda mi alma,\nno se que hice para merecer a alguien tan fabulosa como tú mi amor.♡\n\n♡Te amo tantisimo, \neres todo lo lindo y bonito de mi vida corazoncito,\ngracias por estar siempre para mi corazon\ndesde que te conozco solo soy feliz y más feliz,\n quiero pasar toda mi vida contigo, apoyandote\n amandote, cuidandote, se que la vida la quiero si es contigo\nespero que t guste esta página jijijij, especialmente hecha para ti mi amor, te amo musho\nFELICES 6 MESES MI AMOR TE AMUUUU VAMOS A ESTAR JUNTITOS TODA LA VIDAAA MUEJEJE TE LLENARE DE BESITOS PARA SIEMPRE MUAAAAAACK.♡"} 
             delay={52}
             />
            </motion.div>
            <div className="h-15 md:hidden w-full pointer-events-none" />
           
{/* NOSOTROS BOTON */}
<motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative md:absolute md:top-6 md:left-1/2 md:-translate-x-1/2 z-30 my-4 md:my-0 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPage('nosotros');
                }}
                className="group flex items-center justify-center min-w-[140px] px-6 py-3 border border-pink-deep/30 bg-pink-deep/5 hover:bg-pink-deep/10 text-pink-soft transition-all duration-300 pointer-events-auto cursor-pointer whitespace-nowrap"
              >
                <span className="transition-transform font-mono tracking-widest uppercase text-sm">Nosotros</span>
                <span className="terminal-cursor" />
              </button>
            </motion.div>
            
                {/* BOTON DE QUE ME GUSTA DE TI */}
             <motion.div 
            initial={{ opacity: 1}}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative md:absolute md:top-8 md:right-90 w-full md:w-auto font-mono text-white/80 tracking-wider whitespace-pre-line leading-relaxed z-20 mb-8 md:mb-0 flex flex-col items-center md:items-start"
>
             
             <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 flex flex-col items-start gap-6 animate-pulse-8"
                >
                  
              <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="relative md:absolute md:top-5 md:left-0 w-full max-w-sm font-mono text-white/80 tracking-wider whitespace-pre-line leading-relaxed z-20 pointer-events-auto flex flex-col items-center md:items-start gap-4"
>
            <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-start gap-4"
  >
                  <button
                       id="decrypt-button"
                      onClick={(e) => {
                        e.stopPropagation();
                      setShowAnswer(true);
                           }}
      className="group flex items-center justify-between w-full max-w-[280px] md:max-w-none md:min-w-[200px] px-6 py-3 border border-pink-deep/30 bg-pink-deep/5 hover:bg-pink-deep/10 text-pink-soft transition-all duration-300 pointer-events-auto cursor-pointer whitespace-nowrap mx-auto md:mx-0"
    >
      <span className="transition-transform font-mono tracking-widest uppercase text-sm">¿Qué me gusta de ti?</span>
      <span className="terminal-cursor" />
    </button>

             {showAnswer && (
                  <div className="ffont-mono text-center text-sm text-white-200 tracking-wider whitespace-pre-line leading-relaxed pt-2 w-full max-w-[280px] md:max-w-none mx-auto md:mx-0">
                  <Typewriter 
                      text={"Tu forma de ser\nTu carita linda\nTu corazon\nTu inteligencia\nTu valentia\nTu fortaleza\nTu perseverancia\nTu voz\nTu forma de caminar\nTu forma de expresarte\nTus chistes\nTu forma de amarme\nTu silencio\nTu ruido\nTu sonrisa\nTu risa\nTus regalos\nTus ojos\nTu nariz\nTus labios\nTus besos\nME GUSTA TODITO DE TI AMORCITO\nTE AMO TODITAAAA"} 
                     delay={52} 
                />
               </div>
             )}
         </motion.div>
      </motion.div>
      
                 
              
              </motion.div>
            

            </motion.div>
            
            <div className="absolute bottom-8 right-8 text-[10px] font-mono text-white/10 uppercase tracking-widest">
                Eres mi todo 
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

