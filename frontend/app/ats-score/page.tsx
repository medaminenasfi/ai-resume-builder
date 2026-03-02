'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle, CheckCircle2, TrendingUp, Lightbulb, Copy,
  ArrowRight, Zap, Target, BarChart3, X, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ATSScorePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      setResults({
        atsScore: 87,
        matchPercentage: 92,
        improvements: [
          { category: 'Keywords', current: 65, target: 95, suggestion: 'Add 5 more ATS keywords from job description' },
          { category: 'Format', current: 90, target: 100, suggestion: 'Remove special characters from section headers' },
          { category: 'Experience Clarity', current: 80, target: 95, suggestion: 'Use more action verbs and quantifiable metrics' },
          { category: 'Skills Match', current: 88, target: 98, suggestion: 'Add "Cloud Architecture" and "Kubernetes"' }
        ],
        matchedKeywords: [
          { keyword: 'React', found: true, impact: 'critical' },
          { keyword: 'Node.js', found: true, impact: 'critical' },
          { keyword: 'AWS', found: false, impact: 'high' },
          { keyword: 'Docker', found: true, impact: 'high' },
          { keyword: 'PostgreSQL', found: true, impact: 'medium' }
        ],
        recommendations: [
          'Reorganize experience to emphasize leadership and impact',
          'Add metrics and numbers to demonstrate achievements',
          'Use the exact job title mentioned in the job posting',
          'Include industry-specific terminology naturally'
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">ATS Score Analyzer</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Optimize Your Resume for ATS</h2>
          <p className="text-muted-foreground">Paste a job description to get an ATS compatibility score and personalized recommendations.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-xl border border-border/40 bg-card/50 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Paste Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription || analyzing}
                className="w-full gap-2"
              >
                <Zap className="w-4 h-4" />
                {analyzing ? 'Analyzing...' : 'Analyze ATS Compatibility'}
              </Button>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border/40 bg-card/50">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                How It Works
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Paste a job description</li>
                <li>2. We analyze keyword match</li>
                <li>3. Get your ATS score</li>
                <li>4. Receive tailored suggestions</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border/40 bg-card/50">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Use complete job posts for best results</li>
                <li>ATS systems skip fancy formatting</li>
                <li>Keywords matter most</li>
                <li>Keep it simple and clear</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="mt-12 space-y-8">
            {/* Score Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl border border-border/40 bg-card/50 text-center">
                <p className="text-sm text-muted-foreground mb-2">ATS Compatibility Score</p>
                <div className="flex items-center justify-center mb-2">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-border"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(results.atsScore / 100) * 2 * Math.PI * 60} ${2 * Math.PI * 60}`}
                        className="text-primary transition-all"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">{results.atsScore}</span>
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{results.atsScore}%</p>
                <p className="text-sm text-muted-foreground mt-2">Good match for this position</p>
              </div>

              <div className="p-8 rounded-xl border border-border/40 bg-card/50">
                <p className="text-sm text-muted-foreground mb-4">Job Description Match</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Overall Match</span>
                      <span className="text-lg font-bold text-primary">{results.matchPercentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border/40 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${results.matchPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full gap-2" asChild>
                    <Link href="/editor">
                      <ArrowRight className="w-4 h-4" />
                      Edit Resume with Suggestions
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Suggestions
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed Improvements */}
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Score Breakdown
              </h3>

              <div className="space-y-4">
                {results.improvements.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg border border-border/40 bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.current}% → {item.target}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border/40 overflow-hidden mb-3">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${item.current}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-500" />
                      {item.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Match */}
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Keyword Match Analysis
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {results.matchedKeywords.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      item.found
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-destructive/20 bg-destructive/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {item.found ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                      <span className="font-medium text-foreground">{item.keyword}</span>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${
                        item.impact === 'critical'
                          ? 'bg-red-500/20 text-red-500'
                          : item.impact === 'high'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.found ? 'Found in your resume' : 'Missing from your resume'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Top Recommendations
              </h3>

              <div className="space-y-3">
                {results.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg border border-border/40 bg-background/50">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
