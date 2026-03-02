'use client';

import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share2, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogArticle({ params }: { params: { id: string } }) {
  const article = {
    id: params.id,
    title: '5 ATS Optimization Tips to Get Your Resume Past Screening Systems',
    excerpt: 'Learn how to structure your resume to pass automated applicant tracking systems.',
    category: 'ATS',
    author: 'Sarah Johnson',
    date: '2024-02-28',
    readTime: '8 min read',
    content: `
# ATS Optimization: The Complete Guide

In today's job market, your resume often needs to pass through an Applicant Tracking System (ATS) before a human ever sees it. These automated systems screen thousands of resumes daily, and if yours doesn't meet specific criteria, you'll never get a chance to interview. Let's explore how to optimize your resume for ATS success.

## 1. Use Simple Formatting

The biggest mistake job seekers make is relying on fancy formatting. While a beautifully designed resume might impress humans, ATS systems can't read:
- Complex graphics and text boxes
- Colored fonts and highlights
- Headers and footers
- Tables and columns
- Unusual fonts

**Best Practice:** Use a simple, clean format with standard fonts like Arial, Calibri, or Times New Roman. Stick to black text on a white background.

## 2. Optimize Your Keywords

ATS systems scan for specific keywords that match the job description. If your resume doesn't contain these keywords, you won't advance, regardless of your qualifications.

**Action Items:**
- Review the job description carefully
- Identify key skills and requirements
- Mirror the language in your resume
- Use industry-specific terminology
- Avoid acronyms unless they appear in the job posting

## 3. Structure Your Resume Properly

Use clear section headings and organize information logically. The standard structure should include:
- Contact Information
- Professional Summary
- Experience
- Education
- Skills
- Certifications (optional)

## 4. Use Bullet Points Effectively

Organize your experience with bullet points rather than paragraphs. Each bullet should start with an action verb and include specific achievements:

❌ "Responsible for managing the development team"
✅ "Led cross-functional team of 8 engineers to deliver project 2 weeks ahead of schedule"

## 5. Include Relevant Metrics

ATS systems favor concrete numbers and percentages. Whenever possible, quantify your achievements:
- Increased sales by 35%
- Reduced processing time from 4 hours to 45 minutes
- Mentored 12 junior developers
- Managed budget of $2.5M

## Final Thoughts

Optimizing for ATS doesn't mean sacrificing quality or authenticity. It means presenting your information in a way that machines can understand while still showcasing your value to human recruiters. Follow these guidelines, and you'll dramatically improve your chances of getting past the initial screening.
    `
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/40 pb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-invert max-w-none">
              <div className="space-y-6 text-foreground">
                {article.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s/, '');
                    const HeadingTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'][level - 1] as any;
                    return (
                      <HeadingTag key={index} className={`font-bold text-foreground mt-8 mb-4 ${
                        level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'
                      }`}>
                        {text}
                      </HeadingTag>
                    );
                  }
                  if (paragraph.trim() === '') return null;
                  if (paragraph.startsWith('✅') || paragraph.startsWith('❌')) {
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-card/50">
                        <span className="text-xl flex-shrink-0">{paragraph.substring(0, 1)}</span>
                        <p>{paragraph.substring(1).trim()}</p>
                      </div>
                    );
                  }
                  return <p key={index} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                })}
              </div>
            </article>

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-border/40 space-y-4">
              <p className="font-medium text-foreground">Share this article</p>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share on LinkedIn
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookmarkPlus className="w-4 h-4" />
                  Save Article
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="p-6 rounded-xl border border-border/40 bg-card/50 sticky top-20">
              <h3 className="font-semibold text-foreground mb-3">Ready to optimize your resume?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our ATS analyzer to get a score and personalized recommendations.
              </p>
              <Button className="w-full" asChild>
                <Link href="/ats-score">Check Your ATS Score</Link>
              </Button>
            </div>

            {/* Related Articles */}
            <div className="p-6 rounded-xl border border-border/40 bg-card/50">
              <h3 className="font-semibold text-foreground mb-4">Related Articles</h3>
              <div className="space-y-3">
                {['Cover Letter Secrets', 'Resume Design Guide', 'Career Transition Tips'].map((title, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block p-2 rounded-lg hover:bg-background/50 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
