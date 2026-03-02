'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>ResumeAI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="/#templates" className="text-sm text-muted-foreground hover:text-foreground transition">
              Templates
            </Link>
            <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-background/50 rounded-lg transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t border-border/40 pt-4">
            <Link href="/#features" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="/#pricing" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="/#templates" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Templates
            </Link>
            <a href="#docs" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </a>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
