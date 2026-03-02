'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, LineChart, TrendingUp, Users, Eye, Download, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const stats = [
    { label: 'Total Views', value: '2,847', change: '+12.5%', icon: Eye },
    { label: 'Downloads', value: '156', change: '+8.2%', icon: Download },
    { label: 'Shares', value: '89', change: '+15.3%', icon: Share2 },
    { label: 'Avg. Time on Resume', value: '3m 24s', change: '+4.1%', icon: Clock },
  ];

  const resumes = [
    { name: 'Senior Developer', views: 1200, downloads: 89, shares: 34, avgTime: '3:45' },
    { name: 'Product Manager', views: 845, downloads: 56, shares: 28, avgTime: '2:56' },
    { name: 'UX Designer', views: 802, downloads: 11, shares: 27, avgTime: '4:12' },
  ];

  if (!user) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-primary mt-1">{stat.change} from last period</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Views Over Time */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Views Over Time</h3>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[320, 480, 350, 410, 520, 680, 750].map((value, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">Day {i + 1}</span>
                  <div className="flex-1 h-8 rounded bg-background/50 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded"
                      style={{ width: `${(value / 750) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {[
                { stage: 'Shared', count: 890, percentage: 100 },
                { stage: 'Viewed', count: 756, percentage: 85 },
                { stage: 'Downloaded', count: 156, percentage: 20.6 },
              ].map((item) => (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.stage}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-background/50 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/60"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Performance */}
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Resume Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Resume</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Downloads</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Shares</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg. Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {resumes.map((resume) => (
                  <tr key={resume.name} className="hover:bg-background/50 transition">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{resume.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{resume.views}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{resume.downloads}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{resume.shares}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{resume.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-12 rounded-xl border border-border/40 bg-card/50 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-3">
            {[
              'Your "Senior Developer" resume has 42% higher engagement than average',
              'Downloads peak on Tuesday and Wednesday - consider sharing then',
              '68% of viewers spend less than 2 minutes - add a summary section',
              'Adding keywords increased your ATS score by 12 points',
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-background/50">
                <span className="text-primary flex-shrink-0 mt-0.5">→</span>
                <p className="text-sm text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
