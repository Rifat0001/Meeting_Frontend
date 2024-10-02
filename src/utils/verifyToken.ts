// Define a custom interface that extends the expected payload structure
export interface CustomJwtPayload {
  userId: string; // The user ID you want to access
  role: string;   // The user role (admin, user, etc.)
  iat: number;    // Issued at timestamp
  exp: number;    // Expiration timestamp
}

import { jwtDecode } from 'jwt-decode';

// Adjust the function to return the custom payload type
export const verifyToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token); // Specify the custom type here
};
