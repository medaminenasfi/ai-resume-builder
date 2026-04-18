'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, FileText, Sparkles, LogOut, Bell, Settings, Search,
  MoreVertical, Edit, Download, Share2, Trash2, Eye, Copy,
  BarChart3, Clock, Zap, Upload, Mail, Briefcase, Menu, X, User
} from 'lucide-react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { useAuth } from '../../src/contexts/auth.context';

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'resumes' | 'letters'>('resumes');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const resumes = [
    {
      id: 1,
      title: 'Senior Developer Resume',
      template: 'Modern',
      created: '2024-02-28',
      updated: '2024-02-28',
      status: 'published',
      views: 234,
      score: 89
    },
    {
      id: 2,
      title: 'Product Manager CV',
      template: 'Professional',
      created: '2024-02-27',
      updated: '2024-02-27',
      status: 'published',
      views: 156,
      score: 76
    },
    {
      id: 3,
      title: 'UX Designer Resume',
      template: 'Creative',
      created: '2024-02-26',
      updated: '2024-02-26',
      status: 'draft',
      views: 0,
      score: 62
    },
  ];

  const letters = [
    {
      id: 1,
      title: 'Cover Letter - Tech Company',
      resumeTitle: 'Senior Developer Resume',
      created: '2024-02-28',
      updated: '2024-02-28',
      status: 'published',
      views: 5,
    },
    {
      id: 2,
      title: 'Cover Letter - Startup',
      resumeTitle: 'Product Manager CV',
      created: '2024-02-27',
      updated: '2024-02-27',
      status: 'published',
      views: 0,
    },
  ];

  const navItems = [
    { id: 'resumes', label: 'My Resumes', icon: FileText, count: resumes.length },
    { id: 'letters', label: 'Cover Letters', icon: Mail, count: letters.length },
  ];

  const stats = [
    { label: 'Total Resumes', value: '3', icon: FileText },
    { label: 'Views This Month', value: '890', icon: Eye },
    { label: 'Avg. Score', value: '76%', icon: Zap },
    { label: 'Templates Used', value: '3', icon: Sparkles },
  ];

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resumes..."
                className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="icon" asChild>
              <Link href="/settings">
                <Settings className="w-5 h-5" />
              </Link>
            </Button>

            <Button variant="outline" size="icon" asChild title="Profile">
              <Link href="/profile">
                <User className="w-5 h-5" />
              </Link>
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l border-border/40">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user?.email.split('@')[0]}</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className={`fixed md:sticky top-16 left-0 h-full w-64 border-r border-border/40 bg-card/30 backdrop-blur transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-30`}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">{item.count}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.email.split('@')[0]}!</h2>
                <p className="text-muted-foreground">
                  {activeSection === 'resumes' ? 'Build, edit, and manage your professional resumes' : 'Create and manage your cover letters'}
                </p>
              </div>
              {activeSection === 'resumes' && (
                <Button size="lg" className="gap-2 mt-4 sm:mt-0" onClick={() => setShowNewModal(true)}>
                  <Plus className="w-5 h-5" />
                  Create New Resume
                </Button>
              )}
              {activeSection === 'letters' && (
                <Button size="lg" className="gap-2 mt-4 sm:mt-0" asChild>
                  <Link href="/letters/new">
                    <Plus className="w-5 h-5" />
                    Create Letter
                  </Link>
                </Button>
              )}
            </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Import Resume</h3>
            <p className="text-sm text-muted-foreground">Upload your existing resume to get started</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">AI Suggestions</h3>
            <p className="text-sm text-muted-foreground">Get AI-powered content recommendations</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Analytics</h3>
            <p className="text-sm text-muted-foreground">Track your resume performance</p>
          </div>
          
          <Link href="/profile" className="block">
            <div className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">My Profile</h3>
              <p className="text-sm text-muted-foreground">View all info & change password</p>
            </div>
          </Link>
        </div>

          {/* Resumes Section */}
          {activeSection === 'resumes' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Your Resumes</h3>
                <p className="text-muted-foreground">You have {resumes.length} resume{resumes.length !== 1 ? 's' : ''}</p>
              </div>

              {resumes.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-border/40 p-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h3>
                  <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
                  <Button onClick={() => setShowNewModal(true)}>Create Resume</Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="group p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground truncate">{resume.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              resume.status === 'published' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {resume.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Updated {resume.updated}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {resume.views} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              Score: {resume.score}%
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Template: {resume.template}</p>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition sm:opacity-100">
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Letters Section */}
          {activeSection === 'letters' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Your Cover Letters</h3>
                <p className="text-muted-foreground">You have {letters.length} cover letter{letters.length !== 1 ? 's' : ''}</p>
              </div>

              {letters.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-border/40 p-12 text-center">
                  <Mail className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No cover letters yet</h3>
                  <p className="text-muted-foreground mb-6">Create your first cover letter to get started</p>
                  <Button asChild>
                    <Link href="/letters/new">Create Letter</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {letters.map((letter) => (
                    <div key={letter.id} className="group p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground truncate">{letter.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              letter.status === 'published' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {letter.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Updated {letter.updated}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {letter.views} views
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Linked to: {letter.resumeTitle}</p>
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
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upgrade Banner */}
          <div className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Unlock Premium Features</h3>
                <p className="text-sm text-muted-foreground">Get unlimited resumes, AI suggestions, and advanced analytics</p>
              </div>
              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Create Resume Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border/40 max-w-md w-full p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Create New Resume</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {['Modern', 'Professional', 'Creative', 'Minimal'].map((template) => (
                <button
                  key={template}
                  className="p-4 rounded-lg border border-border/40 bg-background/50 hover:border-primary/40 hover:bg-background transition text-center"
                >
                  <div className="w-12 h-16 bg-border/40 rounded mb-2 mx-auto" />
                  <p className="text-sm font-medium text-foreground">{template}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowNewModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1">Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
