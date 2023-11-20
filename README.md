# SimpleApiBackend

Welcome to SimpleApiBackend, a minimalistic API backend designed to serve as a starting point for your projects.

## Overview

This repository contains a simple API backend with basic authentication features. The primary functionalities include user authentication through login and user registration.

## Getting Started

To use this backend, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Bodoque-dios/SimpleApiBackend.git
   ```

2. **Install Dependencies:**
   ```bash
   cd SimpleApiBackend
   npm install
   ```

3. **Run the Server:**
   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3000`.

## Authentication

### Login

- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticates a user and generates a session token.
- **Request Body:**
  - `username` (string): User's username.
  - `password` (string): User's password.
- **Responses:**
  - `200 OK`: Successful authentication. Returns a session token.
  - `401 Unauthorized`: Incorrect password.
  - `404 Not Found`: User not found.

### Register

- **Endpoint:** `POST /api/users/register`
- **Description:** Creates a new user account.
- **Request Body:**
  - `username` (string): User's desired username.
  - `password` (string): User's password.
  - `email` (string): User's email address.
  - `firstName` (string): User's first name.
  - `lastName` (string): User's last name.
  - `userType` (string): Type of user account.
- **Responses:**
  - `200 OK`: User account created successfully.
  - `500 Internal Server Error`: Error creating user account.

## Additional Notes

- All endpoints expect data in JSON format.
- User passwords are hashed before storage for security.
- Session tokens are generated for successful logins.
- Error responses include appropriate status codes and messages.
## Maybe in the future
- build command and db builder script
- Tests?
- Less minimalistic aproach

Feel free to modify and expand upon this backend to suit the needs of your project. Happy coding!
