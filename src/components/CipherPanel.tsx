import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Copy, Check, ArrowRight } from "lucide-react";
import { encrypt, decrypt } from "@/lib/akro";
import { toast } from "sonner";

type Mode = "encrypt" | "decrypt";

const CipherPanel = () => {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [key, setKey] = useState("KEY");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }
    if (!key.trim()) {
      toast.error("Please enter an encryption key");
      return;
    }
    const result = mode === "encrypt" ? encrypt(input, key) : decrypt(input, key);
    setOutput(result);
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
      <div className="flex gap-2 mb-8">
        {(["encrypt", "decrypt"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-mono text-sm font-semibold uppercase tracking-widest transition-all duration-300
              ${mode === m
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }
            `}
          >
            {m === "encrypt" ? <Lock size={16} /> : <Unlock size={16} />}
            {m}
          </button>
        ))}
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Key Input */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            Encryption Key
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your secret key..."
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Input */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            {mode === "encrypt" ? "Plain Text" : "Encrypted Text"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Paste encrypted text here..."}
            rows={5}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Process Button */}
        <button
          onClick={handleProcess}
          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-lg font-display font-bold text-base uppercase tracking-wider glow-primary hover:brightness-110 transition-all duration-300 active:scale-[0.98]"
        >
          {mode === "encrypt" ? <Lock size={18} /> : <Unlock size={18} />}
          {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          <ArrowRight size={18} />
        </button>

        {/* Output */}
        {output && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {mode === "encrypt" ? "Encrypted Output" : "Decrypted Output"}
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-muted border border-border border-glow rounded-lg px-4 py-3 font-mono text-sm text-foreground break-all min-h-[80px] select-all">
              {output}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CipherPanel;
