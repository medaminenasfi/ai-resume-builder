'use client';

import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: '5 ATS Optimization Tips to Get Your Resume Past Screening Systems',
    excerpt: 'Learn how to structure your resume to pass automated applicant tracking systems and increase your chances of landing an interview.',
    category: 'ATS',
    author: 'Sarah Johnson',
    date: '2024-02-28',
    readTime: '8 min read',
    image: '/blog-ats.jpg'
  },
  {
    id: 2,
    title: 'Cover Letter Secrets: How to Write One That Gets Noticed',
    excerpt: 'A comprehensive guide to writing compelling cover letters that complement your resume and showcase your personality to hiring managers.',
    category: 'Cover Letters',
    author: 'Michael Chen',
    date: '2024-02-25',
    readTime: '6 min read',
    image: '/blog-cover.jpg'
  },
  {
    id: 3,
    title: 'Career Transition: Adapting Your Resume for a New Industry',
    excerpt: 'Discover strategies for repositioning your skills and experience when changing careers, with real examples and templates.',
    category: 'Career Tips',
    author: 'Emma Williams',
    date: '2024-02-22',
    readTime: '10 min read',
    image: '/blog-career.jpg'
  },
  {
    id: 4,
    title: 'The Science of Resume Design: What Actually Works',
    excerpt: 'Research-backed insights on resume formatting, colors, and typography that increase readability and create lasting impressions.',
    category: 'Design',
    author: 'James Rodriguez',
    date: '2024-02-20',
    readTime: '7 min read',
    image: '/blog-design.jpg'
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-xl font-bold text-foreground">Blog</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Resume & Career Insights</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Expert tips, strategies, and best practices to help you create the perfect resume and advance your career.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group rounded-xl border border-border/40 bg-card/50 overflow-hidden hover:bg-card/80 transition"
            >
              {/* Featured Image */}
              <div className="h-40 bg-gradient-to-br from-primary/10 via-transparent to-transparent flex items-center justify-center border-b border-border/40">
                <BookOpen className="w-12 h-12 text-primary/40" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/40">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author}
                  </div>
                  <div>{article.readTime}</div>
                </div>

                {/* CTA */}
                <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:bg-transparent hover:text-primary/80 gap-2" asChild>
                  <Link href={`/blog/${article.id}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </main>
    </div>
  );
}
