'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/auth.context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePermission?: {
    resource: string;
    action: string;
  };
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requirePermission, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else if (requirePermission && !hasPermission(requirePermission.resource, requirePermission.action)) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, hasPermission, requirePermission, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requirePermission && !hasPermission(requirePermission.resource, requirePermission.action)) {
    return null; // Will redirect to unauthorized
  }

  return <>{children}</>;
}

export default ProtectedRoute;
