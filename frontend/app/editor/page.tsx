'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, Download, Share2, Sparkles, Eye, EyeOff, Plus, Trash2,
  ChevronDown, Settings, RefreshCw, Copy, ArrowLeft, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditorPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const [resume, setResume] = useState({
    personal: {
      fullName: 'John Developer',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Senior software engineer with 8+ years of experience in full-stack development. Passionate about building scalable applications and mentoring junior developers.',
    },
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Senior Developer',
        duration: 'Jan 2021 - Present',
        description: 'Led development of microservices architecture for 50+ services. Improved API response time by 40%.',
      },
    ],
    education: [
      {
        id: 1,
        school: 'State University',
        degree: 'BS Computer Science',
        year: '2016',
        details: 'GPA: 3.8/4.0, Honors Graduate',
      },
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
  });

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Resume Editor</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Rewrite
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
            {/* Section Navigation */}
            <div className="flex gap-2 flex-wrap">
              {(['personal', 'experience', 'education', 'skills'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeSection === section
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-background border border-border/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Personal Section */}
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                {[
                  { label: 'Full Name', key: 'fullName' },
                  { label: 'Email', key: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Location', key: 'location' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={resume.personal[field.key as keyof typeof resume.personal] as string}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Professional Summary</label>
                  <textarea
                    defaultValue={resume.personal.summary}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Experience</h2>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-lg border border-border/40 bg-card/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{exp.position}</h3>
                      <button className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input type="text" defaultValue={exp.company} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="Company" />
                    <input type="text" defaultValue={exp.duration} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="Duration" />
                    <textarea defaultValue={exp.description} rows={3} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="Description" />
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Education</h2>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-lg border border-border/40 bg-card/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{edu.degree}</h3>
                      <button className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input type="text" defaultValue={edu.school} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="School" />
                    <input type="text" defaultValue={edu.year} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="Year" />
                    <input type="text" defaultValue={edu.details} className="w-full px-3 py-2 rounded border border-border bg-background text-sm" placeholder="Details" />
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Skills</h2>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                      {skill}
                      <button className="hover:opacity-70">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="w-96 border-l border-border/40 bg-card/30 p-8 overflow-y-auto">
            <div className="bg-white text-black rounded-lg shadow-lg p-8 space-y-6 font-serif">
              {/* Header */}
              <div className="text-center border-b border-gray-300 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">{resume.personal.fullName}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {resume.personal.email} • {resume.personal.phone} • {resume.personal.location}
                </p>
              </div>

              {/* Summary */}
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{resume.personal.summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-xs text-gray-600">{edu.year}</span>
                    </div>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    <p className="text-xs text-gray-600">{edu.details}</p>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
                <p className="text-sm text-gray-700">{resume.skills.join(' • ')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Preview Button */}
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
