import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Zap, Binary, Info, X, User, Code, Key, Shuffle, ArrowDownUp } from "lucide-react";
import CipherPanel from "@/components/CipherPanel";

const bubbles = Array.from({ length: 12 }).map((_, i) => ({
  size: 12 + Math.random() * 40,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 12,
  opacity: 0.2 + Math.random() * 0.25,
  color: i % 3 === 0 ? "hsl(170 100% 45%)" : i % 3 === 1 ? "hsl(300 80% 55%)" : "hsl(200 90% 50%)",
}));

const Index = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Removed scan line */}

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(170 100% 45% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(300 80% 55% / 0.2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Bubbles - CSS animated */}
      {bubbles.map((b, i) => (
        <div
          key={`bubble-${i}`}
          className="pointer-events-none fixed rounded-full animate-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            border: `1.5px solid ${b.color}`,
            background: `radial-gradient(circle at 30% 30%, ${b.color.replace(')', ' / 0.3)')}, transparent 70%)`,
            boxShadow: `0 0 ${b.size / 2}px ${b.color.replace(')', ' / 0.25)')}`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ['--bubble-opacity' as any]: b.opacity,
          }}
        />
      ))}

      {/* Radial glows - static, no animation */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[100px] opacity-40" />
      </div>

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
            <div className="animate-spin" style={{ animationDuration: '10s' }}>
              <Shield size={14} className="text-primary" />
            </div>
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
            <span
              className="text-primary inline-block animate-akro-glow"
            >
              AKRO
            </span>
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
