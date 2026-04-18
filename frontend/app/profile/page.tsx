'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon, 
  Calendar, Shield, Award, FileText, Settings, LogOut,
  Edit, Save, ArrowLeft, Camera, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { Separator } from '../../src/components/ui/separator';
import { Alert, AlertDescription } from '../../src/components/ui/alert';
import { useAuth } from '../../src/contexts/auth.context';

export default function ProfilePage() {
  const router = useRouter();
  const { user, entitlements, logout, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setIsEditing(false);
      // Refresh profile data
      await refreshProfile();
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'destructive';
      case 'moderator': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'suspended': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

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
          <div className="flex items-center gap-2">
            {saveStatus === 'success' && (
              <Alert className="max-w-xs">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Profile saved successfully!</AlertDescription>
              </Alert>
            )}
            {saveStatus === 'error' && (
              <Alert variant="destructive" className="max-w-xs">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Failed to save profile</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold">
                    {user.firstName?.[0] || user.email?.[0] || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full hover:bg-primary/80 transition">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={getRoleBadgeVariant(user.role || 'user')}>
                      {(user.role || 'user').charAt(0).toUpperCase() + (user.role || 'user').slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(user.status || 'unknown')}>
                      {user.status || 'Unknown'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} size="sm" disabled={saveStatus === 'saving'}>
                      <Save className="w-4 h-4 mr-2" />
                      {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Manage your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-muted-foreground">{user.firstName || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="mt-1 text-muted-foreground">{user.lastName || 'Not set'}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="text-xs">
                      {user.emailVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">{user.phone || 'Not set'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">{user.location || 'Not set'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={3}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="mt-1 text-muted-foreground">{user.bio || 'No bio provided'}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>Your professional details and social links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <p className="mt-1 text-muted-foreground">{user.jobTitle || 'Not set'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      {user.website ? (
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {user.website}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">Not set</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">GitHub</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.github}
                        onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <div className="mt-1">
                        {user.github ? (
                          <a href={`https://${user.github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                            {user.github}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">Not set</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <div className="mt-1">
                        {user.linkedin ? (
                          <a href={`https://${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                            {user.linkedin}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">Not set</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Twitter</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.twitter}
                        onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <div className="mt-1">
                        {user.twitter ? (
                          <a href={`https://${user.twitter}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                            {user.twitter}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">Not set</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">User ID</label>
                  <p className="mt-1 text-xs text-muted-foreground font-mono">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Account Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getStatusColor(user.status || 'unknown')}>
                      {user.status || 'Unknown'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Member Since</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Login</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            {entitlements && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <p className="mt-1">{entitlements.role || 'User'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Features</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entitlements.features?.map((feature: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      )) || <p className="text-muted-foreground text-sm">No special features</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    My Resumes
                  </Button>
                </Link>
                <Separator />
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
