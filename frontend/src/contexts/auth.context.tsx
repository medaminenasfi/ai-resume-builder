'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import authService, { UserProfile, UserEntitlements } from '../services/auth.service';

interface AuthContextType {
  user: UserProfile | null;
  entitlements: UserEntitlements | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (data: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [entitlements, setEntitlements] = useState<UserEntitlements | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Setup axios interceptor for automatic token refresh
        authService.setupAxiosInterceptor();

        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);

          // Load user entitlements
          try {
            const userEntitlements = await authService.getEntitlements();
            setEntitlements(userEntitlements);
          } catch (error) {
            console.error('Failed to load entitlements:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      
      if (response.success) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Load user entitlements
        try {
          const userEntitlements = await authService.getEntitlements();
          setEntitlements(userEntitlements);
        } catch (error) {
          console.error('Failed to load entitlements:', error);
        }

        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(data);
      
      if (response.success) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Load user entitlements
        try {
          const userEntitlements = await authService.getEntitlements();
          setEntitlements(userEntitlements);
        } catch (error) {
          console.error('Failed to load entitlements:', error);
        }

        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setEntitlements(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server logout fails
      setUser(null);
      setEntitlements(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await authService.getProfile();
      if (profile.success) {
        setUser(profile.data);
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!entitlements) return false;
    
    const permission = entitlements.permissions.find(
      (p) => p.resource === resource
    );
    
    return permission ? permission.actions.includes(action) : false;
  };

  const value: AuthContextType = {
    user,
    entitlements,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
