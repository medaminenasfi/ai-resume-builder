'use client';

import Link from 'next/link';
import { Search, ChevronRight, Mail, MessageCircle, HelpCircle, BookOpen, Video, Users, Send, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      articles: [
        { title: 'How to create your first resume', slug: 'create-resume' },
        { title: 'Choosing a template', slug: 'choose-template' },
        { title: 'Signing up and logging in', slug: 'signup-login' },
      ],
    },
    {
      title: 'Resume Editing',
      icon: HelpCircle,
      articles: [
        { title: 'Editing your resume content', slug: 'edit-content' },
        { title: 'Formatting and styling', slug: 'formatting' },
        { title: 'Uploading an existing resume', slug: 'upload-resume' },
      ],
    },
    {
      title: 'AI Features',
      icon: MessageCircle,
      articles: [
        { title: 'Understanding AI rewrites', slug: 'ai-rewrites' },
        { title: 'Improving your ATS score', slug: 'ats-score' },
        { title: 'Using the content optimizer', slug: 'optimizer' },
      ],
    },
    {
      title: 'Account & Billing',
      icon: Mail,
      articles: [
        { title: 'Changing your password', slug: 'password' },
        { title: 'Subscription plans explained', slug: 'plans' },
        { title: 'Managing payment methods', slug: 'payment' },
      ],
    },
  ];

  const resources = [
    {
      icon: Video,
      title: 'Video Tutorials',
      desc: 'Step-by-step guides for all features',
      link: '#'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      desc: 'Comprehensive documentation',
      link: '#'
    },
    {
      icon: Users,
      title: 'Community Forum',
      desc: 'Connect with other users',
      link: '#'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      desc: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      desc: 'Typically respond in 2 hours',
      action: 'Send Email'
    },
    {
      icon: Users,
      title: 'Phone Support',
      desc: 'Mon-Fri, 9AM-6PM EST',
      action: 'Call Us'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  const faqs = [
    {
      q: 'How many resumes can I create?',
      a: 'With our Free plan, you can create unlimited resumes. There are no limits on the number of resumes you can build and manage.',
    },
    {
      q: 'What is ATS and why does it matter?',
      a: 'ATS (Applicant Tracking System) is software used by recruiters to scan and filter resumes. Our ATS score helps ensure your resume passes these systems.',
    },
    {
      q: 'Can I download my resume as a PDF?',
      a: 'Yes! You can download your resume in PDF or Word format. Premium users get access to more export options.',
    },
    {
      q: 'How does the AI rewrite feature work?',
      a: 'Our AI analyzes your content and suggests improvements for clarity, impact, and professional tone. You can accept or reject individual suggestions.',
    },
    {
      q: 'Can I share my resume with others?',
      a: 'Yes! You can share your resume via a link, and viewers can download or provide feedback. You can revoke access anytime.',
    },
    {
      q: 'Is my data secure?',
      a: 'We use enterprise-grade encryption and security measures. Your resume data is private and only you can access it.',
    },
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(cat => cat.articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition text-sm">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How can we help?</h2>
          <p className="text-lg text-muted-foreground mb-6">Search our knowledge base or contact our support team</p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Quick Links */}
        {searchTerm === '' && (
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {resources.map((resource, i) => {
              const Icon = resource.icon;
              return (
                <a
                  key={i}
                  href={resource.link}
                  className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition group"
                >
                  <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.desc}</p>
                </a>
              );
            })}
          </div>
        )}

        {/* Categories */}
        {searchTerm === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div key={category.title} className="rounded-xl border border-border/40 bg-card/50 p-6 hover:bg-card/80 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.slug}>
                        <Link href={`/help/${article.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                          <ChevronRight className="w-4 h-4" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm !== '' && filteredCategories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Search Results</h2>
            <div className="space-y-3">
              {filteredCategories.map((category) =>
                category.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${article.slug}`}
                    className="block p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-foreground font-medium">{article.title}</h3>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{category.title}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {searchTerm !== '' && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        )}

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-border/40 bg-card/50 p-6 cursor-pointer">
                <summary className="flex items-center justify-between font-medium text-foreground">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition" />
                </summary>
                <p className="text-muted-foreground mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">{method.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{method.desc}</p>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    {method.action}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="p-8 rounded-xl border border-primary/20 bg-primary/5">
          <h3 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">Get tips, tutorials, and feature updates delivered to your inbox</p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <Button className="gap-2">
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Sent
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
