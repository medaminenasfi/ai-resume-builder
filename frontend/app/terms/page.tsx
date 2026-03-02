'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the AI Resume Builder website and services, you accept and agree to be bound by and comply with these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on AI Resume Builder for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on the AI Resume Builder website are provided on an 'as is' basis. AI Resume Builder makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
                fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall AI Resume Builder or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                or due to business interruption) arising out of the use or inability to use the materials on the AI Resume Builder website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on the AI Resume Builder website could include technical, typographical, or photographic errors. AI Resume Builder does not 
                warrant that any of the materials on its website are accurate, complete, or current. AI Resume Builder may make changes to the materials contained 
                on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                AI Resume Builder has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
                The inclusion of any link does not imply endorsement by AI Resume Builder of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                AI Resume Builder may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be 
                bound by the then current version of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions and any separate agreements we may enter into to provide the Services are governed by and construed in accordance 
                with the laws of the jurisdiction in which we are located.
              </p>
            </section>
          </div>

          <div className="border-t border-border/40 pt-8">
            <Link 
              href="/privacy"
              className="text-primary hover:text-primary/80 transition font-medium"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
