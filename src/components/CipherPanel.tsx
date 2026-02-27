import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Copy, Check, ArrowRight, Sparkles, Trash2 } from "lucide-react";
import { encrypt, decrypt } from "@/lib/akro";
import { toast } from "sonner";

type Mode = "encrypt" | "decrypt";

const CipherPanel = () => {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }
    setProcessing(true);
    setOutput("");
    // Simulate a short processing delay for dramatic effect
    setTimeout(() => {
      const result = mode === "encrypt" ? encrypt(input) : decrypt(input);
      setOutput(result);
      setProcessing(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Mode Tabs */}
      <div className="flex gap-3 mb-8">
        {(["encrypt", "decrypt"] as const).map((m, idx) => (
          <motion.button
            key={m}
            onClick={() => switchMode(m)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-mono text-sm font-semibold uppercase tracking-widest transition-all duration-300 overflow-hidden
              ${mode === m
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {mode === m && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {m === "encrypt" ? <Lock size={16} /> : <Unlock size={16} />}
              {m}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {mode === "encrypt" ? "Plain Text" : "Encrypted Text"}
              </label>
              {input && (
                <motion.button
                  onClick={() => { setInput(""); setOutput(""); }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(0 70% 55% / 0.3)" }}
                  whileTap={{ scale: 0.93 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider bg-secondary border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all duration-300"
                >
                  <Trash2 size={12} />
                  Clear
                </motion.button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Paste encrypted text here..."}
              rows={5}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
            />
          </motion.div>

          {/* Process Button */}
          <motion.button
            onClick={handleProcess}
            disabled={processing}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(160 100% 45% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-full relative flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-lg font-display font-bold text-base uppercase tracking-wider glow-primary transition-all duration-300 disabled:opacity-70 overflow-hidden"
          >
            {processing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
            <span className="relative z-10 flex items-center gap-3">
              {processing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
              ) : mode === "encrypt" ? (
                <Lock size={18} />
              ) : (
                <Unlock size={18} />
              )}
              {processing ? "Processing..." : mode === "encrypt" ? "Encrypt" : "Decrypt"}
              {!processing && <ArrowRight size={18} />}
            </span>
          </motion.button>

          {/* Output */}
          <AnimatePresence>
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {mode === "encrypt" ? "Encrypted Output" : "Decrypted Output"}
                  </label>
                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(160 100% 45% / 0.3)" }}
                    whileTap={{ scale: 0.93 }}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden border
                      ${copied
                        ? "bg-primary/20 border-primary/40 text-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                      }
                    `}
                  >
                    {copied && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10"
                        initial={{ scale: 0, borderRadius: "50%" }}
                        animate={{ scale: 3, borderRadius: "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 flex items-center gap-2"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          >
                            <Check size={14} />
                          </motion.div>
                          Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 flex items-center gap-2"
                        >
                          <Copy size={14} />
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <motion.div
                  className="bg-muted border border-border border-glow rounded-lg px-4 py-3 font-mono text-sm text-foreground break-all min-h-[80px] select-all"
                  initial={{ borderColor: "hsl(160 100% 45% / 0)" }}
                  animate={{ borderColor: "hsl(160 100% 45% / 0.3)" }}
                  transition={{ duration: 1, repeat: 2, repeatType: "reverse" }}
                >
                  {output}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CipherPanel;
