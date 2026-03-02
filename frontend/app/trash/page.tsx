'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Trash2, RotateCcw, Trash, Calendar, FileText, Mail,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrashPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [deletedItems, setDeletedItems] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
      // Load deleted items
      setDeletedItems([
        {
          id: 1,
          name: 'Old Resume Draft',
          type: 'resume',
          deletedDate: '2024-02-20',
          daysLeft: 25,
        },
        {
          id: 2,
          name: 'Initial Cover Letter',
          type: 'letter',
          deletedDate: '2024-02-18',
          daysLeft: 27,
        },
        {
          id: 3,
          name: 'Portfolio Resume',
          type: 'resume',
          deletedDate: '2024-02-15',
          daysLeft: 30,
        }
      ]);
    }
  }, [router]);

  const handleRestore = (id: number) => {
    setDeletedItems(deletedItems.filter(item => item.id !== id));
  };

  const handlePermanentDelete = (id: number) => {
    setDeletedItems(deletedItems.filter(item => item.id !== id));
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
            <Trash2 className="w-5 h-5 text-destructive" />
            <h1 className="text-xl font-bold text-foreground">Trash</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Deleted Items</h2>
          <p className="text-muted-foreground">Items in trash are permanently deleted after 30 days.</p>
        </div>

        {deletedItems.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-border/40 p-12 text-center">
            <Trash2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Trash is empty</h3>
            <p className="text-muted-foreground">Deleted items will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deletedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left - Item Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      {item.type === 'resume' ? (
                        <FileText className="w-5 h-5 text-destructive" />
                      ) : (
                        <Mail className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Deleted on {new Date(item.deletedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Center - Recovery Info */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {item.daysLeft} days left
                    </div>

                    {/* Recovery Bar */}
                    <div className="w-24 h-2 rounded-full bg-border/40 overflow-hidden">
                      <div
                        className="h-full bg-destructive"
                        style={{ width: `${((30 - item.daysLeft) / 30) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Right - Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleRestore(item.id)}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="hidden sm:inline">Restore</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handlePermanentDelete(item.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Banner */}
        {deletedItems.length > 0 && (
          <div className="mt-8 p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-medium">Automatic Deletion</p>
              <p className="mt-1">Items in trash are permanently deleted after 30 days. Restore important items before they expire.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
