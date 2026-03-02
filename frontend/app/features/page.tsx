'use client';

import Link from 'next/link';
import {
  Zap, Sparkles, Share2, BarChart3, FileText, Lock,
  Check, ChevronRight, Award, Layers, Smartphone, Globe,
  Brain, Rocket, Shield, Users, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const features = [
    {
      category: 'AI-Powered',
      items: [
        {
          icon: Brain,
          title: 'AI Resume Optimizer',
          desc: 'Advanced AI analyzes your resume and suggests improvements for content, formatting, and impact.'
        },
        {
          icon: Sparkles,
          title: 'Smart Content Rewrite',
          desc: 'Get AI-powered suggestions to improve your bullet points and professional descriptions.'
        },
        {
          icon: BarChart3,
          title: 'ATS Score Analysis',
          desc: 'Real-time ATS compatibility scoring to ensure your resume passes automated screening systems.'
        },
        {
          icon: Award,
          title: 'Keyword Optimization',
          desc: 'Automatically match job description keywords to improve visibility in ATS systems.'
        }
      ]
    },
    {
      category: 'Templates & Design',
      items: [
        {
          icon: Layers,
          title: 'Premium Templates',
          desc: 'Choose from 50+ professionally designed resume templates for every industry.'
        },
        {
          icon: FileText,
          title: 'Multiple Formats',
          desc: 'Export your resume as PDF, DOCX, or HTML. All formats are ATS-optimized.'
        },
        {
          icon: Smartphone,
          title: 'Responsive Design',
          desc: 'Templates automatically adjust for mobile viewing and different screen sizes.'
        },
        {
          icon: Zap,
          title: 'One-Click Customization',
          desc: 'Change colors, fonts, and layouts instantly without any design knowledge needed.'
        }
      ]
    },
    {
      category: 'Collaboration & Sharing',
      items: [
        {
          icon: Share2,
          title: 'Easy Sharing',
          desc: 'Generate shareable links to send your resume to recruiters and get feedback.'
        },
        {
          icon: Users,
          title: 'Team Collaboration',
          desc: 'Invite colleagues to review and provide feedback on your resume drafts.'
        },
        {
          icon: BarChart3,
          title: 'View Analytics',
          desc: 'Track who viewed your resume and when with detailed engagement metrics.'
        },
        {
          icon: Globe,
          title: 'Public Profile',
          desc: 'Create a professional online resume profile accessible via a personal URL.'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      items: [
        {
          icon: Lock,
          title: 'Enterprise Security',
          desc: 'Military-grade encryption keeps your personal information completely secure.'
        },
        {
          icon: Shield,
          title: 'Privacy Control',
          desc: 'Full control over who can access and share your resume and personal data.'
        },
        {
          icon: Check,
          title: 'Data Backup',
          desc: 'Automatic daily backups ensure your resume is never lost or compromised.'
        },
        {
          icon: Users,
          title: 'Revoke Access',
          desc: 'Instantly revoke sharing links and control who can view your resume.'
        }
      ]
    }
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 resumes',
        'Basic templates',
        'AI content rewrite',
        'ATS score (limited)',
        'PDF export',
        'Community support'
      ],
      cta: 'Get Started',
      primary: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      features: [
        'Unlimited resumes',
        'All premium templates',
        'Unlimited AI rewrites',
        'Full ATS analysis',
        'All export formats',
        'Sharing & analytics',
        'Priority support',
        'Advanced customization'
      ],
      cta: 'Start Free Trial',
      primary: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      features: [
        'Team accounts',
        'Custom branding',
        'Advanced analytics',
        'API access',
        'Dedicated support',
        'SSO/SAML',
        'Compliance tools',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Features</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered resume building with professional templates, sharing tools, and career insights all in one platform.
          </p>
        </div>

        {/* Features by Category */}
        {features.map((section) => (
          <div key={section.category} className="mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-8">{section.category} Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {section.items.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Comparison Table */}
        <div className="my-16">
          <h3 className="text-3xl font-bold text-foreground mb-8">Plan Comparison</h3>
          <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40 bg-background/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                    {pricing.map((plan) => (
                      <th key={plan.name} className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {[
                    'Resumes',
                    'AI Rewrites',
                    'Templates',
                    'ATS Score',
                    'Export Formats',
                    'Sharing & Analytics',
                    'Support'
                  ].map((feature) => (
                    <tr key={feature} className="hover:bg-background/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{feature}</td>
                      {[
                        { limited: true, text: '3' },
                        { limited: false, text: 'Unlimited' },
                        { limited: false, text: 'Unlimited' }
                      ].map((item, i) => (
                        <td key={i} className="px-6 py-4 text-center">
                          {item.limited ? (
                            <span className="text-xs text-muted-foreground">{item.text}</span>
                          ) : (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="my-16">
          <h3 className="text-3xl font-bold text-foreground mb-8">Pricing</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 transition ${
                  plan.primary
                    ? 'border-primary bg-primary/5 ring-2 ring-primary relative'
                    : 'border-border/40 bg-card/50 hover:bg-card/80'
                }`}
              >
                {plan.primary && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h4 className="text-xl font-bold text-foreground mb-2">{plan.name}</h4>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <Button className="w-full mb-8">
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-12 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Build Your Perfect Resume?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who've landed their dream jobs with AI Resume Builder. Get started free today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Rocket className="w-5 h-5" />
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/help" className="gap-2">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
