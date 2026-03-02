# Postman Testing Guide for CV Builder Auth API

## Base URL
```
http://localhost:3000
```

## Authentication Endpoints

### 1. User Signup
**Method:** POST  
**URL:** `/auth/signup`  
**Headers:** 
- Content-Type: application/json

**Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user"
}
```

**Expected Response (201):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. User Login
**Method:** POST  
**URL:** `/auth/login`  
**Headers:** 
- Content-Type: application/json

**Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```


---


### 4. Get User Profile
**Method:** GET  
**URL:** `/auth/profile`  
**Headers:** 
- Content-Type: application/json
- Authorization: Bearer `your_access_token`

**Expected Response (200):**
```json
{
  "sub": "user-uuid",
  "email": "test@example.com",
  "role": "user",
  "iat": 1645123456,
  "exp": 1645127056
}
```

---

### 5. Get User Entitlements
**Method:** GET  
**URL:** `/auth/entitlements`  
**Headers:** 
- Content-Type: application/json
- Authorization: Bearer `your_access_token`

**Expected Response (200):**
```json
{
  "userId": "user-uuid",
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
```

---

### 6. Logout
**Method:** POST  
**URL:** `/auth/logout`  
**Headers:** 
- Content-Type: application/json
- Authorization: Bearer `your_access_token`

**Expected Response (200):**
```json
{}
```

---

### 7. Forgot Password
**Method:** POST  
**URL:** `/auth/forgot-password`  
**Headers:** 
- Content-Type: application/json

**Body:**
```json
{
  "email": "test@example.com"
}
```

**Expected Response (200):**
```json
{}
```

---

### 8. Reset Password
**Method:** POST  
**URL:** `/auth/reset-password`  
**Headers:** 
- Content-Type: application/json

**Body:**
```json
{
  "token": "reset_token_here",
  "newPassword": "newpassword123"
}
```

**Expected Response (200):**
```json
{}
```

## Postman Collection Setup

### Environment Variables
Create these environment variables in Postman:

| Variable | Value | Description |
|----------|-------|-------------|
| baseUrl | http://localhost:3000 | API base URL |
| accessToken |  | Will be set after login |
| refreshToken |  | Will be set after login |

### Test Scripts

#### For Login/Signup Endpoints (Tests tab):
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("accessToken", response.accessToken);
    pm.environment.set("refreshToken", response.refreshToken);
}
```

#### For Protected Endpoints (Pre-request Script):
```javascript
if (!pm.environment.get("accessToken")) {
    throw new Error("No access token found. Please login first.");
}
```

## Testing Workflow

1. **Signup a new user**
   - Use the `/auth/signup` endpoint
   - Save the tokens using the test script

2. **Login with existing user**
   - Use the `/auth/login` endpoint
   - Save the tokens using the test script

3. **Test protected endpoints**
   - Use `/auth/profile` and `/auth/entitlements`
   - Make sure Authorization header is set

4. **Test token refresh**
   - Use the `/auth/refresh` endpoint
   - Update the access token

5. **Test password reset**
   - Use `/auth/forgot-password`
   - Then use `/auth/reset-password`

6. **Logout**
   - Use the `/auth/logout` endpoint

## Error Scenarios to Test

### Invalid Credentials
```json
{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```
**Expected:** 401 Unauthorized

### Expired Token
Use an old or invalid access token
**Expected:** 401 Unauthorized

### Invalid Refresh Token
```json
{
  "refreshToken": "invalid_token"
}
```
**Expected:** 401 Unauthorized

### Duplicate Email
Try to signup with an existing email
**Expected:** 409 Conflict

## Tips

1. Always check the response codes and messages
2. Use the Postman console for debugging
3. Save successful responses for reference
4. Test with different user roles (admin, moderator, user)
5. Verify token expiration (access tokens expire in 15 minutes)

## Swagger Documentation
You can also test all endpoints using the Swagger UI:
```
http://localhost:3000/api/docs
```
