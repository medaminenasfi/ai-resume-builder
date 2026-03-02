'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon, 
  Github, Linkedin, Twitter, Edit, Save, ArrowLeft, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Software Engineer',
    bio: 'Full-stack developer passionate about building scalable applications and mentoring junior engineers.',
    website: 'johndeveloper.com',
    github: 'github.com/johndeveloper',
    linkedin: 'linkedin.com/in/johndeveloper',
    twitter: 'twitter.com/johndeveloper',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`gap-2 ${isEditing ? 'bg-primary/90' : ''}`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="rounded-xl border border-border/40 bg-card/50 p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-foreground">{profile.fullName}</h2>
                <p className="text-muted-foreground">{profile.jobTitle}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', key: 'fullName', icon: User },
                { label: 'Email', key: 'email', icon: Mail, type: 'email' },
                { label: 'Phone', key: 'phone', icon: Phone },
                { label: 'Location', key: 'location', icon: MapPin },
                { label: 'Job Title', key: 'jobTitle', icon: Briefcase },
                { label: 'Website', key: 'website', icon: LinkIcon },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    {field.icon && <field.icon className="w-4 h-4" />}
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    value={profile[field.key as keyof typeof profile]}
                    onChange={(e) =>
                      setProfile({ ...profile, [field.key]: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${
                      !isEditing ? 'opacity-75 cursor-default' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Bio</h3>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={5}
              className={`w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${
                !isEditing ? 'opacity-75 cursor-default' : ''
              }`}
            />
          </div>

          {/* Social Links */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Social Links</h3>
            <div className="space-y-4">
              {[
                { label: 'GitHub', key: 'github', icon: Github },
                { label: 'LinkedIn', key: 'linkedin', icon: Linkedin },
                { label: 'Twitter', key: 'twitter', icon: Twitter },
              ].map((social) => (
                <div key={social.key}>
                  <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </label>
                  <input
                    type="text"
                    placeholder={`your-${social.key}-url`}
                    value={profile[social.key as keyof typeof profile]}
                    onChange={(e) =>
                      setProfile({ ...profile, [social.key]: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${
                      !isEditing ? 'opacity-75 cursor-default' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)} className="gap-2">
                <Save className="w-4 h-4" />
                Save Profile
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
