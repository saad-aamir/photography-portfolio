"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

const quickReplies = [
  "What are your prices?",
  "Where do you shoot?",
  "How do I book?",
  "What's included?",
];

function getBotResponse(input: string): string {
  const msg = input.toLowerCase();

  // Pricing
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("package") || msg.includes("rate")) {
    return "We offer three packages:\n\n📷 Package A — £100 (30 min, 5 edited images, up to 4 people)\n📷 Package B — £135 (45 min, 8 edited images, up to 4 people) — Most Popular\n📷 Package C — £199 (1 hour, 15 edited images, up to 6 people)\n\nVisit our Pricing page for full details!";
  }

  // Location
  if (msg.includes("where") || msg.includes("location") || msg.includes("area") || msg.includes("cover") || msg.includes("sussex") || msg.includes("brighton") || msg.includes("crawley") || msg.includes("horsham")) {
    return "We cover locations across Sussex including Ardingly, Brighton & Hove, Burgess Hill, Crawley, Haywards Heath, Hassocks, Horsham, Three Bridges, Balcombe, and Lindfield. Sessions are at an outdoor location of your choice — we can also recommend spots!";
  }

  // Booking
  if (msg.includes("book") || msg.includes("appointment") || msg.includes("schedule") || msg.includes("reserve") || msg.includes("available")) {
    return "We'd love to hear from you! You can reach us at tenandscale@gmail.com or call +44 7413 565121. You can also message us on Instagram @sussexlightphotography. We'll get back to you as soon as possible to arrange your session!";
  }

  // What's included
  if (msg.includes("include") || msg.includes("what do i get") || msg.includes("standard") || msg.includes("gallery")) {
    return "All sessions include:\n\n✓ A private online gallery with high-res edited images\n✓ Natural, candid direction — no stiff poses\n✓ An outdoor location of your choice across Sussex\n✓ Pets are always welcome, completely free of charge!";
  }

  // Pets
  if (msg.includes("pet") || msg.includes("dog") || msg.includes("cat") || msg.includes("animal")) {
    return "Absolutely! Pets are always welcome at every session, completely free of charge. We love having furry family members in the photos! 🐾";
  }

  // Contact
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("call") || msg.includes("reach")) {
    return "You can reach us at:\n\n📧 tenandscale@gmail.com\n📞 +44 7413 565121\n📸 Instagram: @sussexlightphotography\n\nWe're always happy to chat!";
  }

  // About
  if (msg.includes("about") || msg.includes("who are") || msg.includes("tell me about") || msg.includes("your story") || msg.includes("min") || msg.includes("zen")) {
    return "We're Sussex Light Photography — a photography duo based in Sussex. Min brings creative direction and vision, while Zen brings 5+ years of photography experience across Europe and Asia. We specialise in natural, heartfelt family and portrait photography.";
  }

  // How long / turnaround
  if (msg.includes("how long") || msg.includes("turnaround") || msg.includes("when will") || msg.includes("deliver") || msg.includes("ready")) {
    return "We typically deliver your edited images within 1–2 weeks after your session via a private online gallery. If you need them sooner, just let us know and we'll do our best!";
  }

  // Family / couples / children
  if (msg.includes("family") || msg.includes("couple") || msg.includes("children") || msg.includes("kid") || msg.includes("baby") || msg.includes("wedding")) {
    return "We love photographing families, couples, and children! Our style is natural and relaxed — we focus on real moments and genuine connection rather than stiff poses. Whether it's a family afternoon, a couple's portrait, or a milestone birthday, we're here for it.";
  }

  // Thank you
  if (msg.includes("thank") || msg.includes("cheers") || msg.includes("appreciate")) {
    return "You're very welcome! If you have any other questions, don't hesitate to ask. We'd love to work with you! 😊";
  }

  // Greeting
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good afternoon")) {
    return "Hello! Welcome to Sussex Light Photography. 👋 How can I help you today? Feel free to ask about our packages, locations, or anything else!";
  }

  // Default
  return "Thanks for your message! For specific enquiries, please reach out to us at tenandscale@gmail.com or call +44 7413 565121. We'd be happy to help!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi there! 👋 I'm the Sussex Light Photography assistant. Ask me about our packages, locations, or how to book!",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text: text.trim(), from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot responds after a short delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#6BAB80] text-black flex items-center justify-center shadow-lg hover:bg-[#5a9a6f] transition-colors"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with us"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-[90] w-[350px] max-w-[calc(100vw-3rem)] bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "480px" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6BAB80]/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6BAB80" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sussex Light</p>
                <p className="text-[10px] text-[#6BAB80]">Usually replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-[#6BAB80] text-black rounded-br-md"
                        : "bg-white/5 text-white/70 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies (show only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-[#6BAB80]/30 text-[#6BAB80] hover:bg-[#6BAB80]/10 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-white/5 flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-white/5 rounded-full px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:bg-white/8 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#6BAB80] text-black flex items-center justify-center shrink-0 hover:bg-[#5a9a6f] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
