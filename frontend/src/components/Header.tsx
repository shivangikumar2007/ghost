/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Heart, Zap, User, Sparkles, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FEATURE_ITEMS } from "../data";

interface HeaderProps {
  onOpenWizard: () => void;
  onNavigateToAbout: () => void;
  onNavigateToHowItWorks: () => void;
  onNavigateToLanding?: () => void;
  onShowNotification?: (message: string) => void;
}

export default function Header({ 
  onOpenWizard, 
  onNavigateToAbout, 
  onNavigateToHowItWorks, 
  onNavigateToLanding,
  onShowNotification
}: HeaderProps) {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="w-5 h-5 text-red-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "User":
        return <User className="w-5 h-5 text-sky-400" />;
      case "Sparkles":
        default:
        return <Sparkles className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <header className="relative w-full z-50 py-6 px-6 md:px-12 flex items-center justify-between">
      {/* Brand Logo - Top Left */}
      <div 
        className="flex items-center gap-3 group cursor-pointer" 
        onClick={() => {
          if (onNavigateToLanding) {
            onNavigateToLanding();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Cyan/Aqua theme for GHOST */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-[#00f5d4] to-blue-500 rounded-lg transform rotate-45 scale-90 transition-transform duration-500 group-hover:rotate-90"></div>
          {/* Contrast overlapping accent shape inside */}
          <div className="absolute w-3.5 h-3.5 bg-black rounded-sm transform rotate-45 text-[#00f5d4] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#00f5d4] rounded-full"></div>
          </div>
        </div>
        
        <span className="text-2xl font-bold font-sans tracking-tight text-white select-none">
          GHOST
        </span>
      </div>

      {/* Center Navigation Capsule - Desktop Only */}
      <nav className="hidden md:flex items-center gap-1.5 border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md px-2 py-1.5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        {/* Features Dropdown Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              isFeaturesOpen 
                ? "bg-zinc-900 text-white" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>Features</span>
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isFeaturesOpen ? "rotate-180 text-orange-500" : "text-zinc-400"
              }`} 
            />
          </button>

          {/* Animated Features Dropdown */}
          <AnimatePresence>
            {isFeaturesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 mt-3 w-80 bg-zinc-950/95 border border-zinc-900 backdrop-blur-xl p-3 rounded-2xl shadow-2xl z-50"
              >
                <div className="text-xs font-semibold text-zinc-500 tracking-wider uppercase px-2 py-1">
                  Core Philosophies
                </div>
                <div className="grid grid-cols-1 gap-1.5 mt-2">
                  {FEATURE_ITEMS.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setIsFeaturesOpen(false);
                        if (onShowNotification) {
                          onShowNotification("7-Day History Log Verified");
                        }
                      }}
                      className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer group/item text-left"
                    >
                      <div className="flex gap-2.5 items-start">
                        <div className="mt-0.5 p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg group-hover/item:border-zinc-700 transition-colors">
                          {getFeatureIcon(item.icon)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover/item:text-orange-400 transition-colors">
                            {item.title}
                          </div>
                          <p className="text-xs text-zinc-400 leading-normal mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 border-t border-zinc-900 pt-2 px-1">
                  <div 
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      onOpenWizard();
                    }}
                    className="w-full flex items-center justify-between text-xs text-[#00f5d4] font-semibold px-2 py-1.5 rounded-lg hover:bg-[#00f5d4]/10 cursor-pointer transition-colors"
                  >
                    <span>Request human-first audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => {
            onNavigateToHowItWorks();
            if (onShowNotification) {
              onShowNotification("7-Day History Log Verified");
            }
          }}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer hover:bg-zinc-900/50"
        >
          How It Works
        </button>

        <button 
          onClick={onNavigateToAbout}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer hover:bg-zinc-900/50"
        >
          About
        </button>

        <button 
          onClick={onOpenWizard}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer hover:bg-zinc-900/50"
        >
          Product
        </button>

        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onShowNotification) {
              onShowNotification("7-Day History Log Verified");
            }
          }}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer hover:bg-zinc-900/50 flex items-center gap-1.5"
        >
          <span>Blogs</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
        </a>
      </nav>

      {/* Right Action Button - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={onOpenWizard}
          className="relative inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-zinc-200 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-900 p-6 flex flex-col gap-4 md:hidden z-40 outline-none"
          >
            <div className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Navigator</div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFeaturesOpen(!isFeaturesOpen);
              }}
              className="flex justify-between items-center text-left text-lg text-white font-medium"
            >
              <span>Features Dropdown</span>
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToHowItWorks();
                if (onShowNotification) {
                  onShowNotification("7-Day History Log Verified");
                }
              }}
              className="text-left text-lg text-white font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToAbout();
              }}
              className="text-left text-lg text-white font-medium"
            >
              About
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="text-left text-lg text-white font-medium"
            >
              Product
            </button>
            <div className="h-[1px] bg-zinc-900 w-full my-1"></div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="w-full bg-white text-black py-3 rounded-full font-bold text-center hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
