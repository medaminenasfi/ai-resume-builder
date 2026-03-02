'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Download, Eye, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Templates', count: 50 },
    { id: 'modern', label: 'Modern', count: 12 },
    { id: 'professional', label: 'Professional', count: 15 },
    { id: 'creative', label: 'Creative', count: 10 },
    { id: 'minimal', label: 'Minimal', count: 8 },
    { id: 'tech', label: 'Tech', count: 5 },
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Minimal',
      category: 'modern',
      downloads: 1200,
      rating: 4.8,
      reviews: 145,
      image: 'Modern',
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Professional Blue',
      category: 'professional',
      downloads: 890,
      rating: 4.7,
      reviews: 98,
      image: 'Professional',
    },
    {
      id: 3,
      name: 'Creative Bold',
      category: 'creative',
      downloads: 567,
      rating: 4.6,
      reviews: 67,
      image: 'Creative',
    },
    {
      id: 4,
      name: 'Minimalist Clean',
      category: 'minimal',
      downloads: 730,
      rating: 4.9,
      reviews: 112,
      image: 'Minimal',
    },
    {
      id: 5,
      name: 'Tech Startup',
      category: 'tech',
      downloads: 445,
      rating: 4.7,
      reviews: 54,
      image: 'Tech',
    },
    {
      id: 6,
      name: 'Executive Pro',
      category: 'professional',
      downloads: 1050,
      rating: 4.8,
      reviews: 156,
      image: 'Professional',
    },
    {
      id: 7,
      name: 'Bold Creative',
      category: 'creative',
      downloads: 612,
      rating: 4.5,
      reviews: 73,
      image: 'Creative',
    },
    {
      id: 8,
      name: 'Modern Developer',
      category: 'modern',
      downloads: 890,
      rating: 4.8,
      reviews: 102,
      image: 'Modern',
    },
  ];

  const filteredTemplates = templates.filter(
    (t) =>
      (selectedCategory === 'all' || t.category === selectedCategory) &&
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Resume Templates</h1>
          </div>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition text-sm">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Resume Template</h2>
          <p className="text-muted-foreground mb-6">Browse 50+ professionally designed templates. Find the perfect one for your style.</p>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{cat.label}</span>
                    <span className="text-xs text-muted-foreground">{cat.count}</span>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content - Templates Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
              </p>
              <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Most Downloaded</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group rounded-xl border border-border/40 bg-card/50 overflow-hidden hover:border-primary/40 hover:bg-card/80 transition"
                >
                  {/* Template Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 via-transparent to-transparent flex items-center justify-center border-b border-border/40 overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-24 bg-background/50 rounded-lg mx-auto mb-3 border border-border/40" />
                      <p className="text-sm font-medium text-foreground">{template.image}</p>
                    </div>

                    {template.isFeatured && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(template.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-border'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {template.rating} ({template.reviews})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template.downloads.toLocaleString()} downloads
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1 gap-2" asChild>
                        <Link href={`/editor?template=${template.id}`}>
                          <Check className="w-3.5 h-3.5" />
                          Use Template
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
