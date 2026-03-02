'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart3, Users, FileText, DollarSign, TrendingUp, AlertCircle,
  LogOut, Settings, Bell, Search, ChevronDown, Filter, Download,
  Eye, Edit, Trash2, MoreVertical, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'resumes' | 'payments'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  // Mock data
  const stats = [
    { label: 'Total Users', value: '12,547', change: '+12.5%', icon: Users },
    { label: 'Active Resumes', value: '45,892', change: '+8.2%', icon: FileText },
    { label: 'Monthly Revenue', value: '$89,234', change: '+23.1%', icon: DollarSign },
    { label: 'Growth Rate', value: '34.2%', change: '+4.3%', icon: TrendingUp },
  ];

  const recentUsers = [
    { id: 1, email: 'john.doe@example.com', joined: '2024-02-28', status: 'active', resumes: 2 },
    { id: 2, email: 'jane.smith@example.com', joined: '2024-02-27', status: 'active', resumes: 1 },
    { id: 3, email: 'mike.wilson@example.com', joined: '2024-02-26', status: 'inactive', resumes: 0 },
    { id: 4, email: 'sarah.johnson@example.com', joined: '2024-02-25', status: 'active', resumes: 3 },
    { id: 5, email: 'alex.brown@example.com', joined: '2024-02-24', status: 'active', resumes: 2 },
  ];

  const resumes = [
    { id: 1, title: 'Senior Developer CV', author: 'john.doe@example.com', created: '2024-02-28', views: 234, status: 'published' },
    { id: 2, title: 'Product Manager Resume', author: 'jane.smith@example.com', created: '2024-02-27', views: 156, status: 'published' },
    { id: 3, title: 'UX Designer Portfolio', author: 'sarah.johnson@example.com', created: '2024-02-26', views: 89, status: 'draft' },
    { id: 4, title: 'Data Scientist Resume', author: 'alex.brown@example.com', created: '2024-02-25', views: 423, status: 'published' },
    { id: 5, title: 'Marketing Specialist CV', author: 'mike.wilson@example.com', created: '2024-02-24', views: 45, status: 'draft' },
  ];

  const transactions = [
    { id: 1, user: 'john.doe@example.com', amount: '$9.99', plan: 'Professional', date: '2024-02-28', status: 'completed' },
    { id: 2, user: 'sarah.johnson@example.com', amount: '$99.00', plan: 'Enterprise', date: '2024-02-27', status: 'completed' },
    { id: 3, user: 'alex.brown@example.com', amount: '$9.99', plan: 'Professional', date: '2024-02-26', status: 'pending' },
    { id: 4, user: 'jane.smith@example.com', amount: '$9.99', plan: 'Professional', date: '2024-02-25', status: 'completed' },
    { id: 5, user: 'mike.wilson@example.com', amount: '$99.00', plan: 'Enterprise', date: '2024-02-24', status: 'failed' },
  ];

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-border/40">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user?.email.split('@')[0]}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 border-r border-border/40 bg-card/50">
          <nav className="p-6 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'resumes', label: 'Resumes', icon: FileText },
              { id: 'payments', label: 'Payments', icon: DollarSign },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
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

          <div className="p-6 border-t border-border/40 space-y-2">
            <Button variant="outline" className="w-full gap-2 justify-start">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="outline" className="w-full gap-2 justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back! Here's your platform performance.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card/80 transition">
                    <div className="flex items-start justify-between mb-4">
                      <stat.icon className="w-8 h-8 text-primary" />
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
                  <div className="h-32 bg-background/50 rounded-lg flex items-center justify-center text-muted-foreground">
                    [Chart: Monthly user growth trend]
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-border/40 bg-card/50">
                  <h3 className="font-semibold text-foreground mb-4">Revenue</h3>
                  <div className="h-32 bg-background/50 rounded-lg flex items-center justify-center text-muted-foreground">
                    [Chart: Monthly revenue trend]
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg border border-border/40 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Avg. Resumes per User</p>
                  <p className="text-2xl font-bold text-foreground">3.66</p>
                </div>
                <div className="p-4 rounded-lg border border-border/40 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Platform Uptime</p>
                  <p className="text-2xl font-bold text-foreground">99.98%</p>
                </div>
                <div className="p-4 rounded-lg border border-border/40 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Support Tickets</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Users Management</h2>
                  <p className="text-muted-foreground">Manage and monitor user accounts</p>
                </div>
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Users Table */}
              <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/40 bg-background/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">User</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Resumes</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-background/30 transition">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{user.resumes}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Resumes Tab */}
          {activeTab === 'resumes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Resumes Management</h2>
                  <p className="text-muted-foreground">Monitor and manage all resumes</p>
                </div>
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>

              {/* Resumes Table */}
              <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/40 bg-background/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {resumes.map((resume) => (
                        <tr key={resume.id} className="hover:bg-background/30 transition">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{resume.title}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{resume.author}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{resume.created}</td>
                          <td className="px-6 py-4 text-sm text-foreground font-medium">{resume.views}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              resume.status === 'published' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {resume.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Payments & Transactions</h2>
                  <p className="text-muted-foreground">Track all payment activities</p>
                </div>
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>

              {/* Transactions Table */}
              <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/40 bg-background/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">User</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-background/30 transition">
                          <td className="px-6 py-4 text-sm text-foreground">{tx.user}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{tx.plan}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.amount}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              {tx.status === 'completed' && <CheckCircle className="w-4 h-4 text-primary" />}
                              {tx.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                              {tx.status === 'failed' && <XCircle className="w-4 h-4 text-destructive" />}
                              <span className="text-xs font-medium">{tx.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
