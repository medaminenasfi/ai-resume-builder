'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Zap, Target, CheckCircle2, ArrowRight, Copy, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AIToolsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const tools = [
    {
      id: 'rewrite',
      name: 'AI Rewrite',
      description: 'Enhance your resume content with AI-powered suggestions for better clarity and impact.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      stats: { used: 156, remaining: 44 },
      href: '/ai-tools/rewrite',
    },
    {
      id: 'ats-score',
      name: 'ATS Score',
      description: 'Get your resume ATS score and detailed recommendations to improve compatibility with applicant tracking systems.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      stats: { score: 87, improvements: 3 },
      href: '/ai-tools/ats-score',
    },
    {
      id: 'optimize',
      name: 'Content Optimizer',
      description: 'Optimize your resume with keyword suggestions and industry-specific recommendations.',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      stats: { keywords: 24, coverage: 92 },
      href: '/ai-tools/optimize',
    },
  ];

  if (!user) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">AI Tools</h1>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Supercharge Your Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our AI-powered tools to enhance content, improve ATS compatibility, and optimize for success.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group">
              <div className="h-full rounded-xl border border-border/40 bg-card/50 overflow-hidden hover:border-primary/40 hover:bg-card/80 transition p-6 space-y-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-border/40">
                  {'used' in tool.stats && (
                    <p className="text-xs text-muted-foreground">
                      {tool.stats.used}/{tool.stats.used + tool.stats.remaining} uses remaining
                    </p>
                  )}
                  {'score' in tool.stats && (
                    <p className="text-xs text-muted-foreground">
                      Current Score: <span className="text-primary font-semibold">{tool.stats.score}%</span>
                    </p>
                  )}
                  {'keywords' in tool.stats && (
                    <p className="text-xs text-muted-foreground">
                      {tool.stats.keywords} keywords • {tool.stats.coverage}% coverage
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Button className="w-full gap-2 group-hover:translate-x-1 transition">
                  Use Tool
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Usage & Quota */}
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly AI Usage</h3>
          <div className="space-y-4">
            {[
              { label: 'Rewrites', used: 156, total: 200, percentage: 78 },
              { label: 'ATS Analyses', used: 8, total: 10, percentage: 80 },
              { label: 'Optimizations', used: 45, total: 100, percentage: 45 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.used}/{item.total}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-background overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 gap-2">
            <Sparkles className="w-4 h-4" />
            Upgrade to Unlimited
          </Button>
        </div>
      </main>
    </div>
  );
}
