import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import CipherPanel from "@/components/CipherPanel";

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

      {/* Radial glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Shield size={14} className="text-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              Custom Encryption
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 tracking-tight">
            <span className="text-primary text-glow">AKRO</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto font-body">
            Encrypt and decrypt your messages with the AKRO cipher algorithm.
          </p>
        </motion.div>

        {/* Cipher Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CipherPanel />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-xs font-mono text-muted-foreground/50"
        >
          AKRO Cipher v1.0 — Secure. Simple. Fast.
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
