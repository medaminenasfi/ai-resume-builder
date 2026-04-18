# 🚀 Complete Frontend-Backend Authentication Integration Guide

## 📋 **Overview**
This guide covers the complete integration between the Next.js frontend and NestJS backend authentication system.

## 🏗️ **Architecture Overview**

```
Frontend (Next.js)          Backend (NestJS)
┌─────────────────┐       ┌─────────────────┐
│  AuthContext    │◄─────►│  AuthController │
│  AuthService    │◄─────►│  AuthService    │
│  ProtectedRoute │◄─────►│  JWT Strategy   │
│  AppNav         │       │  User Entity    │
└─────────────────┘       └─────────────────┘
```

## 🔧 **Setup Instructions**

### **1. Environment Configuration**

**Backend (.env):**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=cvbuilder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3003
NODE_ENV=development
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3003
```

### **2. Start Both Services**

**Backend:**
```bash
cd backend
npm run start:dev
# Backend runs on: http://localhost:3003
```

**Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on: http://localhost:3002
```

## 🧪 **Complete Testing Workflow**

### **Step 1: Test Backend API (Postman)**

1. **Signup User:**
   ```http
   POST http://localhost:3003/auth/signup
   Content-Type: application/json
   
   {
     "email": "test@example.com",
     "password": "password123",
     "firstName": "John",
     "lastName": "Doe",
     "role": "user"
   }
   ```

2. **Login User:**
   ```http
   POST http://localhost:3003/auth/login
   Content-Type: application/json
   
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Get Profile:**
   ```http
   GET http://localhost:3003/auth/profile
   Authorization: Bearer <access_token>
   ```

### **Step 2: Test Frontend Integration**

1. **Visit Homepage:**
   - URL: http://localhost:3002
   - Should show landing page with "Get Started Free" and "Sign In" buttons

2. **Test Signup:**
   - Click "Get Started Free" → Navigate to `/auth/signup`
   - Fill form:
     - Email: `test@example.com`
     - Password: `password123`
     - Confirm Password: `password123`
     - First Name: `John`
     - Last Name: `Doe`
   - Click "Create Account"
   - Should redirect to dashboard

3. **Test Login:**
   - Click "Sign In" → Navigate to `/auth/login`
   - Enter credentials:
     - Email: `test@example.com`
     - Password: `password123`
   - Click "Sign In"
   - Should redirect to dashboard

4. **Test Protected Routes:**
   - Visit `/dashboard` (should work when logged in)
   - Visit `/profile` (should work when logged in)
   - Logout and try again (should redirect to login)

## 🔐 **Authentication Flow**

### **1. User Registration**
```
Frontend → Backend → Database → Frontend
   ↓           ↓          ↓         ↓
Signup → Create User → Save → Set Tokens → Dashboard
```

### **2. User Login**
```
Frontend → Backend → Database → Frontend
   ↓           ↓          ↓         ↓
Login → Validate → Check → Set Tokens → Dashboard
```

### **3. Token Management**
```
Access Token: 15 minutes (auto-refresh)
Refresh Token: 7 days
Storage: localStorage
Auto-Refresh: Axios interceptor
```

## 🛡️ **Security Features**

### **Backend Security:**
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation with class-validator
- ✅ CORS configuration
- ✅ SQL injection prevention (TypeORM)

### **Frontend Security:**
- ✅ Protected routes
- ✅ Token storage in localStorage
- ✅ Automatic token refresh
- ✅ Request interceptors
- ✅ Role-based UI rendering

## 📱 **User Interface Features**

### **Navigation:**
- **Logged Out:** Shows "Sign In" and "Get Started" buttons
- **Logged In:** Shows user dropdown with profile, settings, logout
- **Mobile:** Responsive hamburger menu

### **Pages:**
1. **Homepage (`/`)**: Landing page with auth state detection
2. **Login (`/auth/login`)**: Full-featured login form
3. **Signup (`/auth/signup`)**: Complete registration form
4. **Dashboard (`/dashboard`)**: Protected user dashboard
5. **Profile (`/profile`)**: User profile management

### **Components:**
- **AppNav**: Smart navigation with auth state
- **ProtectedRoute**: Route protection wrapper
- **AuthContext**: Global auth state management
- **AuthService**: API communication layer

## 🔍 **Testing Checklist**

### **✅ Backend Tests:**
- [ ] User signup returns tokens
- [ ] User login returns tokens
- [ ] Protected endpoints require valid tokens
- [ ] Token refresh works correctly
- [ ] Invalid tokens are rejected
- [ ] User permissions are enforced

### **✅ Frontend Tests:**
- [ ] Homepage shows correct auth state
- [ ] Signup form creates user and redirects
- [ ] Login form authenticates and redirects
- [ ] Protected routes redirect unauthenticated users
- [ ] Navigation updates with auth state
- [ ] Token refresh works seamlessly
- [ ] Logout clears tokens and redirects

### **✅ Integration Tests:**
- [ ] Frontend can communicate with backend
- [ ] Tokens are stored and retrieved correctly
- [ ] Role-based access works end-to-end
- [ ] Error handling works properly
- [ ] Loading states work correctly

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   - Ensure backend CORS allows frontend URL
   - Check `NEXT_PUBLIC_API_URL` is correct

2. **Token Issues:**
   - Clear localStorage if tokens are corrupted
   - Check JWT_SECRET in backend .env
   - Verify token expiration times

3. **Database Connection:**
   - Ensure PostgreSQL is running on port 5433
   - Check database credentials in .env
   - Verify database `cvbuilder` exists

4. **Frontend Build Issues:**
   - Install missing dependencies: `pnpm install`
   - Check import paths are correct
   - Verify component exports

### **Debug Commands:**

**Backend Logs:**
```bash
cd backend
npm run start:dev
# Watch for database queries and auth logs
```

**Frontend Console:**
```bash
# Open browser dev tools
# Check Network tab for API calls
# Check Console for errors
```

**Database Check:**
```sql
-- Connect to PostgreSQL
psql -U postgres -h localhost -p 5433 -d cvbuilder

-- Check users table
SELECT * FROM users;

-- Check user status
SELECT email, role, status, created_at FROM users;
```

## 🎯 **Success Criteria**

✅ **Complete Authentication Flow:**
- Users can register
- Users can login
- Tokens are managed automatically
- Protected routes work correctly

✅ **Security:**
- Passwords are hashed
- Tokens are validated
- Roles are enforced
- Input is sanitized

✅ **User Experience:**
- Responsive design
- Loading states
- Error messages
- Smooth redirects

✅ **Integration:**
- Frontend-backend communication
- Real-time token refresh
- Consistent error handling
- Proper state management

## 🚀 **Production Deployment Notes**

### **Environment Variables:**
- Change `JWT_SECRET` to a secure random string
- Set `NODE_ENV=production`
- Use HTTPS URLs
- Configure proper CORS origins

### **Security Enhancements:**
- Implement rate limiting
- Add email verification
- Set up password reset emails
- Configure session timeout
- Add audit logging

### **Performance:**
- Implement Redis for token storage
- Add database indexes
- Configure CDN for static assets
- Enable gzip compression

---

## 🎉 **Your Complete Auth System is Ready!**

You now have a fully functional authentication system connecting Next.js frontend with NestJS backend. Users can register, login, access protected routes, and manage their profiles with proper security and user experience.
