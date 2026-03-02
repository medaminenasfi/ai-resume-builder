'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, Filter, Briefcase, MapPin, DollarSign, Clock,
  Star, Trash2, Share2, BookmarkPlus, MoreVertical,
  ExternalLink, Copy, Mail, Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JobOffersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const jobOffers = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      salary: '$150,000 - $200,000',
      posted: '2 days ago',
      deadline: '30 days',
      saved: true,
      applied: false,
      matchScore: 94,
      description: 'We are looking for an experienced React developer with 5+ years of experience...'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$120,000 - $160,000',
      posted: '5 days ago',
      deadline: '15 days',
      saved: true,
      applied: true,
      matchScore: 87,
      description: 'Join our fast-growing startup building SaaS products for enterprises...'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'New York, NY',
      salary: '$140,000 - $180,000',
      posted: '1 week ago',
      deadline: '10 days',
      saved: true,
      applied: false,
      matchScore: 76,
      description: 'Manage and optimize our cloud infrastructure using AWS and Kubernetes...'
    },
  ];

  const filteredOffers = jobOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'applied' && offer.applied) ||
                         (filterStatus === 'saved' && offer.saved && !offer.applied);
    return matchesSearch && matchesFilter;
  });

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Saved Job Offers</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Job Opportunities</h2>
          <p className="text-muted-foreground mb-6">
            Manage your saved job offers from LinkedIn, Indeed, and other platforms. Use our ATS analyzer to match your resume.
          </p>

          {/* Search & Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'saved', 'applied'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    filterStatus === status
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-background border border-border/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {status === 'all' ? 'All Offers' : status === 'saved' ? 'Saved' : 'Applied'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No job offers found</h3>
            <p className="text-muted-foreground">Start saving job offers to build your opportunities list</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="group p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left - Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">{offer.title}</h3>
                        <p className="text-sm text-muted-foreground">{offer.company}</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {offer.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        {offer.salary}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Posted {offer.posted}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {offer.deadline} left
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{offer.description}</p>
                  </div>

                  {/* Right - Actions & Match Score */}
                  <div className="flex sm:flex-col items-center gap-3 sm:items-end">
                    {/* Match Score */}
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{offer.matchScore}%</div>
                          <div className="text-xs text-muted-foreground">Match</div>
                        </div>
                      </div>
                      <span className={`inline-block text-xs px-2 py-1 rounded ${
                        offer.applied ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {offer.applied ? 'Applied' : 'Not Applied'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition sm:opacity-100">
                      <Button size="sm" variant="outline" className="gap-1.5" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <Mail className="w-4 h-4" />
                        <span className="hidden sm:inline">Apply</span>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 p-6 rounded-xl border border-border/40 bg-card/50">
          <h3 className="font-semibold text-foreground mb-4">Your Application Statistics</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Saved', value: jobOffers.length },
              { label: 'Applications', value: jobOffers.filter(o => o.applied).length },
              { label: 'Avg Match Score', value: Math.round(jobOffers.reduce((a, o) => a + o.matchScore, 0) / jobOffers.length) + '%' },
              { label: 'Pending', value: jobOffers.filter(o => !o.applied).length }
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 rounded-lg border border-border/40 bg-background/50">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
