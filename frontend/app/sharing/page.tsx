'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Share2, Copy, Check, Globe, Lock, Calendar, MoreVertical,
  QrCode, Eye, Trash2, Settings, User, Mail, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SharingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const sharedResumes = [
    {
      id: 1,
      title: 'Senior Developer Resume',
      visibility: 'public',
      link: 'https://airesume.app/view/abc123',
      views: 234,
      created: '2024-02-28',
      sharedWith: ['recruiter@techcorp.com']
    },
    {
      id: 2,
      title: 'Product Manager CV',
      visibility: 'private',
      link: 'https://airesume.app/view/def456',
      views: 0,
      created: '2024-02-27',
      sharedWith: []
    }
  ];

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Share & Collaborate</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Share Your Resume</h2>
          <p className="text-muted-foreground">Get feedback from colleagues and recruiters with secure sharing links.</p>
        </div>

        {/* Quick Share Card */}
        <div className="p-8 rounded-xl border border-border/40 bg-card/50 mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-6">Share a Resume</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Select Resume</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>Senior Developer Resume</option>
                <option>Product Manager CV</option>
                <option>UX Designer Resume</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Share With</label>
              <input
                type="email"
                placeholder="Enter email address(es)"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple emails with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Visibility</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'public', label: 'Public Link', desc: 'Anyone with the link can view', icon: Globe },
                  { id: 'private', label: 'Private Link', desc: 'Only invited people can view', icon: Lock }
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-background/50 cursor-pointer hover:bg-background/80 transition">
                    <input type="radio" name="visibility" defaultChecked={option.id === 'public'} className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Generate Sharing Link
            </Button>
          </div>
        </div>

        {/* Shared Resumes */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Your Shared Resumes</h3>
          <div className="space-y-4">
            {sharedResumes.map((resume) => (
              <div key={resume.id} className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-semibold text-foreground">{resume.title}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        resume.visibility === 'public'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-yellow-500/10 text-yellow-600'
                      }`}>
                        {resume.visibility === 'public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {resume.visibility.charAt(0).toUpperCase() + resume.visibility.slice(1)}
                      </span>
                    </div>

                    {/* Share Link */}
                    <div className="mb-4 p-3 rounded-lg border border-border/40 bg-background/50">
                      <p className="text-xs text-muted-foreground mb-2">Share Link</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-foreground truncate">{resume.link}</code>
                        <button
                          onClick={() => handleCopyLink(resume.link, resume.id.toString())}
                          className="flex-shrink-0 p-2 rounded-lg hover:bg-background transition"
                        >
                          {copied === resume.id.toString() ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => setShowQR(showQR === resume.id.toString() ? null : resume.id.toString())}
                          className="flex-shrink-0 p-2 rounded-lg hover:bg-background transition"
                        >
                          <QrCode className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* QR Code */}
                    {showQR === resume.id.toString() && (
                      <div className="mb-4 p-4 rounded-lg border border-border/40 bg-background/50">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/10 to-transparent rounded-lg flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-primary/40" />
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-2">Scan to view resume</p>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {resume.views} views
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Created {resume.created}
                      </div>
                      {resume.sharedWith.length > 0 && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <User className="w-4 h-4" />
                          {resume.sharedWith.length} {resume.sharedWith.length === 1 ? 'person' : 'people'}
                        </div>
                      )}
                    </div>

                    {/* Shared With */}
                    {resume.sharedWith.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/40">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Shared with:</p>
                        <div className="flex flex-wrap gap-2">
                          {resume.sharedWith.map((email, i) => (
                            <div key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {email}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:flex-col">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Tips */}
        <div className="mt-12 p-8 rounded-xl border border-primary/20 bg-primary/5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Collaboration Best Practices</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Use private links when sharing with specific recruiters or hiring managers</span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Monitor view counts to see when recruiters have reviewed your resume</span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Update your resume regularly and revoke old sharing links</span>
            </li>
            <li className="flex gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Request feedback from mentors and colleagues to improve your resume</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
