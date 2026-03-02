'use client';

import Link from 'next/link';
import { Check, X, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        { label: 'Unlimited resumes', included: true },
        { label: '10 AI rewrites/month', included: true },
        { label: '5 ATS analyses/month', included: true },
        { label: '20+ templates', included: true },
        { label: 'Email support', included: true },
        { label: 'Priority support', included: false },
        { label: 'Advanced analytics', included: false },
        { label: 'Custom branding', included: false },
      ],
      cta: 'Get Started',
      href: '/signup',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For serious job seekers',
      features: [
        { label: 'Unlimited resumes', included: true },
        { label: '100 AI rewrites/month', included: true },
        { label: 'Unlimited ATS analyses', included: true },
        { label: '50+ premium templates', included: true },
        { label: 'Email & chat support', included: true },
        { label: 'Priority support', included: true },
        { label: 'Advanced analytics', included: true },
        { label: 'Custom branding', included: false },
      ],
      cta: 'Start Free Trial',
      href: '/signup?plan=pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and organizations',
      features: [
        { label: 'Everything in Pro', included: true },
        { label: 'Unlimited everything', included: true },
        { label: 'Dedicated account manager', included: true },
        { label: 'Custom integrations', included: true },
        { label: 'SSO & advanced security', included: true },
        { label: '24/7 phone support', included: true },
        { label: 'Advanced analytics', included: true },
        { label: 'Custom branding', included: true },
      ],
      cta: 'Contact Sales',
      href: '#contact',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-foreground">
            ResumeAI
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition text-sm">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your job search. All plans include core resume building features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border overflow-hidden transition ${
                plan.highlighted
                  ? 'border-primary/40 bg-card/80 ring-2 ring-primary/20'
                  : 'border-border/40 bg-card/50 hover:bg-card/80'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-primary to-primary/60 text-primary-foreground py-2 text-center text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8 space-y-8">
                {/* Plan Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  {plan.name === 'Free' && (
                    <p className="text-xs text-muted-foreground mt-2">Always free, no credit card required</p>
                  )}
                  {plan.name === 'Pro' && (
                    <p className="text-xs text-muted-foreground mt-2">Billed monthly • Cancel anytime</p>
                  )}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full ${plan.highlighted ? 'gap-2' : ''}`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  <Link href={plan.href}>
                    {plan.highlighted && <Sparkles className="w-4 h-4" />}
                    {plan.cta}
                  </Link>
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.label} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-foreground'
                            : 'text-muted-foreground/50'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee on annual plans. Contact our support team for details.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
              },
              {
                q: 'Is there a free trial for Pro?',
                a: 'Yes! Pro plan includes a 14-day free trial with full access to all premium features.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg border border-border/40 bg-card/50">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 rounded-xl border border-primary/20 bg-primary/5 p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of job seekers who've landed their dream jobs with ResumeAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
