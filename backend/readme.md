# /users/register Endpoint Documentation

## Description

Registers a new user into the system.

- It validates the required fields.
- It hashes the password.
- It generates an authentication token upon successful registration.

## Endpoint

```
POST /users/register
```

## Request Body Format (JSON)

```
{
  "fullName": {
    "firstName": "John",         // Required, minimum 3 characters
    "lastName": "Doe"             // Optional, minimum 3 characters if provided
  },
  "email": "john.doe@example.com",  // Required, valid email format, unique
  "password": "password123"         // Required, minimum 6 characters
}
```

## Response Format

### Success Response

**Status Code:** `200 OK`

**Example:**

```
{
  "token": "<jwt-token>",
  "user": {
    "_id": "60a7c7b5e3c12345abcd6789",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Validation Error Response

**Status Code:** `400 Bad Request`

**Example:**

```
{
  "errors": [
    {
      "msg": "FirstName must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

### Required Validation Rules

- `fullName.firstName`: Required, minimum length 3 characters.
- `email`: Required, must be a valid email.
- `password`: Required, minimum length 6 characters.

## Notes

- Passwords are hashed before saving.
- Duplicate email will cause a database error.
- JWT is signed using the server's `JWT_SECRET`.

# /users/login Endpoint Documentation

## Description

Authenticates a user and returns a token if login is successful.

- Validates the required fields.
- Compares entered password with the stored hashed password.
- Returns a JWT token if credentials are valid.

## Endpoint

```
POST /users/login
```

## Request Body Format (JSON)

```
{
  "email": "john.doe@example.com",  // Required, valid email format
  "password": "password123"         // Required, minimum 6 characters
}
```

## Response Format

### Success Response

**Status Code:** `200 OK`

**Example:**

```
{
  "token": "<jwt-token>",
  "user": {
    "_id": "60a7c7b5e3c12345abcd6789",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password":"$2b$10$TWhnPkV6P3RgUpWcciH5ruSIv/VFiVsjj3E77BkrjtzdsV6bTsqwG",
    "socketId": null
  }
}
```

### Validation Error Response

**Status Code:** `400 Bad Request`

**Example:**

```
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example:**

```
{
  "message": "Invalid email or password!"
}
```

### Required Validation Rules

- `email`: Required, must be a valid email.
- `password`: Required, minimum length 6 characters.

## Notes

- Password comparison uses bcrypt under the hood.
- JWT is signed using the server's `JWT_SECRET`.
- If user does not exist or password is invalid, a 401 error is returned.

# /users/logout Endpoint Documentation

## Description

Logs out the authenticated user by clearing their token cookie and blacklisting the token.

## Endpoint

```
POST /users/logout
```

## Headers

```
Authorization: Bearer <jwt-token>
```

## Response Format

### Success Response

**Status Code:** `200 OK`

**Example:**

```
{
  "message": "Logged out successfully"
}
```

### Notes

- Requires the user to be authenticated.
- The token is stored in a blacklist (with automatic expiration after 1 day).
- Token can be passed via cookie or Authorization header.

# /users/profile Endpoint Documentation

## Description

Returns the profile details of the currently authenticated user.

## Endpoint

```
GET /users/profile
```

## Headers

```
Authorization: Bearer <jwt-token>
```

## Response Format

### Success Response

**Status Code:** `200 OK`

**Example:**

```
{
  "user": {
    "_id": "60a7c7b5e3c12345abcd6789",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Unauthorized Response

**Status Code:** `401 Unauthorized`

**Example:**

```
{
  "message": "Unauthorized Token"
}
```

### Notes

- Requires authentication middleware (`authUser`).
- Token can be sent in cookie or Authorization header.
- If token is blacklisted or invalid, request will be denied.

# /captains/register Endpoint Documentation

## Description

Registers a new captain with personal and vehicle details.

- Validates and saves full name, email, password, and vehicle info.
- Hashes the password before saving.
- Generates and returns a JWT token upon successful registration.

## Endpoint

```
POST /captains/register
```

## Request Body Format (JSON)

```
{
  "fullName": {
    "firstName": "Jane",          // Required, minimum 3 characters
    "lastName": "Smith"           // Optional, minimum 3 characters if provided
  },
  "email": "jane.smith@example.com", // Required, must be a valid email
  "password": "securepass123",       // Required, minimum 6 characters
  "vehicle": {
    "color": "Red",                // Required, minimum 3 characters
    "plate": "AB123CD",            // Required, minimum 3 characters
    "capacity": 4,                  // Required, minimum 1
    "vehicleType": "car"           // Required, must be 'car', 'bike', or 'auto'
  }
}
```

## Response Format

### Success Response

**Status Code:** `201 Created`

**Example:**

```
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "64a8c3b2e3c12345abcd6789",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

### Validation Error Response

**Status Code:** `400 Bad Request`

**Example:**

```
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Vehicle type must be car, bike, or auto",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## Notes

- Email must be unique; duplicate emails will be rejected.
- Passwords are hashed using bcrypt before storing.
- JWT is signed using the server's `JWT_SECRET`.
- Default captain `status` is set to `inactive`.

# /captains/login Endpoint Documentation

## Description

Logs in a registered captain and returns an authentication token.

## Endpoint

```
POST /captains/login
```

## Request Body Format (JSON)

```
{
  "email": "captain@example.com",  // Required, valid email
  "password": "securepassword"     // Required, minimum 6 characters
}
```

## Success Response

**Status Code:** `200 OK`

```
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "64a8c3b2e3c12345abcd6789",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

## Error Responses

**400 Bad Request** (Invalid input or credentials)

```
{
  "message": "Invalid email or password!"
}
```

---

# /captains/logout Endpoint Documentation

## Description

Logs out the currently authenticated captain by blacklisting the JWT.

## Endpoint

```
GET /captains/logout
```

## Headers

```
Authorization: Bearer <jwt-token>
```

## Success Response

**Status Code:** `200 OK`

```
{
  "message": "Logged out successfully!"
}
```

## Error Response

**400 Bad Request** (No token provided)

```
{
  "message": "No token provided!"
}
```

---

# /captains/profile Endpoint Documentation

## Description

Returns the profile of the currently authenticated captain.

## Endpoint

```
GET /captains/profile
```

## Headers

```
Authorization: Bearer <jwt-token>
```

## Success Response

**Status Code:** `200 OK`

```
{
  "captain": {
    "_id": "64a8c3b2e3c12345abcd6789",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

## Error Response

**401 Unauthorized**

```
{
  "message": "Unauthorized Token"
}
```

## Notes

- Uses `authCaptain` middleware for authentication.
- Requires a valid JWT in the header or cookie.
