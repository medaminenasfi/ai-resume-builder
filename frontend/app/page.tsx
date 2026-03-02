'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, FileText, BarChart3, Wand2, Chrome, CheckCircle2, Users, Trophy, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">ResumeAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</Link>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
            <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition">Help</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(80,60,200,0.1),rgba(80,60,200,0))]" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Resume Builder</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Build Your Perfect <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Resume</span> in Minutes
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Leverage AI to craft compelling resumes, optimize for ATS systems, and stand out to recruiters with professional templates and intelligent suggestions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup" className="gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login" className="gap-2">
                Demo: demo@example.com
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 text-sm">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">No Credit Card</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">AI Powered</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">100% Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to create a standout resume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wand2, title: 'AI Content Suggestions', desc: 'Get intelligent recommendations to enhance your resume content' },
              { icon: Zap, title: 'ATS Optimization', desc: 'Automatically optimize for Applicant Tracking Systems' },
              { icon: FileText, title: '50+ Templates', desc: 'Choose from professionally designed, modern templates' },
              { icon: BarChart3, title: 'Score Analysis', desc: 'Real-time feedback on resume quality and completeness' },
              { icon: Chrome, title: 'One-Click Export', desc: 'Download as PDF, DOCX, or share via link' },
              { icon: Users, title: 'Expert Tips', desc: 'Industry insights and best practices integrated' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/40 bg-background/50 hover:bg-background/80 hover:border-primary/40 transition">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500K+</div>
            <div className="text-muted-foreground">Resumes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">95%</div>
            <div className="text-muted-foreground">User Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Professional Templates</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">AI Support</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Product Manager', text: 'ResumeAI helped me land 3 interviews in one week!' },
              { name: 'Mike Chen', role: 'Software Engineer', text: 'The ATS optimization feature is game-changing.' },
              { name: 'Emma Davis', role: 'Marketing Specialist', text: 'Professional templates saved me hours of work.' },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/40 bg-background/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Trophy key={i} className="w-4 h-4 text-primary fill-primary" />)}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, upgrade anytime</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'Free', features: ['1 Resume', '5 Templates', 'Basic Editor', 'PDF Export'] },
              { name: 'Professional', price: '$9.99', sub: '/month', features: ['Unlimited Resumes', '50+ Templates', 'AI Suggestions', 'ATS Optimization', 'Priority Support'], highlight: true },
              { name: 'Enterprise', price: '$99', sub: '/month', features: ['Everything Pro', 'Team Collaboration', 'Custom Branding', 'API Access', 'Dedicated Support'] },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-xl border transition ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border/40 bg-background/50'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-1">{plan.price}</div>
                {plan.sub && <p className="text-sm text-muted-foreground mb-6">{plan.sub}</p>}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Build Your Perfect Resume?</h2>
          <p className="text-lg text-muted-foreground">Join thousands of job seekers who have landed their dream jobs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup" className="gap-2">
                Get Started Free <Rocket className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-bold">ResumeAI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered resume builder for modern job seekers</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition">Features</Link></li>
                <li><a href="#" className="hover:text-foreground transition">Templates</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition">Help & Support</Link></li>
                <li><a href="#" className="hover:text-foreground transition">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition">Terms</Link></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
