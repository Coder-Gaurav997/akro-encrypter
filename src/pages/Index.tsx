import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Zap, Binary, Info, X, User, Code, Key, Shuffle, ArrowDownUp } from "lucide-react";
import CipherPanel from "@/components/CipherPanel";

const floatingIcons = [
  { icon: Lock, x: "10%", y: "20%", delay: 0 },
  { icon: Zap, x: "85%", y: "15%", delay: 0.5 },
  { icon: Binary, x: "5%", y: "70%", delay: 1 },
  { icon: Shield, x: "90%", y: "65%", delay: 1.5 },
  { icon: Key, x: "15%", y: "85%", delay: 2 },
  { icon: Shuffle, x: "80%", y: "45%", delay: 0.8 },
];

const bubbles = Array.from({ length: 30 }).map((_, i) => ({
  size: 8 + Math.random() * 40,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 10,
  opacity: 0.05 + Math.random() * 0.12,
}));

const Index = () => {
  const [showAbout, setShowAbout] = useState(false);

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
          backgroundImage: `linear-gradient(hsl(45 100% 55% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(45 100% 55% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Bubbles */}
      {bubbles.map((b, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="pointer-events-none fixed rounded-full border border-primary/20"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
          }}
          animate={{
            y: [0, -(window.innerHeight + b.size + 100)],
            x: [0, Math.sin(i) * 60, 0],
            opacity: [0, b.opacity, b.opacity, 0],
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-primary/10" />
        </motion.div>
      ))}

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
        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
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
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon size={40 + i * 8} />
        </motion.div>
      ))}

      {/* Particle dots */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="pointer-events-none fixed rounded-full bg-primary/20 hidden md:block"
          style={{
            width: 1 + Math.random() * 3,
            height: 1 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* About AKRO Button - Top Right */}
      <motion.button
        onClick={() => setShowAbout(true)}
        className="fixed top-5 right-5 z-40 flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(45 100% 55% / 0.2)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Info size={14} />
        About AKRO
      </motion.button>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAbout(false)}
            />
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-8 overflow-y-auto max-h-[85vh] shadow-2xl"
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <motion.button
                  onClick={() => setShowAbout(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ rotate: 90, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield size={28} className="text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                    About <span className="text-primary text-glow">AKRO</span>
                  </h2>
                  <p className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                    ASCII Keyed Reversal Obfuscation
                  </p>
                </motion.div>

                {/* Creator */}
                <motion.div
                  className="flex items-center gap-4 bg-secondary/50 border border-border rounded-xl p-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                    <User size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-0.5">Created by</p>
                    <p className="text-lg font-display font-bold text-foreground">Gaurav Pandey</p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">
                    AKRO is a lightweight encryption and obfuscation algorithm. It transforms readable text into encoded data using ASCII conversion, a repeating key cipher, random junk insertion, and sequence reversal. The process is fully reversible.
                  </p>
                </motion.div>

                {/* How It Works */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <Code size={14} />
                    How It Works
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: "1", title: "ASCII Conversion", desc: "Convert each character to its ASCII numeric value.", icon: Code },
                      { step: "2", title: "Key Encryption", desc: "Add repeating key ASCII values to each number.", icon: Key },
                      { step: "3", title: "Junk Insertion", desc: "Insert random letters after every third value for obfuscation.", icon: Shuffle },
                      { step: "4", title: "Sequence Reversal", desc: "Reverse the entire sequence to complete encryption.", icon: ArrowDownUp },
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        className="flex items-start gap-3 bg-muted/50 border border-border/50 rounded-lg p-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.1 }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
                          <item.icon size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-display font-semibold text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {["ASCII-based encoding", "Repeating key cipher", "Random obfuscation", "Fully reversible", "Modular design"].map((f, i) => (
                      <motion.span
                        key={f}
                        className="bg-primary/10 border border-primary/20 text-primary text-xs font-mono px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.85 + i * 0.05 }}
                      >
                        {f}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Note */}
                <motion.p
                  className="mt-6 text-xs text-muted-foreground/60 font-mono text-center border-t border-border/50 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  This project is for educational purposes and learning encryption concepts.
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              style={{ textShadow: "0 0 40px hsl(45 100% 55% / 0.6)" }}
              animate={{ textShadow: ["0 0 20px hsl(45 100% 55% / 0.3)", "0 0 50px hsl(45 100% 55% / 0.7)", "0 0 20px hsl(45 100% 55% / 0.3)"] }}
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
