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
  "_id": "60a7c7b5e3c12345abcd6789",
  "token": "<jwt-token>",
  "user": {
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
