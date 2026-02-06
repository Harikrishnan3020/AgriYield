import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({ count = 8, className }: FloatingParticlesProps) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 12 + Math.random() * 16,
      rotation: Math.random() * 360,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-primary"
          style={{
            left: `${particle.x}%`,
            opacity: particle.opacity,
          }}
          initial={{ 
            y: "110vh", 
            rotate: particle.rotation,
            scale: 0.5,
          }}
          animate={{ 
            y: "-10vh",
            rotate: particle.rotation + 360,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf 
            style={{ width: particle.size, height: particle.size }} 
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Additional subtle circles */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/10"
          style={{
            left: `${20 + i * 20}%`,
            width: 60 + i * 20,
            height: 60 + i * 20,
          }}
          initial={{ y: "120vh", opacity: 0.1 }}
          animate={{ 
            y: "-20vh",
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export { FloatingParticles };
