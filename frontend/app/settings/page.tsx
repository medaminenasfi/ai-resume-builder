'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield, Bell, Lock, LogOut, Mail, User, Eye, EyeOff, Save, CreditCard, Palette, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications' | 'billing' | 'preferences'>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="space-y-2">
              {[
                { id: 'account', label: 'Account', icon: User },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'billing', label: 'Billing', icon: CreditCard },
                { id: 'preferences', label: 'Preferences', icon: Palette },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-left ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Account Settings</h2>
                  <p className="text-muted-foreground">Manage your account information</p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 p-6 space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background/50 text-muted-foreground cursor-not-allowed"
                      />
                      <Button variant="outline">Change</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Your login email address</p>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.email.split('@')[0]}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Plan */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current Plan</label>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50">
                      <div>
                        <p className="font-medium text-foreground">Free Plan</p>
                        <p className="text-sm text-muted-foreground">Unlimited access to basic features</p>
                      </div>
                      <Button variant="outline" size="sm">Upgrade</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex justify-end">
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Security Settings</h2>
                  <p className="text-muted-foreground">Manage your password and security preferences</p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 p-6 space-y-6">
                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Change Password</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="pt-4 border-t border-border/40 space-y-4">
                    <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50">
                      <div>
                        <p className="font-medium text-foreground">Not Enabled</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Notification Settings</h2>
                  <p className="text-muted-foreground">Manage how you receive updates</p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 p-6 space-y-4">
                  {[
                    { label: 'Resume Updates', desc: 'Get notified when resumes receive views' },
                    { label: 'AI Suggestions', desc: 'Receive AI recommendations for your resumes' },
                    { label: 'Marketing Emails', desc: 'Receive news about new features and promotions' },
                    { label: 'Security Alerts', desc: 'Get notified of unusual activity on your account' },
                  ].map((notification, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-background/50 hover:bg-background/80 transition">
                      <div>
                        <p className="font-medium text-foreground">{notification.label}</p>
                        <p className="text-sm text-muted-foreground">{notification.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={i <= 1}
                        className="w-5 h-5 rounded border-border accent-primary cursor-pointer"
                      />
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border/40 flex justify-end">
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Billing & Subscription</h2>
                  <p className="text-muted-foreground">Manage your subscription and payment methods</p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div>
                      <p className="font-medium text-foreground">Current Plan</p>
                      <p className="text-sm text-muted-foreground">Pro Monthly - $9.99/month</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div>
                      <p className="font-medium text-foreground">Next Billing Date</p>
                      <p className="text-sm text-muted-foreground">March 28, 2024</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
                    <div className="p-4 rounded-lg border border-border/40 bg-background/50 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Recent Invoices</h3>
                    <div className="space-y-2">
                      {['Feb 28, 2024 - $9.99', 'Jan 28, 2024 - $9.99', 'Dec 28, 2023 - $9.99'].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition">
                          <span className="text-sm text-muted-foreground">{invoice}</span>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <Button variant="outline" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Preferences</h2>
                  <p className="text-muted-foreground">Customize your experience</p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option>English</option>
                        <option>Français</option>
                        <option>Español</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Theme</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option>Dark</option>
                        <option>Light</option>
                        <option>Auto</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-border/40">
                      <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </Button>
                      {saved && (
                        <div className="flex items-center gap-2 text-primary mt-2">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Saved successfully</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <h3 className="font-semibold text-foreground mb-4 text-red-500">Danger Zone</h3>
                    <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">This action cannot be undone. All your data will be permanently deleted.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
