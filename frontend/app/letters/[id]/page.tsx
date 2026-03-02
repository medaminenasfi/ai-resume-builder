'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Save, Download, Sparkles, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditLetterPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [letterContent, setLetterContent] = useState({
    title: 'Cover Letter - Tech Company',
    recipientName: 'John Smith',
    recipientTitle: 'Hiring Manager',
    companyName: 'TechCorp Inc.',
    letterDate: '2024-02-28',
    openingParagraph: 'I am writing to express my strong interest in the Senior Software Engineer position at your esteemed organization.',
    bodyParagraph1: 'With over 8 years of experience in full-stack development, I have honed my skills in React, Node.js, and cloud infrastructure.',
    bodyParagraph2: 'Your commitment to innovation aligns perfectly with my career goals, and I am confident I can contribute significantly to your team.',
    closingParagraph: 'Thank you for considering my application. I look forward to discussing how my expertise can benefit TechCorp Inc.',
    senderName: 'John Developer',
    senderEmail: 'john@example.com',
    senderPhone: '+1 (555) 123-4567',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/letters" className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Edit Letter</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Assist
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Panel - Editor */}
        <div className={`flex-1 overflow-y-auto border-r border-border/40 ${showPreview ? 'max-w-md' : 'w-full'}`}>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Letter Title</label>
              <input
                type="text"
                value={letterContent.title}
                onChange={(e) => setLetterContent({...letterContent, title: e.target.value})}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <h3 className="text-sm font-semibold text-foreground">Recipient Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={letterContent.recipientName}
                  onChange={(e) => setLetterContent({...letterContent, recipientName: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Job Title</label>
                  <input
                    type="text"
                    value={letterContent.recipientTitle}
                    onChange={(e) => setLetterContent({...letterContent, recipientTitle: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
                  <input
                    type="text"
                    value={letterContent.companyName}
                    onChange={(e) => setLetterContent({...letterContent, companyName: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <h3 className="text-sm font-semibold text-foreground">Letter Content</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Opening Paragraph</label>
                <textarea
                  value={letterContent.openingParagraph}
                  onChange={(e) => setLetterContent({...letterContent, openingParagraph: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Body Paragraph 1</label>
                <textarea
                  value={letterContent.bodyParagraph1}
                  onChange={(e) => setLetterContent({...letterContent, bodyParagraph1: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Body Paragraph 2</label>
                <textarea
                  value={letterContent.bodyParagraph2}
                  onChange={(e) => setLetterContent({...letterContent, bodyParagraph2: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Closing Paragraph</label>
                <textarea
                  value={letterContent.closingParagraph}
                  onChange={(e) => setLetterContent({...letterContent, closingParagraph: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <h3 className="text-sm font-semibold text-foreground">Your Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={letterContent.senderName}
                  onChange={(e) => setLetterContent({...letterContent, senderName: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={letterContent.senderEmail}
                    onChange={(e) => setLetterContent({...letterContent, senderEmail: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={letterContent.senderPhone}
                    onChange={(e) => setLetterContent({...letterContent, senderPhone: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="w-96 border-l border-border/40 bg-card/30 p-8 overflow-y-auto">
            <div className="bg-white text-black rounded-lg shadow-lg p-8 space-y-4 font-serif text-sm">
              <div className="text-center space-y-1 mb-6">
                <h1 className="font-bold text-gray-900">{letterContent.senderName}</h1>
                <p className="text-xs text-gray-600">
                  {[letterContent.senderEmail, letterContent.senderPhone].filter(Boolean).join(' • ')}
                </p>
              </div>

              <p className="text-xs text-gray-600">{letterContent.letterDate}</p>

              <div className="space-y-0.5 text-xs">
                <p>{letterContent.recipientName}</p>
                <p>{letterContent.recipientTitle}</p>
                <p>{letterContent.companyName}</p>
              </div>

              <div className="space-y-3 text-xs text-gray-700">
                <p>Dear {letterContent.recipientName},</p>
                <p className="whitespace-pre-wrap">{letterContent.openingParagraph}</p>
                <p className="whitespace-pre-wrap">{letterContent.bodyParagraph1}</p>
                <p className="whitespace-pre-wrap">{letterContent.bodyParagraph2}</p>
                <p className="whitespace-pre-wrap">{letterContent.closingParagraph}</p>
                <div className="pt-2">
                  <p>Sincerely,</p>
                  <p className="mt-4">{letterContent.senderName}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowPreview(!showPreview)}
        className="fixed bottom-8 right-8 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-lg flex items-center gap-2"
        title="Toggle preview"
      >
        {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
