'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Upload, FileText, CheckCircle2, AlertCircle, ArrowRight,
  Download, RotateCcw, Eye, Edit, Trash2, Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImportPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [importedFile, setImportedFile] = useState<any>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    setImportedFile(file);
    
    // Simulate file processing
    setIsProcessing(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress(100);
        
        // Simulate extracted data
        setTimeout(() => {
          setExtractedData({
            personalInfo: {
              fullName: 'John Developer',
              email: 'john@example.com',
              phone: '+1 (555) 123-4567',
              location: 'San Francisco, CA',
              linkedin: 'linkedin.com/in/johndeveloper'
            },
            summary: 'Experienced software engineer with 8+ years building scalable web applications.',
            experience: [
              {
                company: 'Tech Corp',
                position: 'Senior Developer',
                duration: '2021 - Present',
                description: 'Led development of microservices architecture. Improved API performance by 40%.'
              }
            ],
            education: [
              {
                school: 'State University',
                degree: 'BS Computer Science',
                year: '2016'
              }
            ],
            skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
          });
          setIsProcessing(false);
        }, 1500);
      } else {
        setUploadProgress(Math.floor(progress));
      }
    }, 300);
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Import Resume</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!importedFile ? (
          // Upload Stage
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Import Your Resume</h2>
              <p className="text-muted-foreground">Upload a PDF or DOCX file and we'll extract and structure your information automatically.</p>
            </div>

            {/* Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                dragActive
                  ? 'border-primary/60 bg-primary/5'
                  : 'border-border/40 hover:border-primary/40 hover:bg-background/50'
              }`}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">Drag and drop your file here</h3>
              <p className="text-sm text-muted-foreground mb-6">or click to browse</p>
              
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                className="hidden"
                id="file-input"
              />
              
              <Button asChild>
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Select File
                </label>
              </Button>

              <p className="text-xs text-muted-foreground mt-4">Supports PDF and DOCX files up to 10MB</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Wand2, title: 'Smart Extraction', desc: 'Automatically extract text and structure your CV' },
                { icon: Eye, title: 'Review & Edit', desc: 'Validate extracted information and make corrections' },
                { icon: CheckCircle2, title: 'Ready to Use', desc: 'Convert to editable resume in seconds' }
              ].map((feature, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/40 bg-card/50">
                  <feature.icon className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : !extractedData ? (
          // Processing Stage
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Processing Your Resume</h2>
              <p className="text-muted-foreground">Extracting and analyzing your document...</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{importedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(importedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Processing</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border/40 bg-card/50 space-y-2">
              <p className="text-sm font-medium text-foreground">Steps:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  File uploaded
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary/40" />
                  Extracting text
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-border/40" />
                  Structuring data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-border/40" />
                  AI analysis
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Review Stage
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review Extracted Information</h2>
              <p className="text-muted-foreground">Please verify the extracted data and make any necessary corrections.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left - Extracted Data */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    {Object.entries(extractedData.personalInfo).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-sm font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="text"
                          defaultValue={value as string}
                          className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
                  <textarea
                    defaultValue={extractedData.summary}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Experience */}
                <div className="p-6 rounded-xl border border-border/40 bg-card/50 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Experience</h3>
                  {extractedData.experience.map((exp: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg border border-border/40 bg-background/50 space-y-3">
                      <input
                        type="text"
                        defaultValue={exp.position}
                        placeholder="Position"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                      <input
                        type="text"
                        defaultValue={exp.company}
                        placeholder="Company"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                      <input
                        type="text"
                        defaultValue={exp.duration}
                        placeholder="Duration"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                      <textarea
                        defaultValue={exp.description}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="p-6 rounded-xl border border-border/40 bg-card/50 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Education</h3>
                  {extractedData.education.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg border border-border/40 bg-background/50 space-y-3">
                      <input
                        type="text"
                        defaultValue={edu.degree}
                        placeholder="Degree"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                      <input
                        type="text"
                        defaultValue={edu.school}
                        placeholder="School"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                      <input
                        type="text"
                        defaultValue={edu.year}
                        placeholder="Year"
                        className="w-full px-3 py-2 rounded border border-border bg-background text-foreground text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedData.skills.map((skill: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                        {skill}
                        <button className="hover:opacity-70">×</button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    className="w-full mt-4 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Right - Actions & Summary */}
              <div className="space-y-4">
                <div className="p-6 rounded-xl border border-border/40 bg-card/50 sticky top-20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Extraction Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence Score</span>
                      <span className="font-medium text-foreground">94%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sections Found</span>
                      <span className="font-medium text-foreground">5</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Points</span>
                      <span className="font-medium text-foreground">24</span>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-4 space-y-3">
                    <Button className="w-full gap-2" asChild>
                      <Link href="/editor">
                        <CheckCircle2 className="w-4 h-4" />
                        Continue to Editor
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      setImportedFile(null);
                      setExtractedData(null);
                      setUploadProgress(0);
                    }}>
                      Upload Different File
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/40 bg-card/50">
                  <div className="flex gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Review Important</p>
                      <p className="text-xs text-muted-foreground mt-1">Please verify all extracted information is accurate before proceeding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
