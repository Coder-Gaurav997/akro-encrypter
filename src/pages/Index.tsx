import { motion } from "framer-motion";
import { Shield, Lock, Zap, Binary } from "lucide-react";
import CipherPanel from "@/components/CipherPanel";

const floatingIcons = [
  { icon: Lock, x: "10%", y: "20%", delay: 0 },
  { icon: Zap, x: "85%", y: "15%", delay: 0.5 },
  { icon: Binary, x: "5%", y: "70%", delay: 1 },
  { icon: Shield, x: "90%", y: "65%", delay: 1.5 },
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Scan line effect */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="absolute inset-x-0 h-px bg-primary/10 animate-scan-line" />
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(160 100% 45% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(160 100% 45% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed text-primary/10 hidden md:block"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon size={40 + i * 8} />
        </motion.div>
      ))}

      {/* Particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="pointer-events-none fixed w-1 h-1 rounded-full bg-primary/20 hidden md:block"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <Shield size={14} className="text-primary" />
            </motion.div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Custom Encryption
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <motion.span
              className="text-primary inline-block"
              style={{ textShadow: "0 0 40px hsl(160 100% 45% / 0.6)" }}
              animate={{ textShadow: ["0 0 20px hsl(160 100% 45% / 0.3)", "0 0 40px hsl(160 100% 45% / 0.6)", "0 0 20px hsl(160 100% 45% / 0.3)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              AKRO
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-md mx-auto font-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Encrypt and decrypt your messages with the AKRO cipher algorithm.
          </motion.p>
        </motion.div>

        {/* Cipher Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <CipherPanel />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-xs font-mono text-muted-foreground/50"
        >
          AKRO Cipher v1.0 — Secure. Simple. Fast.
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
