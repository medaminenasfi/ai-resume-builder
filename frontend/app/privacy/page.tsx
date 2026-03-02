'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                AI Resume Builder ("we," "us," "our," or "Company") operates the AI Resume Builder website and services. 
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Personal Data:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Resume content and related documents</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AI Resume Builder uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information for improving our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical and security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet 
                or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect 
                your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@airesumeresume.com.
              </p>
            </section>
          </div>

          <div className="border-t border-border/40 pt-8">
            <Link 
              href="/terms"
              className="text-primary hover:text-primary/80 transition font-medium"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
