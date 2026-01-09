import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { SubscribeForm } from "@/components/SubscribeForm";
import { motion } from "framer-motion";
import { 
  Copy, 
  Waves, 
  TrendingUp, 
  Fish, 
  Twitter, 
  Send, 
  MessageSquare, 
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  ExternalLink,
  Check
} from "lucide-react";
import { useCopyToClipboard } from "react-use";
import { useState } from "react";
import heroBanner from "@assets/IMG_0060_1767937540024.jpeg";
import aboutImage from "@assets/IMG_0060_1767937540024.jpeg";

export default function Home() {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard("2CmemgrYpaJCQ1kapMv6PpfePzNZVFmNo53skziV");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${heroBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Red-tinted overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/70 via-red-900/50 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/80">Live on Pump.fun</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-6 leading-tight">
            RIDE THE <br />
            <span className="text-gradient">CRYPTO WAVES</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the community of bold holders surfing the market tides. 
            When they see red, we see <span className="text-primary font-bold">opportunity</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://pump.fun/coin/2CmemgrYpaJCQ1kapMv6PpfePzNZVFmNo53skziVpump" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Buy on Pump.fun <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="https://x.com/i/communities/2009490701898109140"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-foreground rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-200"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      </section>

      {/* About / Lore Section */}
      <section id="about" className="py-20 md:py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl bg-gradient-to-br from-primary/80 to-red-900/80 p-1 rotate-3 shadow-2xl">
                <img 
                  src={aboutImage} 
                  alt="The Red Whales" 
                  className="w-full h-auto rounded-[20px]"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-widest text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>The Lore</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Born in the Depths</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Born in the volatile depths of the crypto ocean, the Red Whale isn't afraid of the dips. While others panic when they see red candles, we ride the waves.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Launching on pump.fun, this is a token for the bold, the brave, and those who know that big risks bring big rewards. We don't just survive the bear market—we thrive in it.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <TrendingDown className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-bold text-lg">Buy the Dip</h4>
                  <p className="text-sm text-muted-foreground">We love red candles</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <Waves className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-bold text-lg">Ride the Wave</h4>
                  <p className="text-sm text-muted-foreground">Volatility is our friend</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Token Info Section */}
      <section id="token" className="py-20 md:py-32 container mx-auto px-4">
        <SectionHeading title="Tokenomics" subtitle="Simple, transparent, and built for the community." />
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Supply", value: "1,000,000", icon: <Fish className="w-6 h-6 text-primary" /> },
            { label: "Symbol", value: "$RedWhale", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
            { label: "Chain", value: "Solana", icon: <Waves className="w-6 h-6 text-primary" /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl glass-panel text-center hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <p className="text-muted-foreground mb-2 font-medium uppercase tracking-wide text-xs">{item.label}</p>
              <h3 className="text-3xl font-bold font-display">{item.value}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-white/10 to-white/5"
        >
          <div className="bg-background rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
              <p className="font-mono text-sm md:text-base break-all text-foreground">2CmemgrYpaJCQ1kapMv6PpfePzNZVFmNo53skziV</p>
            </div>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors border border-white/10 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 md:py-32 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <SectionHeading title="The Voyage" subtitle="Our path through the crypto currents." />
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { 
                phase: "Phase 1", 
                title: "Launch & Splash", 
                items: ["Launch on Pump.fun", "Community Building", "Initial Marketing Push"],
                done: true 
              },
              { 
                phase: "Phase 2", 
                title: "High Tides", 
                items: ["HODL Waves Campaign", "Meme Contests", "Exchange Listings"],
                done: false 
              },
              { 
                phase: "Phase 3", 
                title: "Deep Ocean", 
                items: ["Ecosystem Growth", "NFT Collection", "Strategic Partnerships"],
                done: false 
              }
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative pl-8 md:pl-0 border-l-2 ${phase.done ? "border-primary" : "border-white/10"} md:border-none`}
              >
                <div className="md:flex items-center gap-12">
                  <div className="hidden md:flex flex-col items-center justify-center w-32 shrink-0">
                    <div className={`w-4 h-4 rounded-full ${phase.done ? "bg-primary shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-white/20"} mb-2`} />
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{phase.phase}</span>
                  </div>
                  
                  <div className="flex-1 p-6 md:p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-colors shadow-lg">
                    <div className="md:hidden text-xs font-mono text-primary uppercase tracking-widest mb-2">{phase.phase}</div>
                    <h3 className="text-2xl font-bold font-display mb-4">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-muted-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full ${phase.done ? "bg-primary" : "bg-white/20"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-20 md:py-32 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-primary/10 to-transparent p-1 rounded-3xl">
          <div className="bg-background rounded-[22px] p-8 md:p-16 border border-primary/20">
            <Fish className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Join the School</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Don't swim alone. Join thousands of other whales in our community channels.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { label: "Twitter / X", icon: <Twitter className="w-5 h-5" />, href: "https://x.com/i/communities/2009490701898109140" },
                { label: "Telegram", icon: <Send className="w-5 h-5" />, href: "#" },
                { label: "Discord", icon: <MessageSquare className="w-5 h-5" />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary text-foreground border border-white/10 transition-all flex items-center gap-2 font-medium"
                >
                  {social.icon} {social.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm font-medium mb-4 text-muted-foreground">Get updates on the next big wave</p>
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
             <img src={heroBanner} alt="RedWhale" className="w-8 h-8 rounded-lg object-cover" />
             <span className="text-xl font-bold font-display">$RedWhale</span>
          </div>
          
          <div className="max-w-2xl mx-auto text-sm text-muted-foreground/60 space-y-4">
            <p>Contact: Jerome_devving</p>
            <p className="border-t border-white/5 pt-4 mt-4">
              <AlertTriangle className="w-4 h-4 inline mr-1 text-primary/70" />
              DISCLAIMER: This is a community token for entertainment purposes only. $RedWhale is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. The coin is completely useless and for entertainment purposes only.
            </p>
            <p>&copy; 2026 $RedWhale. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
