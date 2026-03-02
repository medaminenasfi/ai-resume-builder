'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Mail, ArrowLeft, FileText, Clock, Eye, MoreVertical, Edit, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LettersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const letters = [
    {
      id: 1,
      title: 'Cover Letter - Tech Company',
      resumeTitle: 'Senior Developer Resume',
      created: '2024-02-28',
      updated: '2024-02-28',
      status: 'published',
      views: 5,
      preview: 'Passionate software engineer with 8+ years of experience...'
    },
    {
      id: 2,
      title: 'Cover Letter - Startup',
      resumeTitle: 'Product Manager CV',
      created: '2024-02-27',
      updated: '2024-02-27',
      status: 'published',
      views: 0,
      preview: 'Experienced product manager seeking to drive innovation...'
    },
  ];

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Cover Letters</h1>
          </div>
          
          <Button className="gap-2" asChild>
            <Link href="/letters/new">
              <Plus className="w-5 h-5" />
              Create New Letter
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Cover Letters</h2>
            <p className="text-muted-foreground">Create and manage personalized cover letters for your job applications</p>
          </div>
        </div>

        {/* Letters Grid */}
        <div className="space-y-4">
          {letters.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-border/40 p-12 text-center">
              <Mail className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No cover letters yet</h3>
              <p className="text-muted-foreground mb-6">Create your first cover letter to get started</p>
              <Button asChild>
                <Link href="/letters/new">Create Cover Letter</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {letters.map((letter) => (
                <div key={letter.id} className="group p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{letter.title}</h3>
                          <p className="text-sm text-muted-foreground">Linked to: {letter.resumeTitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">{letter.preview}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Updated {letter.updated}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {letter.views} views
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          letter.status === 'published' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {letter.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition sm:opacity-100">
                      <Button variant="outline" size="sm" className="gap-1.5" asChild>
                        <Link href={`/letters/${letter.id}`}>
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-xl border border-border/40 bg-card/50">
          <h3 className="font-semibold text-foreground mb-3">Tips for great cover letters:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Personalize each cover letter for the specific company and role</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Use AI assistance to optimize your tone and match job requirements</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Keep it concise - aim for 3-4 paragraphs</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Link it to your relevant resume version for better organization</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
