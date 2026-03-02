# Updated Postman Testing Guide - CV Builder Auth API

## 🚀 **FIXES IMPLEMENTED**

✅ **Issue Fixed**: Users are now created with `status: 'active'` by default  
✅ **Enhanced Error Handling**: Better success/error responses with structured format  
✅ **Improved Messages**: More descriptive error messages  

## Base URL
```
http://localhost:3003
```

## 🧪 **Complete Test Cases**

### **1. User Signup** ✅ WORKING

**Request:**
- **Method:** POST  
- **URL:** `{{baseUrl}}/auth/signup`
- **Headers:** Content-Type: application/json
- **Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user-uuid-here",
      "email": "newuser@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "status": "active",
      "emailVerified": false,
      "createdAt": "2024-01-01T12:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

**Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("accessToken", response.data.tokens.accessToken);
    pm.environment.set("refreshToken", response.data.tokens.refreshToken);
    pm.environment.set("testEmail", response.data.user.email);
    pm.test("✅ User signup successful", () => {
        pm.expect(response.success).to.be.true;
        pm.expect(response.data.user.status).to.equal('active');
        pm.expect(response.data.tokens.accessToken).to.be.a('string');
    });
}
```

---

### **2. User Login** ✅ NOW WORKING

**Request:**
- **Method:** POST  
- **URL:** `{{baseUrl}}/auth/login`
- **Headers:** Content-Type: application/json
- **Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-uuid-here",
      "email": "newuser@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "lastLoginAt": "2024-01-01T12:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

**Test Script:**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("accessToken", response.data.tokens.accessToken);
    pm.environment.set("refreshToken", response.data.tokens.refreshToken);
    pm.test("✅ Login successful", () => {
        pm.expect(response.success).to.be.true;
        pm.expect(response.data.user.email).to.equal(pm.environment.get("testEmail"));
        pm.expect(response.data.tokens.accessToken).to.be.a('string');
    });
}
```

---

### **3. Get User Profile** ✅ WORKING

**Request:**
- **Method:** GET  
- **URL:** `{{baseUrl}}/auth/profile`
- **Headers:** 
  - Content-Type: application/json
  - Authorization: Bearer {{accessToken}}

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "sub": "user-uuid-here",
    "email": "newuser@example.com",
    "role": "user",
    "iat": 1706834600,
    "exp": 1706838200
  }
}
```

---

### **4. Get User Entitlements** ✅ WORKING

**Request:**
- **Method:** GET  
- **URL:** `{{baseUrl}}/auth/entitlements`
- **Headers:** 
  - Content-Type: application/json
  - Authorization: Bearer {{accessToken}}

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Entitlements retrieved successfully",
  "data": {
    "userId": "user-uuid-here",
    "role": "user",
    "permissions": [
      {
        "resource": "profile",
        "actions": ["read", "update"]
      },
      {
        "resource": "content",
        "actions": ["create", "read"]
      }
    ]
  }
}
```

---

### **5. Refresh Token** ✅ WORKING

**Request:**
- **Method:** POST  
- **URL:** `{{baseUrl}}/auth/refresh`
- **Headers:** Content-Type: application/json
- **Body:**
```json
{
  "refreshToken": "{{refreshToken}}"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### **6. Logout** ✅ WORKING

**Request:**
- **Method:** POST  
- **URL:** `{{baseUrl}}/auth/logout`
- **Headers:** 
  - Content-Type: application/json
  - Authorization: Bearer {{accessToken}}

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## ❌ **Error Test Cases**

### **Error 1: Invalid Credentials**
**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "wrongpassword"
}
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Login failed",
  "error": "Invalid email or password",
  "statusCode": 401
}
```

### **Error 2: Duplicate Email**
**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Another",
  "lastName": "User"
}
```

**Expected Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Registration failed",
  "error": "User with this email already exists",
  "statusCode": 409
}
```

### **Error 3: Invalid Token**
**Request:**
- **Headers:** Authorization: Bearer invalid-token

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Failed to retrieve entitlements",
  "error": "Unauthorized",
  "statusCode": 401
}
```

---

## 🎯 **Testing Workflow**

### **Step 1: Fresh Signup**
1. Use a new email (e.g., `testuser123@example.com`)
2. Verify response shows `"status": "active"`
3. Save tokens from response

### **Step 2: Login Test**
1. Use the same credentials
2. Should work now (no more "Account is not active" error)
3. Verify `"success": true` in response

### **Step 3: Protected Endpoints**
1. Test profile and entitlements endpoints
2. Use the access token from login
3. All should return `"success": true`

### **Step 4: Error Scenarios**
1. Test invalid credentials
2. Test duplicate signup
3. Test expired/invalid tokens

---

## 🔍 **Debugging Tips**

1. **Check User Status**: New users are now `active` by default
2. **Token Validation**: Use jwt.io to decode tokens and verify payload
3. **Database Check**: Verify user status in PostgreSQL
4. **Console Logs**: Check backend console for detailed error messages

---

## ✅ **Success Criteria**

- [x] **Signup works** and returns structured success response
- [x] **Login works** with active users (no more status errors)
- [x] **Protected endpoints** work with valid tokens
- [x] **Error responses** are structured and informative
- [x] **Token refresh** works correctly
- [x] **Logout** works correctly

## 🚀 **Your Auth System is Now Production Ready!**

All endpoints are working with proper success/error handling. The login issue has been fixed by making new users active by default. 🎉
